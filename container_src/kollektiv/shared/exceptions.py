from enum import Enum
from typing import Any, Final

# --------------------------------------------------------------------------- #
# Base classes                                                                #
# --------------------------------------------------------------------------- #


class AppError(Exception):
    """Root of all application-level exceptions (catch-all for the API layer)."""


class InfrastructureError(AppError):
    """Errors coming from external systems (network, storage, third-party APIs)."""


class DomainError(AppError):
    """Business-rule / service-layer errors (duplicate IDs, invalid state, …)."""


# --------------------------------------------------------------------------- #
# Helpers                                                                     #
# --------------------------------------------------------------------------- #


class HasStatusCode:  # simple mixin
    status_code: Final[int]

    def __init__(self, *_, status_code: int | None = None, **kw: Any) -> None:
        self.status_code = status_code or getattr(self, "status_code", None)
        super().__init__(*_, **kw)


class APIError(Exception):
    """Base class for API-related errors."""

    def __init__(
        self,
        message: str,
        status_code: int | None = None,
        response_body: dict[str, Any] | None = None,
    ):
        self.status_code = status_code
        self.response_body = response_body
        super().__init__(message)


# --- Rate limiter ----------------------------------------------------------- #


class RateLimiterError(InfrastructureError):
    pass


class RateLimitExceeded(RateLimiterError, HasStatusCode):
    status_code = 429

    def __init__(self, limit: str, message: str | None = None) -> None:
        self.limit = limit
        super().__init__(message or f"Rate limit exceeded: {limit}")


# --- Redis ------------------------------------------------------------------ #


class RedisError(InfrastructureError):
    """Generic Redis failure."""


class RedisConnectionError(RedisError):
    pass


class RedisOperationError(RedisError):
    pass


class APIResponseError(APIError):
    """Raised when an API response is invalid."""

    pass


class APIClientError(APIError):
    """Raised when an API client error occurs."""

    pass


class APIServerError(APIError):
    """Raised when an API server error occurs."""

    pass


class UnexpectedError(APIError):
    """Raised when an unexpected error occurs."""

    pass


# --- Database --------------------------------------------------------------- #


class DatabaseError(InfrastructureError):
    """Database interaction failed."""


class DatabaseConnectionError(DatabaseError):
    pass


class DatabaseQueryError(DatabaseError):
    def __init__(
        self, message: str, *, code: str | None = None, hint: str | None = None, details: str | None = None
    ) -> None:
        self.code = code
        self.hint = hint
        self.details = details
        super().__init__(message)


class DuplicateDocumentError(DatabaseQueryError):
    pass


class DatabaseSerializationError(DatabaseError):
    """Raised when JSON serialization/deserialization fails."""

    pass


class DatabaseSchemaError(DatabaseQueryError):
    """Raised when there's a schema-related error."""

    pass


class DatabasePermissionError(DatabaseQueryError):
    """Raised when there's a permission-related error."""

    pass


class DatabaseIntegrityConstraintError(DatabaseQueryError):
    """Raised when an operation violates an integrity constraint error.
    - 23000	integrity_constraint_violation
    - 23001	restrict_violation
    - 23502	not_null_violation
    - 23503	foreign_key_violation
    - 23505	unique_violation
    - 23514	check_violation
    - 23P01	exclusion_violation
    """

    pass


# --------------------------------------------------------------------------- #
# Domain / service-layer errors                                               #
# --------------------------------------------------------------------------- #


class RetrievalError(DomainError):
    def __init__(self, message: str, *, status_code: int | None = None) -> None:
        self.status_code = status_code
        super().__init__(message)


class DocumentUploadError(DomainError):
    pass


# --- Authentication ---------------------------------------------------------------- #
class AuthenticationError(DomainError):
    def __init__(self, message: str, *, status_code: int = 401, error_code: str) -> None:
        super().__init__(message)
        self.status_code = status_code
        self.error_code = error_code


# --- Vectara ---------------------------------------------------------------- #


class VectaraOperation(str, Enum):
    UPLOAD = "upload"
    DELETE = "delete"
    QUERY = "query"


class VectaraError(InfrastructureError):
    def __init__(
        self, *, operation: str, status_code: int | None = None, body: dict | None = None, message: str | None = None
    ):
        self.operation = operation
        self.status_code = status_code
        self.body = body
        super().__init__(message or f"{operation} failed")


# --- Cloudflare R2 ---------------------------------------------------------- #


class R2Error(InfrastructureError):
    """Base for Cloudflare R2 problems."""

    def __init__(
        self,
        *,
        operation: str,
        object_key: str | None = None,
        status_code: int | None = None,
        message: str | None = None,
    ):
        super().__init__(message or f"{operation} failed")
        self.operation = operation
        self.object_key = object_key
        self.status_code = status_code


class CloudflareError(InfrastructureError):
    """Raised when a Cloudflare client operation fails."""

    pass
