from __future__ import annotations

from kollektiv.infrastructure.clients.cloudflare_client import CloudflareClient
from kollektiv.infrastructure.clients.r2_client import R2Client
from kollektiv.infrastructure.clients.supabase_client import SupabaseClient
from kollektiv.infrastructure.clients.vectara_client import VectaraClient
from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.infrastructure.settings import Settings
from kollektiv.services.llm_agent import LLMAgent

logger = get_logger(__name__)


class ServicesContainer:
    """Services container for application-scoped application."""

    _instance: ServicesContainer | None = None

    def __init__(self):
        """All initializations happen in the async method `initialize`."""
        # settings
        self.settings: Settings | None = None

        # application-scoped clients
        # self.supabase_client: SupabaseClient | None = None
        self.vectara_client: VectaraClient | None = None
        self.supabase_client: SupabaseClient | None = None
        self.cf_client: CloudflareClient | None = None
        self.r2_client: R2Client | None = None
        self.llm_agent: LLMAgent | None = None

    @classmethod
    def get_instance(cls) -> ServicesContainer:
        """Returns the application container singleton instance."""
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    async def initialize(
        self,
        settings: Settings,
        vectara_client: VectaraClient,
        supabase_client: SupabaseClient,
        cf_client: CloudflareClient,
        r2_client: R2Client,
        llm_agent: LLMAgent,
    ) -> None:
        """Initializes and stores client instances using the provided providers and settings."""
        self.settings = settings
        self.vectara_client = vectara_client
        self.supabase_client = supabase_client
        self.cf_client = cf_client
        self.r2_client = r2_client
        self.llm_agent = llm_agent

        await self.supabase_client.initialize()

        logger.info("All services initialized successfully.")

    async def shutdown(self) -> None:
        if self.vectara_client:
            await self.vectara_client.close()
        if self.supabase_client:
            self.supabase_client.close()

        logger.info("All services shut down successfully.")

    @classmethod
    def reset(cls) -> None:
        """Resets the application container instance."""
        cls._instance = None
