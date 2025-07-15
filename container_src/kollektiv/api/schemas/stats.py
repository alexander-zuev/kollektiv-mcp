from pydantic import BaseModel, Field


class UserStatsResponse(BaseModel):
    """User stats schema."""

    queries: int = Field(..., description="Number of queries made by the user", ge=0)
