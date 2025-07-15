"""
Root endpoint for the API server.

This module provides the root endpoint (/) that returns basic API information.
"""

from fastapi import APIRouter, status

from kollektiv.__init__ import version

# from kollektiv.api.deps import rate_limit
from kollektiv.api.routes.config import Routes, Tags
from kollektiv.api.schemas.root import RootResponse
from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.infrastructure.settings import get_settings

logger = get_logger(__name__)
settings = get_settings()

# Create router
router = APIRouter(tags=[Tags.ROOT])


@router.get(
    Routes.Root.ROOT,
    status_code=status.HTTP_200_OK,
    summary="API Information",
    description="Get basic information about the API server",
    # dependencies=[Depends(rate_limit)],
)
async def get_api_info() -> RootResponse:
    """
    Get basic information about the API server.

    This endpoint provides metadata about the API including version,
    environment, and links to documentation and health check.
    """
    logger.debug("Root endpoint accessed")

    # Base URL for constructing links
    base_url = f"http{'s' if not settings.debug else ''}://{settings.api_host}"
    if settings.api_port not in {80, 443}:
        base_url = f"{base_url}:{settings.api_port}"

    return RootResponse(
        name="Kollektiv API",
        version=version,
        environment=settings.environment.value,
        description="API server for Kollektiv MCP",
        documentation=f"{base_url}/docs",
        health_check=f"{base_url}/v1/health",
    )
