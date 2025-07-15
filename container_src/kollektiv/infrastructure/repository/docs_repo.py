from __future__ import annotations

from uuid import UUID

from kollektiv.infrastructure.repository.abstract_repo import SupabaseRepositoryABC
from kollektiv.infrastructure.repository.base_repo import BaseSupabaseRepository
from kollektiv.models.documents import Document


class DocumentsRepo(SupabaseRepositoryABC[Document], BaseSupabaseRepository):
    _SCHEMA: str = "public"
    _TABLE: str = "documents"

    async def add_single(self, model: Document) -> Document:
        query_builder = self.supabase.schema(self._SCHEMA).table(self._TABLE).insert(model.to_record())

        result = await self.execute_query(query_builder)
        result = Document.from_record(result.data[0])
        return result

    async def get_by_id(self, id: UUID) -> Document | None:
        query_builder = self.supabase.schema(self._SCHEMA).table(self._TABLE).select("*").eq("id", id)
        result = await self.execute_query(query_builder)
        if result.data:
            return Document.from_record(result.data[0])
        return None

    async def get_all(self, user_id: UUID) -> list[Document]:
        query_builder = self.supabase.schema(self._SCHEMA).table(self._TABLE).select("*").eq("user_id", str(user_id))
        documents = await self.execute_query(query_builder)
        return [Document.from_record(doc) for doc in documents.data]

    async def update(self, model_to_update: Document) -> Document | None:
        raise NotImplementedError("Not implemented yet. ")

    async def delete_by_id(self, id: UUID) -> None:
        query_builder = self.supabase.schema(self._SCHEMA).table(self._TABLE).delete().eq("id", id)
        await self.execute_query(query_builder)

    async def exists(self, storage_key: str) -> bool:
        """Verify if a document with the given storage key exists in the database."""
        query_builder = (
            self.supabase.schema(self._SCHEMA).table(self._TABLE).select("id").eq("storage_key", storage_key).limit(1)
        )
        result = await self.execute_query(query_builder)
        return bool(result.data)
