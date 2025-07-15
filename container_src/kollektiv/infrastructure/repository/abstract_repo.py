from abc import ABC, abstractmethod
from typing import Generic, TypeVar
from uuid import UUID

from kollektiv.models.aggregates import AggregateBaseModelABC

T = TypeVar("T", bound=AggregateBaseModelABC)


class SupabaseRepositoryABC(ABC, Generic[T]):
    """ABC repository class."""

    @abstractmethod
    async def add_single(self, model: T) -> T:
        """Add a single model instance to the repository."""
        pass

    @abstractmethod
    async def get_by_id(self, id: UUID) -> T | None:
        """Get a single model instance by ID."""
        pass

    @abstractmethod
    async def get_all(self, id: str) -> list[T]:
        """Get a list of all model instances."""
        pass

    @abstractmethod
    async def update(self, model_to_update: T) -> T | None:
        """Upserts a single model instance."""
        pass

    @abstractmethod
    async def delete_by_id(self, id: UUID) -> None:
        """Delete a single model instance by ID."""
        pass
