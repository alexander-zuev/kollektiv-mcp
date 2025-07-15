from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    """Health check response schema."""

    status: str = Field("healthy", description="The current status of the API server")
    version: str = Field(..., description="The current version of the API server")
    timestamp: str = Field(..., description="The timestamp when the health check was performed")
    environment: str = Field(..., description="The environment the API server is running in")

    model_config = {
        "json_schema_extra": {
            "example": {
                "status": "healthy",
                "version": "0.1.0",
                "timestamp": "2023-06-01T12:00:00.000000",
                "environment": "production",
            }
        }
    }
