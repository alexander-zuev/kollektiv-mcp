import asyncio
import os
from uuid import UUID

from starlette.datastructures import Headers as Headers
from vectara import (
    ChainReranker,
    QueryFullResponse,
    SearchCorporaParameters,
)

from kollektiv.api.schemas.retrieve import DocumentChunk
from kollektiv.infrastructure.clients.vectara_client import VectaraClient
from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.infrastructure.settings import Settings
from kollektiv.models.retrieval import ExpandedQueries
from kollektiv.services.llm_agent import LLMAgent
from kollektiv.shared.exceptions import InfrastructureError, RetrievalError

# Necessary to address Pydantic errors
SearchCorporaParameters.model_rebuild()
ChainReranker.model_rebuild()

# Construct path to the VTL file relative to this script's directory
_CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROMPT_VTL_PATH = os.path.join(_CURRENT_DIR, "prompts", "generation_prompt.vtl")

logger = get_logger(__name__)


def load_prompt_string_from_vtl(file_path: str) -> str:
    """Loads the VTL prompt string from the specified VTL file."""
    try:
        with open(file_path) as f:
            prompt_str = f.read()
            logger.debug(f"Prompt string: {prompt_str}")
            return prompt_str
    except FileNotFoundError as e:
        raise InfrastructureError(f"Prompt file not found: {file_path}") from e
    except Exception as e:
        raise InfrastructureError(f"Failed to read prompt file: {file_path}") from e


VECTARA_PROMPT_STRING = load_prompt_string_from_vtl(PROMPT_VTL_PATH)


class RetrievalService:
    """Manages all operations related to retrieving chunks / generating responses to user
    queries."""

    def __init__(self, retrieval_client: VectaraClient, settings: Settings, llm_agent: LLMAgent):
        self.retrieval_client = retrieval_client
        self.corpus_key = settings.vectara_corpus_id
        self.settings = settings
        self.llm_agent = llm_agent

    def deduplicate_chunks(self, chunks: list[DocumentChunk]) -> list[DocumentChunk]:
        """Deduplicate chunks based on their content and metadata."""
        pass

    async def execute_rag_search(
        self, query: str, context: str, user_id: UUID
    ) -> tuple[list[DocumentChunk], ExpandedQueries]:
        queries = await self.llm_agent.expand_queries(query, context)

        tasks = [self.query_vectara(query=q, user_id=user_id) for q in queries.queries]

        logger.debug(f"Executing RAG search for {len(tasks)} queries")
        results = await asyncio.gather(*tasks, return_exceptions=True)
        processed_chunks: list[DocumentChunk] = []

        num_success = 0

        for res in results:
            # Log for now - we will test it soon
            if isinstance(res, RetrievalError):
                continue

            num_success += 1
            if isinstance(res, QueryFullResponse) and res.search_results:
                processed_chunks.extend([DocumentChunk.from_search_result(sr) for sr in res.search_results])

        if num_success == 0:
            raise RetrievalError("No chunks retrieved for the query - please try a different query.")

        processed_chunks.sort(key=lambda c: c.relevance_score, reverse=True)
        return processed_chunks, queries

    async def query_vectara(self, query: str, user_id: UUID) -> QueryFullResponse:
        """
        Queries the Vectara service for retrieving information based on the input query.

        This function sends an asynchronous query to the Vectara service using the provided query
        string and retrieves the response. If an error occurs during the retrieval process,
        it raises a custom RetrievalError with an appropriate error message.

        Parameters:
        query: str
            The query string used to search the Vectara service.

        Returns:
        QueryFullResponse
            The response object containing the retrieved information from the Vectara service.

        Raises:
        RetrievalError
            Raised when an error occurs during the retrieval process.
        """

        try:
            response = await self.retrieval_client.query_corpus(
                query=query,
                user_id=user_id,
            )
            return response
        except RetrievalError as e:
            logger.exception(f"Retrieval error occurred during retrieval: {e}")
            raise e
        except Exception as e:
            logger.exception(f"Exception occurred while querying Vectara: {e}")
            raise RetrievalError("Unknown error occurred during retrieval. Please try again later.") from e


def escape_filename_for_vectara_filter(filename: str) -> str:
    """Escapes a filename for use in a Vectara metadata filter string."""
    return filename.replace("'", "''")
