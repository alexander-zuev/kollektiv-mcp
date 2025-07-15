from httpx import ConnectError, TimeoutException
from tenacity import retry, retry_if_exception_type, stop_after_attempt, wait_exponential

from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.infrastructure.settings import Settings
from supabase import AsyncClient, AsyncClientOptions, create_async_client

logger = get_logger("supabase_client")


class SupabaseClient:
    """Initializes async supabase client."""

    def __init__(self, settings: Settings, client_options: AsyncClientOptions | None = None) -> None:
        self.settings: Settings = settings
        self.supabase: AsyncClient | None = None
        self.client_options: AsyncClientOptions | None = client_options

    @retry(
        retry=retry_if_exception_type((ConnectError, TimeoutException)),
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        reraise=True,
    )
    async def attempt_create_client(self) -> AsyncClient:
        """Attempts to create a Supabase client with retry logic."""
        try:
            return await create_async_client(
                supabase_url=self.settings.supabase_url,
                supabase_key=self.settings.supabase_key,
                options=self.client_options,
            )
        except (ConnectError, TimeoutException) as e:
            logger.error(f"⛌ Failed to create Supabase client: {e!s}")
            raise

    async def initialize(self) -> None:
        if self.supabase is None:
            self.supabase = await self.attempt_create_client()
            logger.info("✓ Created Supabase client")

    def close(self) -> None:
        if self.supabase is not None:
            self.supabase = None
            logger.info("Closed Supabase client")
