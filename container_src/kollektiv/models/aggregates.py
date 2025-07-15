from abc import ABC
from typing import Any, Self

from pydantic import BaseModel


class AggregateBaseModelABC(BaseModel, ABC):
    """Provides convenience methods for aggregates."""

    def to_record(self, **kwargs: Any) -> dict[str, Any]:
        return self.model_dump(mode="json", exclude_none=True, **kwargs)

    @classmethod
    def from_record(cls, record: dict[str, Any]) -> Self:
        return cls.model_validate(record)
