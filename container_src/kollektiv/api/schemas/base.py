from typing import Any

from fastapi import HTTPException, status
from pydantic import BaseModel, Field


class ErrorDetails(BaseModel):
    """Standard error response model."""

    message: str = Field(
        ...,
        description="Human-readable error message, as a rule should be "
        "meant for user consumption and not for programmatic ",
    )
    details: dict[str, Any] | None = Field(
        default=None, description="Optional additional error details, such as user_id, request_id, etc. "
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "message": "Resource not found",
                "details": {"resource_id": "The specified resource could not be found."},
            }
        }
    }


class APIException(HTTPException):
    """Base exception for all API exceptions, with custom serialization."""

    def __init__(self, status_code: int, detail: ErrorDetails, headers: dict[str, str] | None = None) -> None:
        if isinstance(detail, ErrorDetails):
            detail = detail.model_dump(mode="json")
        super().__init__(status_code=status_code, detail=detail, headers=headers)

    @classmethod
    def from_error(cls, status_code: status, error_message, details: dict[str, Any] | None = None):
        """Create an instance of this exception from an error message and error code."""
        return cls(status_code=status_code, detail=ErrorDetails(message=error_message, details=details))
