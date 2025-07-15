from typing import Any, Literal

from pydantic import BaseModel, Field

from kollektiv.models.retrieval import DocumentChunk, FilterKey, QueryFilter


class QueryFiltersInput(BaseModel):
    """Model for accepting a list of query filters."""

    filters: list[QueryFilter] = Field(..., description="List of filters to apply to the query")
    filters_joiner: Literal["AND", "OR"] = Field(
        default="AND", description="Joiner to use between multiple filters. If not provided defaults to AND"
    )


class QueryRequest(BaseModel):
    """Query request schema."""

    rag_query: str = Field(..., description="User query to generate a response for")
    query_filters: QueryFiltersInput | None = Field(
        default=None, description="Query filters to apply to the query. Defaults to None if not provided"
    )


class RagSearchRequest(BaseModel):
    """Query request schema."""

    rag_query: str = Field(..., description="User query to generate a response for")
    context: str = Field(..., description="Context of the conversation to take into account for")


class RagSearchResponse(BaseModel):
    """Query response schema."""

    response: list[DocumentChunk] = Field(
        default_factory=list,
        description="A list of retrieved documents chunks. Defaults to empty list if no relevant chunks were found",
    )
    metadata: dict[str, Any] = Field(default_factory=dict, description="List of filenames of the response")


class QueryResponse(BaseModel):
    """Query response schema."""

    response: str = Field(..., description="Response to the user query")
    metadata: dict[str, Any] = Field(default_factory=dict, description="List of filenames of the response")


class QueryFilterInput(BaseModel):
    """Query filter schema."""

    key: FilterKey = Field(..., description="Filter key to use")
    value: str = Field(..., description="Filter value to use")
    # TODO: how to limit this per filter used? How to validate essentially based on the filter key
    operator: str = Field(..., description="Filter operator to use")
