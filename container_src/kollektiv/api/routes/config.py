from enum import Enum

# API version
API_VERSION = "v1"


# Sub-paths organized by domain
class Routes:
    """Sub-paths organized by domain."""

    class Root:
        """Root sub-paths."""

        ROOT = "/"
        HEALTH = "/health"

    class Data:
        """Data sub-paths."""

        DOCUMENTS = "/documents"
        DOCUMENT_BY_ID = "/documents/{document_id}"
        USER_STATS = "/stats"

    class MCP:
        """MCP-tool sub-paths."""

        QUERY = "/query"
        RAG_SEARCH = "/rag-search"
        RETRIEVE = "/retrieve"

    class Debug:
        """Debug sub-paths."""

        JWT_TOKEN = "/jwt-token"
        MEMORY = "/memory"
        EXCEPTION = "/exception"


class Tags(str, Enum):
    ROOT = "General"
    HEALTH = "Health "
    DEBUG = "Debugging"
    DATA = "User data"
    MCP = "MCP tools"
