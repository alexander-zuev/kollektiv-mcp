from fastapi import FastAPI, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.requests import Request

from kollektiv.api.schemas.base import ErrorDetails
from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.shared.exceptions import RateLimitExceeded

logger = get_logger(__name__)


async def rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded) -> JSONResponse:
    error_content = ErrorDetails(
        message=f"Rate limit exceeded: {exc.limit}",
        details={"service": "rate_limit"},
    )
    return JSONResponse(
        status_code=status.HTTP_429_TOO_MANY_REQUESTS,
        content=error_content.model_dump(),
    )


def _simplify_validation(exc: RequestValidationError) -> list[dict[str, str]]:
    """Return [{field, message}, …] instead of Pydantic’s nested structure."""
    return [{"field": ".".join(str(p) for p in err["loc"]), "message": err["msg"]} for err in exc.errors()]


async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    errors = _simplify_validation(exc)
    # FE-friendly payload
    error_content = ErrorDetails(
        message="Invalid request payload.",
        details={"errors": errors},
    )

    # We log at ERROR level without traceback; Logfire will still attach request id.
    logger.error("Validation error on %s %s: %s", request.method, request.url.path, errors)

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=error_content.model_dump(),
    )


async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """
    Catches everything that slipped through.

    Not logged since Logfire will capture it
    """
    # logger.exception("Unhandled exception for %s %s", request.method, request.url.path,
    #                  exc_info=exc)

    error_content = ErrorDetails(
        message="An unexpected internal server error occurred.",
        details={"exception_type": type(exc).__name__},
    )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=error_content.model_dump(mode="json"),
    )


def register_exceptions(app: FastAPI) -> FastAPI:
    app.exception_handler(RateLimitExceeded)(rate_limit_exceeded_handler)
    app.exception_handler(RequestValidationError)(validation_exception_handler)
    app.exception_handler(Exception)(global_exception_handler)

    return app
