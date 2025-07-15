from uuid import UUID, uuid4

from pydantic import BaseModel, Field, model_validator

from kollektiv.api.schemas.retrieve import RagSearchRequest
from kollektiv.models.retrieval import DocumentChunk, ExpandedQueries
from kollektiv.shared.exceptions import RetrievalError


class QueryStats(BaseModel):
    id: UUID = Field(default_factory=uuid4, description="UUID of stats entry")
    user_id: UUID = Field(..., description="UUID of the user")
    original_query: str = Field(..., description="Original query text")
    query_context: str = Field(..., description="Query context")
    rewritten_queries: list[str] = Field(default_factory=list, description=("Rewritten/expanded queries"))
    response_chunks: list[str] = Field(list[str], description="List of chunks as dicts")
    number_of_chunks: int = Field(..., description="Number of chunks returned")
    duration_ms: int = Field(..., description="Query duration in ms")
    avg_relevance_score: float = Field(..., description="Average relevance score")
    max_relevance_score: float = Field(..., description="Max relevance score")
    error_message: str | None = Field(None, description="Error message if any")
    success: bool = Field(..., description="Whether the query was successful")

    @model_validator(mode="after")
    def either_success_or_error(self):
        if self.success and self.error_message:
            raise ValueError("Cannot have both success and error message")
        if not self.success and not self.error_message:
            raise ValueError("Either success or error message must be provided")
        return self

    @classmethod
    def from_api_models(
        cls,
        user_id: UUID,
        request: RagSearchRequest,
        latency: int,
        chunks: list[DocumentChunk] | None = None,
        rewritten_queries: ExpandedQueries | None = None,
        error: RetrievalError | None = None,
    ) -> "QueryStats":
        # Required fields from request
        original_query = request.rag_query
        query_context = request.context

        # Rewritten queries
        rewritten_queries = rewritten_queries.queries if rewritten_queries else []

        # Chunk stats
        chunks = chunks if chunks else []
        number_of_chunks = len(chunks)
        scores = [chunk.relevance_score for chunk in chunks]
        avg_score = sum(scores) / len(scores) if scores else 0.0
        max_score = max(scores) if scores else 0.0
        response_chunks = [chunk.text for chunk in chunks]

        # Error handling
        if error:
            error_message = getattr(error, "message", str(error)) if error else None
            success = False
        else:
            error_message = None
            success = True

        return cls(
            user_id=user_id,
            original_query=original_query,
            query_context=query_context,
            rewritten_queries=rewritten_queries,
            response_chunks=response_chunks,
            number_of_chunks=number_of_chunks,
            duration_ms=latency,
            avg_relevance_score=avg_score,
            max_relevance_score=max_score,
            error_message=error_message,
            success=success,
        )
