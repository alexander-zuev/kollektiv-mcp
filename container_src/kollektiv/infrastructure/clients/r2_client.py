import io
from typing import BinaryIO, cast

import aioboto3
from aiobotocore.config import AioConfig
from botocore.exceptions import BotoCoreError, ClientError

from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.infrastructure.settings import Settings
from kollektiv.shared.exceptions import R2Error

logger = get_logger(__name__)


class R2Client:
    """
    Thin async wrapper around the S3 API for Cloudflare R2.
    Keeps one aioboto3 session per process.
    """

    def __init__(
        self,
        *,
        settings: Settings,
        max_pool_connections: int = 50,
    ):
        self.settings = settings
        self._bucket = settings.r2_bucket_name
        self._endpoint_url = settings.r2_endpoint_url
        self._session = aioboto3.Session(
            aws_access_key_id=settings.r2_access_key_id,
            aws_secret_access_key=settings.r2_secret_access_key,
        )
        # Tune connection pool & retries
        self._config = AioConfig(
            max_pool_connections=max_pool_connections,
            retries={"max_attempts": 5, "mode": "standard"},
        )

    async def upload_document(self, file_bytes: bytes, object_key: str) -> str:
        """
        Upload `file_bytes` under `object_key`.

        Args:
            file_bytes: bytes
            object_key: str - follows {user_id}/filename pattern

        • Returns the *key* on success.
        • Raises CloudflareClientError on any failure.
        """

        try:
            async with self._session.client("s3", endpoint_url=self._endpoint_url, config=self._config) as s3:
                buffer = cast(BinaryIO, io.BytesIO(file_bytes))
                await s3.upload_fileobj(
                    Fileobj=buffer,
                    Bucket=self._bucket,
                    Key=object_key,
                )
                logger.debug(f"Uploading document {object_key} to R2")
                head = await s3.head_object(Bucket=self._bucket, Key=object_key)
                status_code: int = head["ResponseMetadata"]["HTTPStatusCode"]
                if status_code != 200:  # HEAD returns 200 on success
                    msg = f"Unexpected status code after upload ({status_code}) for key={object_key}"
                    raise R2Error(operation="upload", object_key=object_key, message=msg)

            logger.debug("✓ Uploaded %s (%s bytes) to R2", object_key, len(file_bytes))
            return object_key

        except (BotoCoreError, ClientError) as exc:
            raise R2Error(
                operation=getattr(exc, "operation_name", "upload"),
                object_key=object_key,
                message=str(exc),
            ) from exc

    async def delete_object(self, object_key: str) -> None:
        """Best-effort delete – log but don’t re-raise."""
        # Must be idempotent - handle cases where I ID doesn't exist
        try:
            async with self._session.client("s3", endpoint_url=self._endpoint_url, config=self._config) as s3:
                response = await s3.delete_object(Bucket=self._bucket, Key=object_key)
                status_code: int = response["ResponseMetadata"]["HTTPStatusCode"]
                if status_code != 204:  # returns 204 on success
                    msg = f"Unexpected status code after delete ({status_code}) for key={object_key}"
                    raise R2Error(operation="delete", message=msg, object_key=object_key)
                logger.info("Deleted %s from R2", object_key)
        except (BotoCoreError, ClientError) as exc:
            raise R2Error(
                operation=getattr(exc, "operation_name", "delete"),
                message=str(exc),
                object_key=object_key,
            ) from exc
