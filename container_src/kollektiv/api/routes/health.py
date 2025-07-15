import datetime

from fastapi import APIRouter, Request, status

from kollektiv.__init__ import version

# from query.api.deps import rate_limit
from kollektiv.api.routes.config import Routes, Tags
from kollektiv.api.schemas.health import HealthResponse
from kollektiv.infrastructure.logging.app_logger import get_logger

logger = get_logger(__name__)

# Create router
router = APIRouter(tags=[Tags.HEALTH])


@router.get(
    Routes.Root.HEALTH,
    status_code=status.HTTP_200_OK,
    summary="Health Check",
    description="Check if the API server is running correctly",
    # dependencies=[Depends(rate_limit)],
)
async def health_check(request: Request) -> HealthResponse:
    """
    Perform a health check on the API server.

    This endpoint can be used by monitoring tools to check if the API server
    is running correctly. It returns a 200 OK response if the server is healthy.
    """
    from kollektiv.infrastructure.settings import get_settings

    settings = get_settings()

    logger.debug("Health check requested")

    return HealthResponse(
        status="healthy",
        version=version,
        timestamp=datetime.datetime.now().isoformat(),
        environment=settings.environment.value,
    )
