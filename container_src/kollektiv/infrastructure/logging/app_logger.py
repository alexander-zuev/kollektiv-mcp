import logging
import os
import sys

import logfire

from kollektiv.infrastructure.settings import Settings


def is_github_actions() -> bool:
    """
    Detect if the application is running in GitHub Actions.

    Returns:
        bool: True if running in GitHub Actions, False otherwise
    """
    return bool(os.environ.get("GITHUB_ACTIONS"))


def is_test_environment() -> bool:
    """
    Detect if the application is running in a test environment.

    Returns:
        bool: True if running in a test environment, False otherwise
    """
    # Check for pytest or other test frameworks
    return bool(os.environ.get("PYTEST_CURRENT_TEST"))


class ConsoleFormatter(logging.Formatter):
    """
    Define ab optimal format for my logger
    Create instance
    Return it for use
    """

    def __init__(self) -> None:
        format = "%(asctime)s - %(levelname)s - %(name)s:%(lineno)d - %(message)s"
        datefmt = "%Y-%m-%d %H:%M:%S"  # Optional: cleaner date format
        super().__init__(format, datefmt=datefmt)


def configure_logging(settings: Settings) -> None:
    """
    Configure the logging system for the application.

    This should be called ONCE at application startup.

    Args:
        settings: settings object containing application configuration
    """
    # For libraries -> DO NOT use root logger
    # For applications -> use root logger
    # This is an application logger, not a library logger
    # library_logger = logging.getLogger(settings.app_name) <- must match the package name

    app_logger = logging.getLogger()  # Get root logger
    log_level = logging.DEBUG if settings.debug else logging.INFO
    app_logger.setLevel(log_level)  # Set level on the app logger

    # Remove existing handlers to avoid duplicates
    for handler in app_logger.handlers[:]:
        app_logger.removeHandler(handler)

    # Setup console logger
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(log_level)
    console_handler.setFormatter(ConsoleFormatter())
    app_logger.addHandler(console_handler)

    # Skip Sentry initialization in test environments or GitHub Actions
    if is_test_environment() or is_github_actions():
        logging.info("Skipping Sentry initialization in test/CI environment")
    else:
        # Add Logfire handler for WARNING+ logs only
        logfire_handler = logfire.LogfireLoggingHandler()
        logfire_handler.setLevel(logging.WARNING)  # Only send warnings and above
        app_logger.addHandler(logfire_handler)
        logging.getLogger("logfire").setLevel(logging.ERROR)

    # Suppress noisy third-party loggers
    logging.getLogger("urllib3.connectionpool").setLevel(logging.WARNING)
    logging.getLogger("httpx").setLevel(logging.ERROR)
    logging.getLogger("httpx._client").setLevel(logging.ERROR)  # Client internals
    logging.getLogger("httpx._trace").setLevel(logging.ERROR)  # Trace logs like receive_response_body
    logging.getLogger("httpcore").setLevel(logging.WARNING)
    # Suppress multipart and hpack spam
    logging.getLogger("python_multipart.multipart").setLevel(logging.WARNING)
    logging.getLogger("hpack.hpack").setLevel(logging.WARNING)
    noisy_third_party = (
        "botocore",  # hooks, retries, etc.
        "boto3",  # high-level wrapper
        "aioboto3",  # async wrapper
        "s3transfer",  # internal transfer helper
        "aiobotocore",  # async low-level client (covers aiobotocore.regions)
        "openai",
    )

    for logger_name in noisy_third_party:
        logging.getLogger(logger_name).setLevel(logging.WARNING)


def get_logger(name: str) -> logging.Logger:
    """
    Get a logger instance with the given name.

    This does NOT configure the logging system - it just returns a logger.
    Call configure_logging() first at application startup.

    Args:
        The name of the logger.

    Returns:
        A configured logger instance
    """
    logger = logging.getLogger(name)

    # Add a null handler if no handlers are configured yet
    # This prevents "No handlers could be found" warnings
    # This is a common pattern in libraries, but not in applications
    if not logger.handlers and not logging.root.handlers:
        logger.addHandler(logging.NullHandler())

    return logger
