from datetime import UTC, datetime
from enum import Enum
from hashlib import sha256
from uuid import UUID, uuid4

from pydantic import Field

from kollektiv.models.aggregates import AggregateBaseModelABC


class DocumentProcessingStatus(str, Enum):
    PROCESSING = "processing"
    AVAILABLE = "available"
    FAILED = "failed"
    DELETED = "deleted"


class Document(AggregateBaseModelABC):
    id: UUID = Field(default_factory=uuid4, description="Unique identifier for the document")
    user_id: UUID = Field(..., description="Unique identifier for the user who uploaded the document")
    original_filename: str = Field(..., description="Original filename of the document with extension")
    content_type: str = Field(..., description="MIME Content type of the document provided by UploadFile")

    storage_key: str = Field(..., description="Filename under which the document is stored in R2 and Vectara")
    filesize: int = Field(..., description="Size of the document in bytes", gt=0)
    checksum: str = Field(..., description="SHA256 hash of the document")
    status: DocumentProcessingStatus = Field(
        default=DocumentProcessingStatus.AVAILABLE, description="Current processing status of the document"
    )
    uploaded_at: datetime | None = Field(default=None, description="Timestamp when the document was uploaded")

    @staticmethod
    def _checksum(data: bytes) -> str:
        """Return SHA-256 for given bytes."""
        return sha256(data).hexdigest()

    @classmethod
    def build_storage_key(cls, user_id: UUID, filename: str) -> str:
        """Build a storage key for a document under a given user ID."""
        safe_name = filename.replace("/", "_").replace(" ", "_")[:40]
        return f"{user_id}/{safe_name}"

    @classmethod
    def from_upload(
        cls,
        *,
        id: UUID,
        user_id: UUID,
        file_name: str,
        file_bytes: bytes,
        content_type: str,
    ) -> "Document":
        storage_key = cls.build_storage_key(user_id, file_name)
        return cls(
            id=id,
            user_id=user_id,
            original_filename=file_name,
            content_type=content_type,
            storage_key=storage_key,
            filesize=len(file_bytes),
            checksum=cls._checksum(file_bytes),
            uploaded_at=datetime.now(UTC),
        )
