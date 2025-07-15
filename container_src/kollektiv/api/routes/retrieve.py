import time
from uuid import UUID

from fastapi import APIRouter, BackgroundTasks
from postgrest.exceptions import APIError

from kollektiv.api.deps import GetCurrentUserFromHeader, RetrievalServiceDep, SupabaseClientDep
from kollektiv.api.routes.config import Routes, Tags
from kollektiv.api.schemas.base import APIException, ErrorDetails
from kollektiv.api.schemas.retrieve import (
    RagSearchRequest,
    RagSearchResponse,
)
from kollektiv.infrastructure.clients.supabase_client import SupabaseClient
from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.infrastructure.settings import get_settings
from kollektiv.models.retrieval import DocumentChunk, ExpandedQueries
from kollektiv.models.stats import QueryStats
from kollektiv.shared.exceptions import DatabaseError, RetrievalError

settings = get_settings()
router = APIRouter(tags=[Tags.MCP])
logger = get_logger(__name__)


async def capture_query_stats(
    user_id: UUID,
    rag_search_request: RagSearchRequest,
    duration_ms: int,
    supabase_client: SupabaseClient,
    rewritten_queries: ExpandedQueries | None = None,
    chunks: list[DocumentChunk] | None = None,
    error: RetrievalError | None = None,
):
    """Captures basic metadata about the query response and logs it to Supabase"""
    try:
        stats = QueryStats.from_api_models(
            user_id=user_id,
            request=rag_search_request,
            chunks=chunks,
            rewritten_queries=rewritten_queries,
            latency=duration_ms,
            error=error,
        )
        result = (
            await supabase_client.supabase.schema("public")
            .table("query_stats")
            .insert(stats.model_dump(mode="json"))
            .execute()
        )
        logger.info(f"Saved query stats for query {result.data[0]['id']}")
    except APIError as e:
        logger.exception(f"Failed to capture query stats: {e}")
        raise DatabaseError("Failed to capture query stats") from e


@router.post(
    Routes.MCP.RAG_SEARCH,
    summary="Do RAG search over user's documents",
    description="Executes a RAG search over user's documents and returns a list of relevant chunks or an empty list.",
)
async def rag_search(
    rag_query: RagSearchRequest,
    user_id: GetCurrentUserFromHeader,
    retrieval_service: RetrievalServiceDep,
    supabase_client: SupabaseClientDep,
    background_tasks: BackgroundTasks,
) -> RagSearchResponse:
    duration_ms: int | None = None
    chunks: list[DocumentChunk] | None = None
    rewritten_queries: ExpandedQueries | None = None
    start = time.perf_counter()
    try:
        logger.debug(f"Received query request: {rag_query} for user: {user_id}")
        chunks, rewritten_queries = await retrieval_service.execute_rag_search(
            rag_query.rag_query, rag_query.context, user_id
        )
        logger.debug("Retrieved response from vectara.")
        response = RagSearchResponse(response=chunks)
        duration_ms = int((time.perf_counter() - start) * 1000)
        logger.debug(f"Request duration, ms: {duration_ms}")
        return response
    except RetrievalError as e:
        duration_ms = int((time.perf_counter() - start) * 1000)
        raise APIException(
            status_code=500,
            detail=ErrorDetails(
                message="An error occurred while generating the response. Please try again.",
                details={"user_id": user_id},
            ),
        ) from e
    finally:
        background_tasks.add_task(
            capture_query_stats, user_id, rag_query, duration_ms, supabase_client, rewritten_queries, chunks
        )
