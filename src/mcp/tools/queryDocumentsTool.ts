import { api } from "@/mcp/api/client";
import { ApiRoutes } from "@/mcp/api/routes";
import type { QueryResponse } from "@/mcp/api/types/query"; // Adjust path as needed
import {
	type AuthContext,
	type ToolDefinitionSchema,
	createErrorResponse,
	createSuccessTextResponse,
} from "@/mcp/tools/types"; // Ensure
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { type ZodRawShape, z } from "zod";

// This should be an enum
const supportedFilters = z.enum(["filename", "doc_id", "uploaded_at"]);

const baseOperatorSchema = {
	operator: z
		.string()
		.min(1)
		.describe("Filter operator supporting SQL like syntax (e.g., '=', 'like', '>', '<=')"),
};

const FilenameFilterSchema = z.object({
	key: z.literal(supportedFilters.enum.filename),
	value: z.string().min(1),
	...baseOperatorSchema,
});

const DocIDFilterSchema = z.object({
	key: z.literal(supportedFilters.enum.doc_id),
	value: z.string().uuid("Document ID must be a valid UUID"),
	...baseOperatorSchema,
});

const UploadedAtFilterSchema = z.object({
	key: z.literal(supportedFilters.enum.uploaded_at),
	value: z.string().datetime({
		offset: true,
		message: "Uploaded timestamp must be in ISO 8601 format with offset",
	}),
	...baseOperatorSchema,
});

const AnyFilterSchema = z
	.discriminatedUnion("key", [FilenameFilterSchema, DocIDFilterSchema, UploadedAtFilterSchema])
	.describe("A single filter to apply to the query");

// Define tool parameters schema
const queryToolParamSchema = {
	rag_query: z
		.string()
		.min(1, "Query can not be empty")
		.describe(
			`A clean, minimal natural-language query for RAG retrieval.
The input MUST represent the exact *information need* and nothing else. It is passed verbatim to a vector-based retriever. The retriever compares it against document embeddings and uses the top matches to generate a response.


DO:
- Extract key terms, acronyms, or concrete questions.
- Use natural phrases as if searching a semantic index.
- Preserve the user's intent with maximum compression.

DO NOT:
- Include filenames, file types, or source names (e.g., .pdf, .docx, etc.).
- Add summaries, paraphrased answers, greetings, tasks, or commands.
- Mention document structure or metadata (e.g., 'section', 'title', 'from file X').
- Instructions (e.g. 'citing each page')
- Use extremely short queries (as they will return a lot of noise) and extremly long queries (as they will be too specific).

Examples:
✓ GOOD:
- "registered agent requirements for Delaware LLC"
- "streamable HTTP transport support Cloudflare Workers"
- "maximum annual revenue for micro-entity tax filing"
- "LLC dissolution procedure in California"
- "OAuth PKCE token exchange timeout"

⨯ BAD:
- "Please summarize the startup_guide.pdf"
- "What does the document say about directors?"
- "Explain this section"
- "Find the content of business_address.docx"
`,
		),
	// query_filters: z.array(AnyFilterSchema).default([]).optional().describe(
	//     `Optional array of query filters to apply. Defaults to an empty array if not provided.
	//
	// Each filter object in the array must contain 'key', 'operator', and 'value'.
	//
	// Available filter keys:
	// - filename: string = filters by document filename
	// - uploaded_at: datetime = filters by document uploaded timestamp (ISO 8601 format)
	// - doc_id: uuid = filters by document ID
	//
	// Supported operators depend on the key (e.g., '=', '!=', 'like', '>', '<', '>=', '<=', 'in', 'not in'). Refer to backend documentation for specifics per key.
	//
	// Example:
	// [
	//   { "key": "filename", "operator": "like", "value": "%startup%" },
	//   { "key": "uploaded_at", "operator": ">=", "value": "2024-01-01T00:00:00Z" }
	// ]
	//
	// `),
};

// Define handler function

// TODO: research if I have to transition to JWT instead of x-user-id header
const queryToolHandler: ToolCallback<typeof queryToolParamSchema> = async (
	{ rag_query }: ZodRawShape,
	extra: any,
	authContext: AuthContext,
) => {
	const userId = authContext.userId;

	console.log(`[queryDocsTool] User ${userId} querying with: "${rag_query}"`);

	try {
		const response = await api.post<QueryResponse>(
			ApiRoutes.QUERY,
			{ query: rag_query },
			{ headers: { "x-user-id": userId } },
		);
		console.log(`[queryDocsTool] Received response from backend for user ${userId}`);
		return createSuccessTextResponse(response.response);
	} catch (error) {
		console.error(`[queryDocsTool] Error querying backend for user ${userId}:`, error);
		return createErrorResponse("There was a server error making this tool call, please try again.");
	}
};

// Create and export tool
export const queryDocumentsTool: ToolDefinitionSchema<typeof queryToolParamSchema> = {
	name: "execute_rag_search",
	description: `Performs a semantic RAG search over the user’s uploaded documents. Invoke this tool when
        additional factual context is required. 
        
        Tool requirements:
        - Provide a search query containing concise, one or multiple search phrases relevant to the user’s current intent.
        - Search phrases should not contain any metadata, structural cues, instructions, tasks, or other filler language.
        
        How this tool works:
        - The search string is passed as-is to the backend retriever (no modification, summarization, or formatting).
        - The retriever performs embedding-based matching and returns a summary response generated based on retrieved document chunks (if found).
        
        What to include in the query:
        - Only high-signal search phrases that would help retrieve relevant information.
        - Precise phrasing aligned with user’s true intent.
        
        What NOT to include:
        - Filenames, metadata, or structural cues (e.g., "section 2", ".pdf").
        - Tasks, questions to the assistant, summaries, or filler language.
        
        Bad examples (and why they fail):
        - "Please summarize startup_docs.pdf" → includes filename, command
        - "Can you explain what this document says about taxes?" → vague, conversational
        - "Find in section 2 the rules" → structural cue without semantic meaning
        - "Compare the two guides" → ambiguous, requires reference
        
        If no search results are found:
        - try rephrasing the query in a different way
        `,
	paramsSchema: queryToolParamSchema,
	handler: queryToolHandler,
};
