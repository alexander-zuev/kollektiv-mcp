from typing import Any, ClassVar

from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.infrastructure.settings import Environment

logger = get_logger(__name__)


class AllowedOrigins:
    """Allowed origins for CORS."""

    LOCAL = "*"  # Allow all origins for local development
    STAGING: ClassVar[list[str]] = [
        "https://staging.thekollektiv.ai",
        "https://staging-mcp.thekollektiv.ai",
        "https://*.railway.app",
        "https://*.up.railway.app",
        "https://*.railway.internal",
    ]
    PRODUCTION: ClassVar[list[str]] = [
        "https://thekollektiv.ai",
        "https://mcp.thekollektiv.ai",
        "https://*.railway.app",
        "https://*.up.railway.app",
        "https://*.railway.internal",
    ]


def get_cors_config(environment: Environment) -> dict[str, Any]:
    """Get the CORS configuration based on the environment."""
    cors_config = {
        "allow_origins": getattr(AllowedOrigins, environment.value.upper()),
        "allow_credentials": True,
        "allow_methods": ["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
        "allow_headers": [
            "Authorization",
            "Content-Type",
            "X-Request-ID",
            "baggage",
            "sentry-trace",
            "X-Client-ID",
            "X-User-Id",
        ],
    }
    logger.debug(f"Configuring CORS with allowed origins: {cors_config.get('allow_origins', [])}")
    return cors_config
