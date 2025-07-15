from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, File, Path, UploadFile, status
from pydantic import ValidationError

from kollektiv.api.deps import DocumentServiceDep, GetCurrentUserFromHeader
from kollektiv.api.routes.config import Routes
from kollektiv.api.schemas.base import APIException, ErrorDetails
from kollektiv.api.schemas.documents import DocumentView
from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.shared.exceptions import DatabaseError, DocumentUploadError, DuplicateDocumentError

logger = get_logger(__name__)

router = APIRouter()


@router.post(
    Routes.Data.DOCUMENTS,
    status_code=status.HTTP_201_CREATED,
    summary="Upload a document",
    description="Uploads a document to the vector database",
)
async def upload_documents(
    user_id: GetCurrentUserFromHeader,
    document_service: DocumentServiceDep,
    file: Annotated[UploadFile, File(description="Document to upload for processing.")] = ...,
) -> DocumentView:
    """
    Receives one *binary* file via multipart/form-data.

    – `user_id` comes from the auth dependency
    – `DocumentService.upload_document()` does the heavy lifting
    """

    try:
        logger.info(f"Uploading document for user: {user_id}")
        document = await document_service.upload_document(file, user_id)
        return DocumentView.from_domain(document)
    except DuplicateDocumentError as e:
        raise APIException(
            status_code=status.HTTP_409_CONFLICT,
            detail=ErrorDetails(
                message=str(e),
                details={"user_id": user_id},
            ),
        ) from e
    except DocumentUploadError as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ErrorDetails(
                message=str(e),
                details={"user_id": user_id},
            ),
        ) from e
    except ValidationError as e:
        raise APIException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=ErrorDetails(
                message=f"{file.filename} failed to upload. Please try again again.",
                details={"user_id": user_id},
            ),
        ) from e


@router.get(
    Routes.Data.DOCUMENTS,
    summary="List documents uploaded by a user",
    description="Returns a list of documents uploaded by a user",
)
async def list_documents(user_id: GetCurrentUserFromHeader, document_service: DocumentServiceDep) -> list[DocumentView]:
    """Returns a list of documents a user has uploaded"""
    try:
        logger.info(f"Retrieving documents for user: {user_id}")
        documents = await document_service.retrieve_documents(user_id=user_id)
        return [DocumentView.from_domain(doc) for doc in documents]

    except (DatabaseError, ValidationError) as e:
        raise APIException(
            status_code=500,
            detail=ErrorDetails(
                message="Failed to retrieve user documents. Please try again later.",
                details={"user_id": user_id},
            ),
        ) from e


@router.delete(
    Routes.Data.DOCUMENT_BY_ID,
    status_code=status.HTTP_204_NO_CONTENT,  # conventional “delete” response
    summary="Delete a single document",
    description="Removes a document from storage and metadata DB",
)
async def delete_document(
    user_id: GetCurrentUserFromHeader,
    document_service: DocumentServiceDep,
    document_id: Annotated[UUID, Path(description="The ID of the document to delete")],
):
    """Deletes a single document"""
    try:
        logger.info(f"Deleting document: {document_id} for user: {user_id}")
        await document_service.delete_document(document_id=document_id)
    except DatabaseError as e:
        raise APIException.from_error(
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            "Document deletion failed, please try again later.",
            details={"document_id": document_id, "user_id": user_id},
        ) from e
