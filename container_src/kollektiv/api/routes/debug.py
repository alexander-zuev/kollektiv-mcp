from fastapi import APIRouter, status
from pydantic import EmailStr

from kollektiv.api.deps import SupabaseClientDep
from kollektiv.api.routes.config import Tags
from kollektiv.api.schemas.base import APIException, ErrorDetails
from kollektiv.infrastructure.logging.app_logger import get_logger
from supabase import AuthApiError

logger = get_logger(__name__)

router = APIRouter(tags=[Tags.DEBUG])


@router.post("/sign-in")
async def sign_in_to_get_jwt(
    supabase_client: SupabaseClientDep,
    email: EmailStr = "test@user.com",
    password: str = "test1234",
):
    """Signs user in and returns user response"""
    supabase = supabase_client.supabase
    try:
        response = await supabase.auth.sign_in_with_password({"email": email, "password": password})
        session = response.session
        jwt = session.access_token
        return jwt
    except AuthApiError as e:
        logger.error("Error signing in: %s", e)
        return APIException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=ErrorDetails(
                message=f"Authentication error: {e!s}",
                details={"service": "debug-jwt"},
            ),
        )
