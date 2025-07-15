from datetime import datetime
from enum import Enum
from typing import Any, ClassVar
from uuid import UUID

from pydantic import BaseModel, Field, ValidationInfo, field_validator, model_validator
from vectara import IndividualSearchResult


class ExpandedQueries(BaseModel):
    relevance_assessment: str = Field(
        ...,
        description="A relevance assessment of the original "
        "query. Rationale to expand the query to "
        "up 3 different queries",
    )
    queries: list[str] = Field(..., description="A list of queries that were returned")

    @model_validator(mode="after")
    def validate_queries(self):
        # Check if queries is not empty
        if not self.queries:
            raise ValueError("queries must not be empty")
        # Check for more than 3 queries
        if len(self.queries) > 3:
            raise ValueError("queries must not be more than 3")
        return self


class RetrievalResponse(BaseModel):
    text: str = Field(..., description="The response to the retrieval query")
    metadata: dict[str, Any] = Field(default_factory=dict, description="Additional metadata about the retrieval query")


class FilterKey(str, Enum):
    """Filter key enum."""

    USER_ID = "user_id"
    UPLOAD_TS = "upload_ts"
    KOLLEKTIV_DOC_ID = "kollektiv_doc_id"


class QueryFilter(BaseModel):
    ALLOWED_OPERATORS: ClassVar[dict] = {
        FilterKey.USER_ID: ["="],
        FilterKey.UPLOAD_TS: ["<", ">", "<=", ">="],
        FilterKey.KOLLEKTIV_DOC_ID: ["=", "!="],
    }

    """Query filter model"""
    key: FilterKey = Field(..., description="Filter key to use")
    value: str = Field(..., description="Filter value to use")
    operator: str = Field(..., description="Filter operator to use")

    @field_validator("value")
    @classmethod
    def validate_value_format(cls, v: str, info: ValidationInfo):
        key = info.data["key"]
        if key == FilterKey.KOLLEKTIV_DOC_ID:
            try:
                UUID(v)
            except ValueError as e:
                raise ValueError(f"Value '{v}' for key '{key}' must be a valid UUID.") from e
        elif key == FilterKey.UPLOAD_TS:
            try:
                datetime.fromisoformat(v.replace("Z", "+00:00"))
            except ValueError as e:
                raise ValueError(
                    f"Value '{v}' for key '{key}' must be a string parsable as an ISO 8601 date/datetime (e.g., YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ)."
                ) from e
        return v

    @model_validator(mode="after")
    def validate_operator_for_key(self):
        key = self.key
        operator = self.operator
        if operator not in self.ALLOWED_OPERATORS.get(key, []):
            allowed = ", ".join(self.ALLOWED_OPERATORS.get(key, []))
            raise ValueError(f"Operator '{operator}' is not allowed for key '{key}'. Allowed operators: {allowed}")
        return self

    def to_filter_string(self) -> str:
        """Converts the filter to it's Vectara representation"""
        return f"doc.{self.key.value} {self.operator} '{self.value}'"


class VectaraMetadataFilter:
    """Model representing vectara retrieval filters"""

    def __init__(self, user_id: str, query_filters: list[QueryFilter], joiner: str):
        self.user_id = user_id
        self.query_filters = query_filters
        self.joiner = joiner

    def build_metadata_filter_string(self) -> str:
        raise NotImplementedError

    def build_dynamic_filter_string(self, query_filters: list[QueryFilter], joiner: str) -> str:
        raise NotImplementedError


class DocumentChunk(BaseModel):
    document_filename: str = Field(..., description="Filename of the document the chunk belongs to")
    title: str | None = Field(default=None, description="Title of the document chunk")
    section: int | None = Field(default=None, description="Section number of the document chunk")
    text: str = Field(..., description="Text content of the document chunk")
    relevance_score: float = Field(..., description="Relevance score of the document chunk")

    @classmethod
    def from_search_result(cls, search_result: IndividualSearchResult) -> "DocumentChunk":
        return cls(
            document_filename=search_result.document_metadata.get("original_filename", "Unknown"),
            title=search_result.part_metadata.get("title", None),
            section=search_result.part_metadata.get("section", None),
            text=search_result.text,
            relevance_score=search_result.score,
        )
