from kollektiv.infrastructure.clients.http_client import BaseHTTPClient
from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.infrastructure.settings import Settings
from kollektiv.shared.exceptions import RetrievalError

logger = get_logger(__name__)


class CloudflareClient(BaseHTTPClient):
    RAG_SEARCH_PATH = "/ai-search"

    def __init__(self, settings: Settings):
        self.settings = settings
        self.headers = {"Authorization": f"Bearer {settings.cd_workers_ai_api_token}"}
        super().__init__(
            "https://api.cloudflare.com/client/v4/accounts/9c02a0ea65440e5ee7d5b62990934324/autorag/rags/royal-pond-d038",
            self.headers,
        )

    # TODO: implement multi-tenancy as per https://developers.cloudflare.com/autorag/how-to/multitenancy/
    async def rag_search(self, query):
        payload = {
            "query": query,
        }
        try:
            response = await self.request("POST", path=self.RAG_SEARCH_PATH, json_body=payload)
            if response.get("success", ""):
                return response
            else:
                raise RetrievalError("Error occurred during retrieval")
        except Exception as e:
            logger.exception(f"Exception occurred while querying Cloudflare: {e}")
            raise RetrievalError("Error occurred during retrieval") from e
