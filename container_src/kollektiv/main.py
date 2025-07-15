from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.types import ASGIApp

# from starlette.middleware.cors import CORSMiddleware
from kollektiv.api.handlers.exception_handlers import register_exceptions
from kollektiv.api.main import api_router
from kollektiv.api.middleware.cors import get_cors_config
from kollektiv.infrastructure.clients.cloudflare_client import CloudflareClient
from kollektiv.infrastructure.clients.r2_client import R2Client
from kollektiv.infrastructure.clients.supabase_client import SupabaseClient
from kollektiv.infrastructure.clients.vectara_client import VectaraClient
from kollektiv.infrastructure.container import ServicesContainer
from kollektiv.infrastructure.logging.app_logger import configure_logging, get_logger

# from kollektiv.api.middleware.limiter.limiter import rate_limiter
from kollektiv.infrastructure.logging.logfire_logger import configure_logfire, instrument_libraries
from kollektiv.infrastructure.settings import Environment, get_settings
from kollektiv.services.llm_agent import LLMAgent


# TODO: Why is lifespan unused?
@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Handle application startup and shutdown events."""
    logger = get_logger(__name__)
    logger.info("Starting application lifecycle")
    settings = get_settings()

    services_container = ServicesContainer.get_instance()

    await services_container.initialize(
        settings=settings,
        supabase_client=SupabaseClient(settings=settings),
        vectara_client=VectaraClient(settings=settings),
        cf_client=CloudflareClient(settings=settings),
        r2_client=R2Client(settings=settings),
        llm_agent=LLMAgent(settings=settings),
    )
    try:
        yield
    finally:
        await services_container.shutdown()


def create_app() -> ASGIApp:
    """Create and configure the FastAPI application."""
    settings = get_settings()
    configure_logfire(settings)
    configure_logging(settings)
    logger = get_logger("app")

    logger.info(f"Environment: {settings.environment.value}, Debug: {settings.debug}")

    app = FastAPI(
        title="kollektiv MCP API",
        description="API server for kollektiv MCP",
        # version=version,
        lifespan=lifespan,
        redoc_url="/redoc",
    )

    # Instrument FastAPI app with Logfire
    instrument_libraries(app)

    # Add routes
    app.include_router(api_router)

    # Register exception
    app = register_exceptions(app)

    # Add CORS middleware
    cors_config = get_cors_config(settings.environment)
    app = CORSMiddleware(app, **cors_config)

    return app


def run() -> None:
    """Run the FastAPI application with environment-specific settings."""
    try:
        app_path = "kollektiv.main:create_app"
        settings = get_settings()

        uvicorn.run(
            factory=True,
            app=app_path,
            loop="uvloop",
            host=settings.api_host,
            port=settings.api_port,
            reload=True if settings.environment == Environment.LOCAL else False,
            workers=settings.gunicorn_workers if settings.environment != Environment.LOCAL else None,
            log_level="debug" if settings.debug else "info",
        )

    except KeyboardInterrupt:
        raise
    except Exception:
        raise


if __name__ == "__main__":
    run()
