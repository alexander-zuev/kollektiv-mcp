from datetime import datetime
from typing import Self
from uuid import UUID

from pydantic import BaseModel, Field

from kollektiv.models.documents import Document, DocumentProcessingStatus


class DocumentView(BaseModel):
    """Document view schema."""

    id: UUID = Field(..., description="Unique identifier for the document")
    filename: str = Field(..., description="Filename of the document with extension")
    filesize: int = Field(..., description="Size of the document in bytes", gt=0)
    status: DocumentProcessingStatus = Field(..., description="Current processing status of the document")
    uploaded_at: datetime = Field(..., description="Timestamp when the document was uploaded")

    @classmethod
    def from_domain(cls, document: Document) -> Self:
        return cls(
            id=document.id,
            filename=document.original_filename,
            filesize=document.filesize,
            status=document.status,
            uploaded_at=document.uploaded_at,
        )
