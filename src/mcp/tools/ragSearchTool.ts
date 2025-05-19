import { api } from "@/mcp/api/client";
import { ApiRoutes } from "@/mcp/api/routes";
import type { RagSearchRequest, RagSearchResponse } from "@/mcp/api/types/ragTasks"; // Adjust path as needed
import {
	type AuthContext,
	type CallToolResult,
	type ExtraWithAuth,
	type ToolDefinitionSchema,
	createErrorResponse,
	createSuccessResponse,
} from "@/mcp/tools/types";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import type { ServerNotification, ServerRequest } from "@modelcontextprotocol/sdk/types.js";
import { type ZodTypeAny, z } from "zod";

// Define tool parameters schema
const ragQueryToolParamSchema = z.object({
	rag_query: z
		.string()
		.min(1, "Query can not be empty")
		.describe(
			`A RAG query to conduct semantic search over user's uploaded documents. 
            
			DO:
			- Extract key terms, acronyms, or concrete questions.
			- Use natural phrases as if searching a semantic index.
			- Preserve the user's intent with maximum compression.
			
			DO NOT:
			- Include filenames, file types, or source names (e.g., .pdf, .docx, etc.).
			- Add summaries, paraphrased answers, greetings, tasks, or commands.
			- Mention document structure or metadata (e.g., 'section', 'title', 'from file X').
			- Instructions (e.g. 'citing each page')
`,
		),
	context: z
		.string()
		.min(1)
		.describe(`
Supplemental context that helps the RAG agent refine the search.

What to supply:
• Conversation-specific intent  (if any)
  e.g. "User is comparing scaled-dot attention to additive attention."
• User preferences or domain (if known)
  e.g. "User prefers concise mathematical derivations."
• File scope hints  (if known)
  e.g. "Relevant docs: attention_paper.pdf, transformer_notes.md"

What **not** to supply:
• The search query itself (rag_query already has that)  
• Analysis, answers, or commentary  
• Irrelevant chat history

If no context is available, pass the string "No context provided".
`),
});
export type RagQueryToolInput = z.infer<typeof ragQueryToolParamSchema>;

// TODO: this might need to be moved to a shared module
export function createRagSearchToolResult(resp: RagSearchResponse): CallToolResult {
	const chunks = resp.response;

	const content: CallToolResult["content"] = [
		{
			type: "text",
			text: chunks.length
				? `Search returned ${chunks.length} chunks:`
				: "Search returned no chunks.",
		},
		{
			type: "resource",
			resource: {
				uri: "inline",
				text: JSON.stringify(chunks, null, 2),
				mimeType: "application/json",
			},
		},
	];

	return createSuccessResponse(content);
}

// Define handler function

const ragToolHandler = async ({ rag_query, context }: RagQueryToolInput, extra: ExtraWithAuth) => {
	const userId = extra.auth.userId;

	console.log(`[ragSearchTool] User ${userId} querying with: "${rag_query}"`);

	try {
		const payload: RagSearchRequest = {
			ragQuery: rag_query,
			context: context,
		};
		const response = await api.post<RagSearchResponse>(ApiRoutes.RAG_SEARCH, payload, {
			headers: { "x-user-id": userId },
		});
		console.log(`[ragSearchTool] Received response from backend for user ${userId}`);
		return createRagSearchToolResult(response);
	} catch (error) {
		console.error(
			`[ragSearchTool] Error querying backend for user ${userId}:`,
			JSON.stringify(error, null, 2),
		);
		return createErrorResponse("There was a server error making this tool call, please try again.");
	}
};

// Create and export tool
export const ragSearchTool: ToolDefinitionSchema<
	typeof ragQueryToolParamSchema.shape,
	ExtraWithAuth
> = {
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
	paramsSchema: ragQueryToolParamSchema.shape,
	toolAnnotations: {
		title: "Conduct RAG search",
	},
	handler: ragToolHandler,
};

// TODO: DRY this up later -> a single registerTool function should do
export function registerRagSearchTool(mcpServer: McpServer, authContext: AuthContext) {
	mcpServer.tool(
		ragSearchTool.name,
		ragSearchTool.description,
		ragSearchTool.paramsSchema,
		(
			params: z.objectOutputType<typeof ragSearchTool.paramsSchema, ZodTypeAny>,
			extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
		) => {
			// Extend extra safely
			const extendedExtra: ExtraWithAuth = {
				...extra,
				auth: authContext,
			};
			// return tool handler as callback
			return ragSearchTool.handler(params, extendedExtra);
		},
	);
}
