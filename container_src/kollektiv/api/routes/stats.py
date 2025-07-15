from fastapi import APIRouter, status
from pydantic import ValidationError

from kollektiv.api.deps import GetCurrentUserFromHeader, SupabaseClientDep
from kollektiv.api.routes.config import Routes
from kollektiv.api.schemas.base import APIException, ErrorDetails
from kollektiv.api.schemas.stats import UserStatsResponse
from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.shared.exceptions import DatabaseError

logger = get_logger(__name__)

router = APIRouter()


@router.get(
    Routes.Data.USER_STATS,
    summary="Returns the number of queries the user has made",
    description="Returns the number of queries the user has made",
)
async def get_user_stats(user_id: GetCurrentUserFromHeader, supabase_client: SupabaseClientDep) -> UserStatsResponse:
    """Returns user query stats"""
    try:
        logger.info(f"Retrieving stats for user: {user_id}")
        supabase = supabase_client.supabase
        stats = (
            await supabase.schema("public")
            .table("query_stats_view")
            .select("count")
            .eq("user_id", str(user_id))
            .single()
            .execute()
        )
        result = UserStatsResponse(queries=stats.data["count"])
        return result
    except (DatabaseError, ValidationError) as e:
        logger.exception(f"Exception occurred while retrieving user stats: {e}")
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=ErrorDetails(
                message="Failed to retrieve user stats. Please try again later.",
                details={"user_id": str(user_id)},
            ),
        ) from e
