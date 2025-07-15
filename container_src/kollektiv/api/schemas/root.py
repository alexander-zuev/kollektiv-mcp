"""
Schemas for the root endpoint.
"""

from pydantic import BaseModel, Field


class RootResponse(BaseModel):
    """Root endpoint response schema."""

    name: str = Field(..., description="The name of the API")
    version: str = Field(..., description="The current version of the API")
    environment: str = Field(..., description="The environment the API is running in")
    description: str = Field(..., description="A brief description of the API")
    documentation: str = Field(..., description="URL to the API documentation")
    health_check: str = Field(..., description="URL to the health check endpoint")

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "Supabase MCP API",
                "version": "0.0.1",
                "environment": "production",
                "description": "API server for Supabase Management Control Plane",
                "documentation": "https://api.example.com/docs",
                "health_check": "https://api.example.com/v1/health",
            }
        }
    }
