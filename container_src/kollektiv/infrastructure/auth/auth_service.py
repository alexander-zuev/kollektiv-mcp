from fastapi import status
from gotrue.types import UserResponse

from kollektiv.infrastructure.clients.supabase_client import SupabaseClient
from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.shared.exceptions import AuthenticationError
from supabase import AsyncClient, AuthError

logger = get_logger(__name__)


class AuthService:
    """User authentication service. Handles token <> user exchange and validation"""

    def __init__(self, supabase_client: SupabaseClient):
        self.supabase: AsyncClient = supabase_client.supabase

    @staticmethod
    def match_auth_error_to_http_status(error_code: str) -> int:
        """Matches error code string to HTTP Exception status"""
        match error_code:
            case (
                "bad_jwt"
                | "user_not_found"
                | "no_authorization"
                | "session_not_found"
                | "invalid_credentials"
                | "reauthentication_needed"
                | "reauthentication_not_valid"
            ):
                return status.HTTP_401_UNAUTHORIZED
            case "not_admin" | "user_banned" | "user_sso_managed" | "email_address_not_authorized":
                return status.HTTP_403_FORBIDDEN
            case "over_request_rate_limit" | "over_email_send_rate_limit" | "over_sms_send_rate_limit":
                return status.HTTP_429_TOO_MANY_REQUESTS
            case "validation_failed" | "bad_json" | "bad_oauth_callback" | "bad_oauth_state" | "captcha_failed":
                return status.HTTP_400_BAD_REQUEST
            case (
                "unexpected_failure"
                | "hook_timeout"
                | "hook_timeout_after_retry"
                | "hook_payload_over_size_limit"
                | "hook_payload_invalid_content_type"
                | "saml_metadata_fetch_failed"
            ):
                return status.HTTP_500_INTERNAL_SERVER_ERROR
            case _:
                return status.HTTP_401_UNAUTHORIZED

    def get_authentication_exception(self, e: AuthError) -> AuthenticationError:
        """Centrally handles all auth errors from supabase"""
        status_code = self.match_auth_error_to_http_status(e.code)
        logger.error(f"Error {e.code} handling JWT validation: {e}")

        return AuthenticationError(message="Authentication error occurred.", status_code=status_code, error_code=e.code)

    async def resolve_user(self, token: str) -> UserResponse:
        try:
            user = await self.supabase.auth.get_user(token)
            if user is None:
                logger.warning("Supabase returned None when resolving user")
                raise AuthenticationError(
                    message="Failed to resolve user. Please try again later.",
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    error_code="user_not_found",
                )

            logger.debug(f"Retrieved user from Supabase with id {user.user.id}")
            return user

        # Handle errors
        except AuthenticationError:
            raise
        except AuthError as e:
            raise self.get_authentication_exception(e) from e
        except Exception as e:
            logger.exception(f"Unexpected error occurred when resolving user:{e}")
            raise AuthenticationError(
                message="Failed to resolve user. Please try again later.",
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                error_code="unexpected_failure",
            ) from e
