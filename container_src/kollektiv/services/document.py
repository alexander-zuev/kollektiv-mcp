from __future__ import annotations

import asyncio
import uuid
from typing import Any
from uuid import UUID

from fastapi import UploadFile

from kollektiv.infrastructure.clients.r2_client import R2Client
from kollektiv.infrastructure.clients.supabase_client import SupabaseClient
from kollektiv.infrastructure.clients.vectara_client import VectaraClient
from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.infrastructure.repository.docs_repo import DocumentsRepo
from kollektiv.infrastructure.settings import Settings
from kollektiv.models.documents import Document
from kollektiv.shared.exceptions import (
    DatabaseError,
    DocumentUploadError,
    DuplicateDocumentError,
    R2Error,
    VectaraError,
)

logger = get_logger(__name__)

# --------------------------------------------------------------------------- #
# Constants – keep them here until we move to settings                        #
# --------------------------------------------------------------------------- #

ALLOWED_MIME_TYPES: set[str] = {
    "text/markdown",
    "text/x-markdown",
    "application/pdf",  # .pdf
    "application/vnd.oasis.opendocument.text",  # .odt
    "application/msword",  # .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",  # .docx
    "application/vnd.ms-powerpoint",  # .ppt
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",  # .pptx
    "text/plain",  # .txt
    "text/html",  # .html
    "application/lxml+xml",  # .lxml (unofficial, fallback for .lxml)
    "application/rtf",  # .rtf
    "application/epub+zip",  # .epub
    "message/rfc822",  # .eml, RFC 822 email
}

# TODO: allow uploading up to 30/50Mb later - we will cover most PDFs this way
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB


class DocumentService:
    """Responsible for managing:
    - document uploads
    - document retrieval
    - document deletion"""

    def __init__(
        self,
        settings: Settings,
        vectara_client: VectaraClient,
        supabase_client: SupabaseClient,
        documents_repo: DocumentsRepo,
        r2_client: R2Client,
    ):
        self.settings = settings
        self.vectara = vectara_client
        self.supabase = supabase_client.supabase
        self.corpora_key = settings.vectara_corpus_id
        self.documents_repo = documents_repo
        self.r2_client = r2_client

    async def _compensating_cleanup(
        self,
        object_key: str,
        *,
        r2_uploaded: bool,
        vectara_uploaded: bool,
    ) -> None:
        """
        Tries to remove partially-uploaded artefacts.
        *Never* raises —we don't want a failed rollback to mask the root error.
        """
        tasks: list[asyncio.Task[Any]] = []

        if r2_uploaded:
            tasks.append(asyncio.create_task(self._safe_delete_r2(object_key)))

        if vectara_uploaded:
            tasks.append(asyncio.create_task(self._safe_delete_vectara(object_key)))

        if tasks:
            await asyncio.gather(*tasks, return_exceptions=True)

    async def _safe_delete_r2(self, key: str) -> None:
        try:
            await self.r2_client.delete_object(key)
        except Exception as e:
            logger.warning("Failed to roll back R2 object %s: %s", key, e)

    async def _safe_delete_vectara(self, key: str) -> None:
        try:
            await self.vectara.delete_document(self.corpora_key, key)
        except Exception as e:
            logger.warning("Failed to roll back Vectara doc %s: %s", key, e)

    async def _validate_file_reqs(self, uploaded_file: UploadFile, file_bytes: bytes) -> None:
        """Never returns just raises if validation fails."""
        if uploaded_file.content_type not in ALLOWED_MIME_TYPES:
            raise DocumentUploadError(f"MIME type '{uploaded_file.content_type}' is not allowed")

        if len(file_bytes) > MAX_FILE_SIZE_BYTES:
            raise DocumentUploadError("File exceeds maximum allowed size of 10 MB")

    def _vectara_user_message(self, err: VectaraError, filename: str) -> str:
        """
        Translates Vectara status codes that we want to expose to the end-user
        into a concise, helpful message.
        """
        match err.status_code:
            case 400:  # Bad request – usually malformed file
                return "The file could not be processed. Please make sure it isn’t corrupted and try again."
            case 415:  # Unsupported media-type
                return (
                    f"Unable to extract text from {filename}. Please upload a "
                    f"digitally generated PDF or other text-based document. "
                    f"Scanned/image-only PDFs are currently not supported."
                )
            case _:
                # Fallback – should normally not be shown because we special-case 400 / 415
                return "Failed to upload the document – please try again later."

    async def upload_document(
        self,
        uploaded_file: UploadFile,
        user_id: UUID,
    ) -> Document:
        """
        1. Reads the incoming `UploadFile` into memory (we'll stream later).
        2. Generates an object key (<user_id>/<ts>_<filename>).
        3. Concurrently uploads to:
           • Cloudflare R2 (binary object storage)
           • Vectara (vector store)
        4. Returns a *domain* `Document` instance with both external IDs.
        """
        file_bytes = await uploaded_file.read()
        kollektiv_doc_id = uuid.uuid4()

        # --- 1) Basic validation ----------------------------------------- #
        await self._validate_file_reqs(uploaded_file, file_bytes)

        # --- 2) Prepare common names & keys ------------------------------ #
        storage_key = Document.build_storage_key(user_id, uploaded_file.filename)

        if await self.documents_repo.exists(storage_key=storage_key):
            raise DuplicateDocumentError(
                f"A file named “{uploaded_file.filename}” already exists. "
                "Please delete the existing file or upload it under a different name."
            )

        logger.debug("Uploading %s (%d bytes) as %s", uploaded_file.filename, len(file_bytes), storage_key)

        # Upload to R2 & Vectara concurrently
        task_r2 = asyncio.create_task(self.r2_client.upload_document(file_bytes, storage_key))
        task_vectara = asyncio.create_task(
            self.vectara.upload_to_vectara(
                original_filename=uploaded_file.filename,
                file_bytes=file_bytes,
                vectara_doc_id=storage_key,
                user_id=user_id,
                kollektiv_doc_id=kollektiv_doc_id,
            )
        )

        r2_result, vectara_result = await asyncio.gather(task_r2, task_vectara, return_exceptions=True)

        # --- 4) Detect failures, roll back if needed --------------------- #
        try:
            # Check for any exception types
            if isinstance(vectara_result, VectaraError):
                error_message = self._vectara_user_message(vectara_result, filename=uploaded_file.filename)
                await self._compensating_cleanup(
                    storage_key, r2_uploaded=not isinstance(r2_result, R2Error), vectara_uploaded=False
                )
                raise DocumentUploadError(error_message) from vectara_result
            elif isinstance(r2_result, R2Error):
                await self._compensating_cleanup(
                    storage_key, r2_uploaded=False, vectara_uploaded=not isinstance(vectara_result, VectaraError)
                )
                raise DocumentUploadError("Failed to upload the document - please try again later") from (r2_result)

            else:
                # Upload to Supabase
                doc = Document.from_upload(
                    id=kollektiv_doc_id,
                    user_id=user_id,
                    file_name=uploaded_file.filename,
                    file_bytes=file_bytes,
                    content_type=uploaded_file.content_type,
                )
                try:
                    return await self.documents_repo.add_single(doc)
                except DatabaseError as db_exc:
                    await self._compensating_cleanup(storage_key, r2_uploaded=True, vectara_uploaded=True)
                    raise DocumentUploadError("Failed to write document data to Supabase") from (db_exc)

        except DocumentUploadError:
            logger.exception("Error during upload: %s", DocumentUploadError)
            raise
        except Exception as e:
            logger.exception("Unexpected error during upload: %s", e)
            await self._compensating_cleanup(storage_key, r2_uploaded=True, vectara_uploaded=True)
            raise DocumentUploadError(
                "Unexpected error occurred when uploading document. Please try again later. "
            ) from e

    async def retrieve_documents(self, user_id: UUID) -> list[Document]:
        """Retrieves a list of documents belonging to the user."""
        documents = await self.documents_repo.get_all(user_id=user_id)
        return documents

    async def delete_document(self, document_id: UUID) -> None:
        """Manages the whole document deletion process."""

        # Find the storage key
        doc = await self.documents_repo.get_by_id(document_id)
        storage_key = doc.storage_key
        logger.debug("Deleting document %s (%s)", doc.id, storage_key)

        # First delete from R2
        task_1 = asyncio.create_task(self.r2_client.delete_object(storage_key))
        # Then from Vectara
        task_2 = asyncio.create_task(self.vectara.delete_document(self.corpora_key, storage_key))

        r2_res, vectara_res = await asyncio.gather(task_1, task_2, return_exceptions=True)
        if isinstance(r2_res, Exception) or isinstance(vectara_res, Exception):
            raise DatabaseError("Error occurred during document deletion, please try again") from (
                r2_res if isinstance(r2_res, Exception) else vectara_res
            )
        # Lastly from Supabase
        try:
            # We need to ensure this is indeed marked as deleted or really deleted
            await self.documents_repo.delete_by_id(id=document_id)
        except DatabaseError as db_exc:
            logger.exception("Database error during document deletion: %s", db_exc)
            raise
