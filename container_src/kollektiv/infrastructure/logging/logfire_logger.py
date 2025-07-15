import os

import logfire
from fastapi import FastAPI

from kollektiv.__init__ import __version__
from kollektiv.infrastructure.logging.app_logger import get_logger, is_github_actions, is_test_environment
from kollektiv.infrastructure.settings import Environment, Settings, get_settings

logger = get_logger(__name__)


def configure_code_source(settings: Settings) -> logfire.CodeSource:
    # Try to get from environment first (CI/CD can set this)
    revision = os.environ.get("GIT_COMMIT_HASH")

    # If not in environment, try to extract from version
    if not revision:
        parts = __version__.split("+g")
        if len(parts) > 1:
            revision = parts[1].split(".")[0]
        else:
            # For clean releases without hash, use the version itself
            # This will point to the tag in GitHub
            revision = f"v{__version__}"

    return logfire.CodeSource(
        repository=settings.repo_url,
        revision=revision,
    )


def configure_sampling(settings: Settings) -> logfire.SamplingOptions:
    # Configure sampling differently based on environment
    if settings.environment == Environment.PRODUCTION.value:
        # Production: Keep errors, long operations, and a small sample of normal traffic
        # TODO: as app usage scales -> sample rate can be decreased to economize the logfire spans
        return logfire.SamplingOptions.level_or_duration(
            level_threshold="info",  # Always capture errors
            duration_threshold=0.25,  # Keep anything slower than >250ms
            background_rate=0.75,  # Keep 75% of normal traffic for baseline
        )
    else:
        # Development/Staging: Capture more data
        return logfire.SamplingOptions.level_or_duration(
            level_threshold="debug",  # Capture warnings and errors
            duration_threshold=1.0,  # Keep anything slower than 1.0s
            background_rate=0.05,  # Keep 5% of normal traffic
        )


def configure_logfire(settings: Settings) -> None:
    """Configure Logfire for comprehensive monitoring of our FastAPI application."""
    logfire.configure(
        service_name=settings.app_name,
        send_to_logfire=settings.enable_logfire,
        token=settings.logfire_token,
        environment=settings.environment.value,
        code_source=configure_code_source(settings=settings),
        sampling=configure_sampling(settings),
        console=False,  # don't log to console since we have our own logger
    )


def instrument_libraries(app: FastAPI) -> None:
    settings = get_settings()

    # Skip instrumentation if in CI or test environment
    if not settings.enable_logfire or is_github_actions() or is_test_environment():
        logger.debug("Skipping logfire instrumentation")
        return

    logfire.instrument_fastapi(app, capture_headers=True)

    # Configure system metrics with balanced monitoring
    logfire.instrument_system_metrics(
        {
            # CPU metrics
            "system.cpu.simple_utilization": None,  # Overall system CPU
            # ⚠️ Optional later: If diagnosing CPU-bound parallelism/threading issues.
            # "process.cpu.core_utilization": None,
            # "process.cpu.time": ["user", "system"],
            # Memory metrics - comprehensive coverage
            "system.memory.utilization": ["available", "used", "free"],  # System memory
            "process.memory.usage": None,  # Per-worker memory
            "process.memory.virtual": None,  # Virtual memory usage
            # ❌ Disable for now: Emits constant high-cardinality spans; only useful with traffic or alerts.
            # "system.network.io": None,
            # "system.network.errors": ["transmit", "receive"],
            # ❌ Disable for now: Disk I/O rarely relevant unless debugging storage-intensive workloads.
            # "system.disk.io": None,
            # ❌ Disable for now: Only useful in edge debugging or advanced profiling.
            # "process.thread.count": None,
            # "process.open_file_descriptor.count": None,
        }
    )

    logfire.instrument_httpx(capture_headers=True)
    logger.info("Logfire instrumented libraries")
