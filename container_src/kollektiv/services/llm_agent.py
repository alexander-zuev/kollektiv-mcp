from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider

from kollektiv.infrastructure.logging.app_logger import get_logger
from kollektiv.infrastructure.settings import Settings
from kollektiv.models.retrieval import ExpandedQueries

logger = get_logger(__name__)


class LLMAgent:
    def __init__(self, settings: Settings):
        self.settings = settings
        self.agent: Agent | None = None
        self.initialize_agent()

    def initialize_agent(self):
        model = OpenAIModel("gpt-4o", provider=OpenAIProvider(api_key=self.settings.openai_api_key))
        self.agent = Agent(
            model=model,
            output_type=ExpandedQueries,
            system_prompt=(
                """You are a *Query-Expander* agent.
                Input
                  • **original_query** – a string from another LLM (may be a question, instruction, or compound request).
                  • **context** – optional sentence(s) summarising conversation intent. May be empty.

                Output
                  • Up to **3** stand-alone retrieval queries (one per line).
                  • Each query must be optimal for dense-vector search over the user’s document corpus.
                  • Return *nothing else*.

                Rules
                1. **Pass-through** – If original_query is already a clean, atomic search phrase, output it once and stop.
                2. **Strip noise** – Remove: filenames, paths, extensions, user greetings, meta-instructions, “please”, “summarise”, etc.
                3. **Decompose** – If the request is compound (asks multiple things), split into the minimal set of independent queries.
                4. **Focus** – Keep only high-signal terms (nouns, key verbs, acronyms). Drop agency words (“explain”, “show”, “compare”).
                5. **Use context** – If context clarifies intent, weave its key terms into the queries. If context is empty, rely on original_query.
                6. **No guessing beyond text** – Do not inject knowledge not present in query+context.
                7. **Language** – Preserve source language; do not translate.
                8. **Length** – 3–15 words each. Avoid ultra-short (≤2 words); avoid verbose (>20 words).

                Examples
                - Input:
                    original_query: "What are the business-address requirements in IRS Form 1040 Schedule C?"
                    context: ""
                  Output:
                    business address requirements schedule c
                - Input:
                    original_query: "Summarise chapter 3 and explain the dynamic window objective function"
                    context: "User studies robotics collision-avoidance paper"
                  Output:
                    dynamic window approach objective function
                    chapter 3 robot collision avoidance summary
                """
            ),
        )

    async def expand_queries(self, original_query: str, context: str | None = None) -> ExpandedQueries | None:
        if not self.agent:
            logger.error("Agent not initialized. Call initialize_agent() first.")
            return None

        user_input = f"Original Query: {original_query}"

        logger.debug(f"Original Query: {original_query}")

        if context:
            user_input += f"\n\nConversation Context:\n{context}"

        result = await self.agent.run(user_prompt=user_input)
        if result and result.output:
            logger.debug(f"Agent returned queries: {result.output.queries}")
            return result.output
        else:
            logger.error("Agent did not return expected output.")
            return None
