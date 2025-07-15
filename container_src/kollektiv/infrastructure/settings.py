from enum import Enum
from functools import lru_cache
from pathlib import Path
from typing import Self

from pydantic import Field, ValidationError, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


def find_project_root(start_path: Path | None = None) -> Path:
    """Find the project root by looking for pyproject.toml"""
    if start_path is None:
        start_path = Path(__file__).resolve()

    for path in [start_path, *start_path.parents]:
        if (path / "pyproject.toml").exists():
            return path

    raise FileNotFoundError("Could not find project root (no pyproject.toml found)")


PROJECT_ROOT = find_project_root()
DEFAULT_ENV_FILE = PROJECT_ROOT / ".env"


class Environment(str, Enum):
    """Environment enums."""

    LOCAL = "local"
    STAGING = "staging"
    PRODUCTION = "production"
    CI = "CI"


class Settings(BaseSettings):
    """Application settings"""

    model_config = SettingsConfigDict(extra="ignore")  # necessary for Supabase

    app_name: str = Field(
        default="kollektiv", alias="APP_NAME", description="Application name, must match project name"
    )
    repo_url: str = Field(
        default="https://github.com/kollektiv/kollektiv-api",
        alias="REPO_URL",
        description="Application repository URL, necessary for logfire source mapping",
    )

    # Environment configuration
    environment: Environment = Field(
        Environment.LOCAL,
        alias="ENVIRONMENT",
        description="Application environment",
    )

    # Debug
    debug: bool | None = Field(
        default=None,
        description="True if debug mode is enabled. Defaults to True in local environment, False otherwise.",
        alias="DEBUG",
    )

    # API Server
    api_host: str = Field(
        "127.0.0.1",  # Local uses localhost, others use 0.0.0.0
        alias="API_HOST",
        description="API host - 127.0.0.1 for local, 0.0.0.0 for staging/prod",
    )
    api_port: int = Field(
        default=8080,
        alias="PORT",  # Railway injects PORT environment variable
        description="API port - defaults to 8000, but can be overridden by Railway's PORT variable",
    )
    # Vectara
    vectara_client_id: str = Field(..., alias="VECTARA_CLIENT_ID", description="Vectara Client ID")
    vectara_client_secret: str = Field(..., alias="VECTARA_CLIENT_SECRET", description="Vectara Client Secret")
    vectara_corpus_id: str = Field(..., alias="VECTARA_CORPUS_ID", description="Points to shared corpus id")

    cloudflare_account_id: str = Field(
        default="9c02a0ea65440e5ee7d5b62990934324", alias="CLOUDFLARE_ACCOUNT_ID", description="Cloudflare Account ID"
    )
    cf_s3_endpoint: str = Field(
        default="https://9c02a0ea65440e5ee7d5b62990934324.r2.cloudflarestorage.com",
        alias="CF_S3_ENDPOINT_URL",
        description="default url",
    )
    cd_workers_ai_api_token: str = Field(
        ..., alias="CF_WORKERS_AI_API_TOKEN", description="Cloudflare Workers AI API Token with RW access"
    )

    # Supabase
    supabase_url: str = Field(..., alias="SUPABASE_URL", description="Supabase Project URL")
    supabase_key: str = Field(..., alias="SUPABASE_KEY", description="Supabase Service Role Key")

    # R2 settings
    r2_bucket_name: str = Field(..., alias="R2_BUCKET_NAME", description="R2 Bucket Name")
    r2_endpoint_url: str = Field(..., alias="R2_ENDPOINT_URL", description="R2 Endpoint URL")
    r2_access_key_id: str = Field(..., alias="R2_ACCESS_KEY_ID", description="R2 Access Key")
    r2_secret_access_key: str = Field(..., alias="R2_SECRET_ACCESS_KEY", description="R2 Secret Key")

    # Uvicorn
    @property
    def reload(self) -> bool:
        """Reload the app when code changes."""
        return self.environment == Environment.LOCAL

    @property
    def gunicorn_workers(self) -> int:
        """Get number of Gunicorn workers based on environment.

        Defaults to 1 worker unless I run into scaling issues
        """
        return 1

    # Logfire
    logfire_token: str = Field(..., alias="LOGFIRE_TOKEN", description="Logfire token")
    enable_logfire: bool | None = Field(
        default=None, alias="LOGFIRE_SEND_TO_LOGFIRE", description="Enable sending logs to Logfire"
    )

    # OPENAI
    openai_api_key: str = Field(..., alias="OPENAI_API_KEY", description="OpenAI API key")

    @model_validator(mode="after")
    def _defaults(self) -> Self:
        if self.debug is None:
            self.debug = self.environment == Environment.LOCAL
        if self.enable_logfire is None:
            self.enable_logfire = self.environment == Environment.PRODUCTION
        return self


@lru_cache
def get_settings(env_file: Path | None = None) -> Settings:
    """
    Get application settings.

    Args:
        env_file: Optional path to .env file. If None, uses DEFAULT_ENV_FILE.
                 If provided as relative path, it's resolved relative to project root.

    Returns:
        Settings instance with values loaded from environment and .env file.

    Raises:
        ValueError: If settings validation fails.
    """

    # if no env_file is provided, us the default .env file in the project root

    if not env_file:
        env_file = DEFAULT_ENV_FILE
    try:
        return Settings(_env_file=env_file)
    except ValidationError as e:
        raise ValueError(f"Failed to load settings: {e}") from e
