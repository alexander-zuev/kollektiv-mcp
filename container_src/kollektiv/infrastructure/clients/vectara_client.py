import asyncio
import random
from datetime import UTC, datetime
from typing import Final
from urllib.parse import quote, unquote
from uuid import UUID

from httpx import AsyncClient, Timeout
from vectara import (
    AsyncVectara,
    ContextConfiguration,
    Document,
    KeyedSearchCorpus,
    QueryFullResponse,
    SearchCorporaParameters,
)
from vectara.core.api_error import ApiError

from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.infrastructure.settings import Settings
from kollektiv.shared.exceptions import RetrievalError, VectaraError, VectaraOperation

logger = get_logger(__name__)

_MAX_RETRIES: Final = 2  # two retries → 3 attempts in total
_BASE_BACKOFF: Final = 1  # seconds; will be jittered


class VectaraClient:
    """Wrapper for AsyncVectara API client that properly manages its lifecycle."""

    def __init__(self, settings: Settings):
        """Initialize the Vectara client once with credentials from settings.

        Args:
            settings: Application settings containing Vectara credentials
        """
        self.vectara_client_id = settings.vectara_client_id
        self.vectara_client_secret = settings.vectara_client_secret
        self.corpora_key = settings.vectara_corpus_id
        self.http_client = AsyncClient(timeout=Timeout(60))
        self.client = AsyncVectara(
            client_id=self.vectara_client_id, client_secret=self.vectara_client_secret, httpx_client=self.http_client
        )
        logger.info("✓ Vectara client initialized successfully")

    async def close(self) -> None:
        """Close the Vectara client properly by closing the managed httpx client."""
        if self.http_client and not self.http_client.is_closed:
            await self.http_client.aclose()
            logger.info("Vectara client's underlying HTTP client closed successfully")

    @staticmethod
    def _encode_doc_id(raw: str) -> str:
        """
        Returns an RFC-3986–compatible document ID.

        • Percent-encodes every byte that is not unreserved
        • Keeps the string deterministic (important for duplicates)
        """
        return quote(raw, safe="")  # empty `safe` → encode everything

    async def upload_to_vectara(
        self,
        original_filename: str,
        vectara_doc_id: str,
        file_bytes: bytes,
        user_id: UUID,
        kollektiv_doc_id: UUID,
    ) -> Document:
        """
        Uploads `file_bytes` under `doc_id=filename`.

        On the first 409 it deletes the stale copy and retries once.
        Any other error or a second 409 is escalated to the caller.
        """
        doc_id = self._encode_doc_id(vectara_doc_id)
        metadata = {
            "user_id": str(user_id),
            "upload_ts": datetime.now(UTC).isoformat(),
            "original_filename": original_filename,
            "kollektiv_doc_id": kollektiv_doc_id,
        }
        logger.debug("Uploading %s as %s for user:%s", vectara_doc_id, doc_id, user_id)
        response = await self._upload_with_retry(file_bytes, doc_id, attempt=False, metadata=metadata)
        vectara_file_id, vectara_bytes_used = response.id, response.storage_usage.bytes_used
        logger.info(f" ✓ Uploaded {vectara_file_id} ({vectara_bytes_used}) to Vectara")
        return response

    async def _upload_with_retry(
        self,
        file_bytes: bytes,
        filename: str,
        metadata: dict,
        attempt: int = 0,
    ) -> Document:
        logger.debug("Uploading %s (attempt #%d)…", filename, attempt + 1)

        try:
            return await self.client.upload.file(
                corpus_key=self.corpora_key,
                file=file_bytes,
                filename=filename,
                metadata=metadata,
            )

        except ApiError as exc:
            # ───────────────────────────── error classification ────────────────────────────── #
            match exc.status_code:
                case 409:  # Duplicate
                    reason = "duplicate"
                case code if code >= 500:  # Transient server error
                    reason = f"server error {code}"
                case _:
                    logger.error("Upload failed with %s", exc.status_code)
                    raise VectaraError(
                        operation="upload",
                        status_code=exc.status_code,
                        body=exc.body,
                    ) from exc
            # ───────────────────────────────── retry gate ──────────────────────────────────── #
            if attempt >= _MAX_RETRIES:
                logger.error("%s even after %d retries", reason.capitalize(), _MAX_RETRIES)
                raise VectaraError(
                    operation=VectaraOperation.UPLOAD,
                    status_code=exc.status_code,
                    body=exc.body,
                    message=f"{reason.capitalize()} for '{filename}' after {_MAX_RETRIES + 1} attempts.",
                ) from exc

            logger.warning("%s; deleting then retrying…", reason.capitalize())
            await self.delete_document(self.corpora_key, filename)

            # Exponential back-off with light jitter: 1 s, 2 s, …
            delay = _BASE_BACKOFF * (2**attempt) * (1 + random.random() * 0.2)
            await asyncio.sleep(delay)

            return await self._upload_with_retry(
                file_bytes=file_bytes,
                filename=filename,
                metadata=metadata,
                attempt=attempt + 1,
            )

    async def delete_document(self, corpus_key: str, filename: str) -> None:
        """
        Best-effort delete. 404 (“not found”) is considered success because the
        goal is simply to ensure that *no* document with this ID exists before
        re-uploading.
        """
        # Detect “already encoded” by the presence of '%' that decodes into a change
        decoded = unquote(filename)
        doc_id = filename if decoded != filename else self._encode_doc_id(filename)

        try:
            return await self.client.documents.delete(corpus_key, doc_id)
        except ApiError as exc:
            if exc.status_code == 404:
                logger.warning(f"Document {doc_id} not found in Vectara, skipping delete.")
                return None
            logger.error(f"Vectara returned {exc.status_code} while deleting document {doc_id}")
            raise VectaraError(
                operation=VectaraOperation.DELETE,
                status_code=exc.status_code,
                body=exc.body,
                message=f"Failed to delete document {doc_id} from Vectara.",
            ) from exc

    def build_metadata_filters(self, user_id: UUID) -> str:
        return f"doc.user_id = '{user_id!s}'"

    def prepare_query_settings(
        self,
        user_id: UUID,
    ) -> SearchCorporaParameters:
        if not user_id or user_id == "":
            raise RetrievalError("User ID must be provided at all time to retrieve results for a query.")
        logger.debug("Preparing Vectara query settings…")
        logger.debug(f"Querying Vectara for user: {user_id}")

        metadata_filter = self.build_metadata_filters(user_id)

        search = SearchCorporaParameters(
            corpora=[
                KeyedSearchCorpus(
                    corpus_key=self.corpora_key,
                    metadata_filter=metadata_filter,
                    lexical_interpolation=0.05,
                )
            ],
            context_configuration=ContextConfiguration(
                sentences_before=2,
                sentences_after=2,
            ),
            limit=3,
        )
        return search

    async def query_corpus(self, query: str, user_id: UUID) -> QueryFullResponse:
        """
        Query the Vectara corpus for `query`.
        """
        search = self.prepare_query_settings(user_id)

        logger.debug(f"Querying Vectara for '{query}'…")
        try:
            response = await self.client.query(query=query, search=search)
            return response
        except ApiError as e:
            logger.debug(f"Error {e.status_code}: {e!s}")
            status = e.status_code
            body = e.body

            if status == 404:
                raise RetrievalError("Document or corpus not found.") from e
            elif status == 403:
                raise RetrievalError("Unauthorized or access denied.") from e
            elif status == 412:
                messages = body.get_by_id("messages", [])
                logger.debug(f"412 error with messages: {messages}")

                if any("factual consistency" in msg.lower() and "summarizer error" in msg.lower() for msg in messages):
                    logger.warning(
                        "API returned 412 error due to factual consistency score - returning empty response."
                    )
                    raise RetrievalError(
                        "Query did not return any results - try changing the query.", status_code=status
                    ) from e
                raise RetrievalError(f"412 Precondition Failed: {messages}", status_code=status) from e
            else:
                raise RetrievalError("Unexpected error during retrieval") from e
