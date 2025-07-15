from json.decoder import JSONDecodeError
from typing import Any, TypeVar

import httpx
from httpx import AsyncClient, Request, Response
from tenacity import RetryCallState, retry, retry_if_exception_type, stop_after_attempt, wait_exponential

from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.shared.exceptions import (
    APIClientError,
    APIResponseError,
    APIServerError,
    UnexpectedError,
)

logger = get_logger(__name__)

T = TypeVar("T")


def log_retry_attempt(retry_state: RetryCallState) -> None:
    """Log retry attempts with exception details if available."""
    exception = retry_state.outcome.exception() if retry_state.outcome and retry_state.outcome.failed else None
    exception_str = str(exception) if exception else "Unknown error"
    logger.warning(f"Network error, retrying ({retry_state.attempt_number}/3): {exception_str}")


class BaseHTTPClient:
    """
    Base HTTP client for async API access.

    Args:
        base_url (str): The base.py URL for all requests (e.g. "https://api.firecrawl.dev/v1").
        headers (dict, optional): Default headers for all requests.
        timeout (float | httpx.Timeout, optional): Timeout config for requests.
        **kwargs: Any other httpx.AsyncClient options.
    """

    def __init__(
        self,
        base_url: str = "",
        headers: dict[str, Any] | None = None,
        timeout: float | httpx.Timeout | None = None,
        **kwargs: Any,
    ) -> None:
        self.client: AsyncClient = self.create_client(
            base_url=base_url,
            headers=headers,
            timeout=timeout,
            **kwargs,
        )
        logger.info(f"✔️ HTTP client {self.__class__.__name__} created (base_url={base_url})")

    def create_client(
        self,
        base_url: str = "",
        headers: dict[str, Any] | None = None,
        timeout: float | httpx.Timeout | None = None,
        **kwargs: Any,
    ) -> AsyncClient:
        """
        Create a new HTTP client.

        Args:
            base_url (str): The base.py URL for all requests.
            headers (dict, optional): Default headers.
            timeout (float | httpx.Timeout, optional): Timeout config.
            **kwargs: Any other httpx.AsyncClient options.

        Returns:
            AsyncClient: Configured async client.
        """
        return AsyncClient(base_url=base_url, headers=headers, timeout=timeout, **kwargs)

    async def close_client(self) -> None:
        """Close the HTTP client."""
        if self.client:
            await self.client.aclose()
            logger.info("✔️ HTTP client closed")

    def _prepare_request(
        self,
        method: str,
        path: str,
        query_params: dict[str, Any] | None = None,
        json_body: dict[str, Any] | None = None,
        headers: dict[str, str] | None = None,
        **kwargs: Any,
    ) -> Request:
        """
        Prepare an HTTP request.

        Args:
            method: HTTP method (GET, POST, etc.)
            path: API path
            query_params: Query parameters
            json_body: Request body
            headers: Optional dictionary of headers to merge with default client headers.
            **kwargs: Additional keyword arguments passed directly to httpx's
                      `build_request`.

        Returns:
            Prepared httpx.Request object

        Raises:
            APIClientError: If request preparation fails
        """
        try:
            return self.client.build_request(
                method=method, url=path, params=query_params, json=json_body, headers=headers, **kwargs
            )
        except Exception as e:
            raise APIClientError(
                message=f"Failed to build request: {e!s}",
                status_code=None,
            ) from e

    @retry(
        retry=retry_if_exception_type(httpx.NetworkError),
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        reraise=True,  # Ensure the original exception is raised
        before_sleep=log_retry_attempt,
    )  # type: ignore
    async def _send_request(self, request: Request) -> Response:
        """
        Send an HTTP request with retry logic for transient errors.

        Args:
            request: Prepared httpx.Request object

        Returns:
            httpx.Response object

        Raises:
            APIConnectionError: For connection issues
            APIClientError: For other request errors
        """
        try:
            return await self.client.send(request)
        except httpx.NetworkError as e:
            # All NetworkErrors will be retried by the decorator
            # This will only be reached after all retries are exhausted
            logger.error(f"Network error after all retry attempts: {e!s}")
            raise
            # raise APIConnectionError(
            #     message=f"Network error after 3 retry attempts: {str(e)}",
            #     status_code=None,
            # ) from e
        except Exception as e:
            # Other exceptions won't be retried
            raise UnexpectedError(
                message=f"Unexpected error when sending a request: {e!s}",
                status_code=None,
            ) from e

    def parse_response(self, response: Response) -> dict[str, Any]:
        """
        Parse an HTTP response as JSON.

        Args:
            response: httpx.Response object

        Returns:
            Parsed response body as dictionary or an empty dictionary if no content

        Raises:
            APIResponseError: If response cannot be parsed as JSON
        """
        if not response.content:
            return {}

        try:
            return response.json()
        except JSONDecodeError as e:
            raise APIResponseError(
                message=f"Failed to parse response as JSON: {e!s}",
                status_code=response.status_code,
                response_body={"raw_content": response.text},
            ) from e

    def handle_error_response(self, response: Response) -> None:
        """
        Handle error responses based on status code.

        Args:
            response: httpx.Response object

        Raises:
            APIClientError: For client errors (4xx)
            APIServerError: For server errors (5xx)
            UnexpectedError: For unexpected status codes
        """
        # Extract error message
        try:
            error_json = response.json()
            message = error_json.get("message") or error_json.get("detail") or str(error_json)
        except JSONDecodeError:
            message = response.text.strip()

        error_message = f"{response.status_code} {response.reason_phrase}: {message}"

        # Determine error type based on status code
        if 400 <= response.status_code < 500:
            raise APIClientError(
                message=error_message,
                status_code=response.status_code,
            )
        elif 500 <= response.status_code < 600:
            raise APIServerError(
                message=error_message,
                status_code=response.status_code,
            )
        else:
            # This should not happen, but just in case
            raise UnexpectedError(
                message=f"Unexpected status code: {response.status_code}",
                status_code=response.status_code,
            )

    async def request(
        self,
        method: str,
        path: str,
        *,  # Force keyword arguments for clarity after path
        query_params: dict[str, Any] | None = None,  # Renamed from request_params
        json_body: dict[str, Any] | None = None,  # Renamed from request_body for specificity
        headers: dict[str, str] | None = None,  # Added explicit headers parameter
        **kwargs: Any,  # Keep for advanced httpx options
    ) -> dict[str, Any]:  # Simplified return type for base.py method
        """
        Execute an HTTP request using the configured client.

        Args:
            method: HTTP method (e.g., "GET", "POST").
            path: API endpoint path (relative to the base_url).
            query_params: Dictionary of query parameters to append to the URL.
            json_body: Dictionary to be sent as the JSON request body.
            headers: Optional dictionary of headers to merge with default client headers.
            **kwargs: Additional keyword arguments passed directly

        Returns:
            The parsed JSON response body as a dictionary.

        Raises:
            APIClientError: For 4xx client errors.
            APIServerError: For 5xx server errors.
            APIConnectionError: For network connection issues.
            APIResponseError: If the response cannot be parsed as JSON.
            UnexpectedError: For unexpected status codes or errors.
        """
        # Log detailed request information
        logger.info(f"API Client: Executing {method} request to {path}")
        if query_params:
            logger.debug(f"Request params: {query_params}")
        if json_body:
            logger.debug(f"Request body: {json_body}")

        # Prepare request
        request = self._prepare_request(method, path, query_params, json_body, headers, **kwargs)

        # Send request
        try:
            response = await self._send_request(request)
        except (UnexpectedError, httpx.NetworkError) as e:
            raise APIClientError(
                message=f"Failed to send request: {e!s}",
                status_code=None,
            ) from e

        # Check if successful
        if not response.is_success:
            logger.warning(f"Request failed: {method} {path} - Status {response.status_code}")
            self.handle_error_response(response)

        # Parse response (for both success and error cases)
        parsed_body = self.parse_response(response)

        # Log success and return
        logger.info(f"Request successful: {method} {path} - Status {response.status_code}")
        return parsed_body
