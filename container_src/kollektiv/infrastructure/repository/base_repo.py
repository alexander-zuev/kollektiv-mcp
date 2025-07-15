from json.decoder import JSONDecodeError
from typing import Any, TypeVar

from postgrest import APIResponse, AsyncQueryRequestBuilder
from postgrest.exceptions import APIError
from pydantic import BaseModel

from kollektiv.infrastructure.clients.supabase_client import SupabaseClient
from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.shared.exceptions import (
    DatabaseConnectionError,
    DatabaseIntegrityConstraintError,
    DatabaseQueryError,
    DatabaseSerializationError,
)
from supabase import AsyncClient

logger = get_logger(__name__)

T = TypeVar("T", bound=BaseModel)


# R = TypeVar("R")


class BaseSupabaseRepository:
    def __init__(self, supabase_client: SupabaseClient) -> None:
        self.supabase: AsyncClient = supabase_client.supabase

    async def execute_query(self, query_builder: AsyncQueryRequestBuilder) -> APIResponse[Any]:
        """
        Execute a PostgREST query builder with proper error handling.

        Args:
            query_builder: The constructed PostgREST query builder instance.

        Returns:
            The APIResponse object from the executed query.

        Raises:
            DatabaseSerializationError: If JSON serialization/deserialization fails
            DatabaseSchemaError: If a table or column doesn't exist
            DatabasePermissionError: If the user doesn't have permission
            DatabaseQueryError: For other query errors
        """
        try:
            if self.supabase is None:
                raise DatabaseConnectionError("Supabase client not initialized. Call `.initialize()` before use.")

            return await query_builder.execute()
        except JSONDecodeError as exc:
            raise DatabaseSerializationError(f"JSON decode error: {exc}") from exc
        except APIError as exc:
            msg = exc.message if hasattr(exc, "message") else str(exc)
            code = getattr(exc, "code", None)
            hint = getattr(exc, "hint", None)
            details = getattr(exc, "details", None)

            # Categorize API errors based on error message patterns
            if code in ("23000", "23505", "23001", "23502", "23503", "23514", "23P01"):
                raise DatabaseIntegrityConstraintError(msg, code=code, hint=hint, details=details) from exc

            err = DatabaseQueryError(msg, code=code, hint=hint, details=details)
            err.hint, err.details = hint, details
            raise err from exc

        except Exception:
            raise
