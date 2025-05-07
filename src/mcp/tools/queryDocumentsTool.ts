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

// Define tool parameters schema
const queryToolParamSchema = {
	query: z
		.string()
		.min(1, "Query can not be empty")
		.describe(
			'Standalone natural-language search phrase or question distilled from the current conversation. Include only the domain-specific keywords needed for retrieval; exclude greetings, explanations, or answer content. Example: "OAuth PKCE token lifetime"',
		),
};

// Define handler function

const queryToolHandler: ToolCallback<typeof queryToolParamSchema> = async (
	{ query }: ZodRawShape,
	extra: any,
	authContext: AuthContext,
) => {
	const userId = authContext.userId;

	console.log(`[queryDocsTool] User ${userId} querying with: "${query}"`);

	try {
		const response = await api.post<QueryResponse>(
			ApiRoutes.QUERY,
			{ query: query },
			{ headers: { "x-user-id": userId } },
		);
		console.log(`[queryDocsTool] Received response from backend for user ${userId}`);
		if (!response.success) {
			return createErrorResponse(
				"There was a server error making this tool call, please" + " try" + " again.",
			);
		}
		return createSuccessTextResponse(response.response);
	} catch (error) {
		console.error(`[queryDocsTool] Error querying backend for user ${userId}:`, error);
		return createErrorResponse(
			"There was a server error making this tool call, please try" + " again.",
		);
	}
};

// Create and export tool
export const queryDocumentsTool: ToolDefinitionSchema<typeof queryToolParamSchema> = {
	name: "query_documents",
	description:
		"Performs a semantic RAG search over the user’s uploaded documents. Invoke this tool when additional factual context is required. Provide exactly one argument, `query`, containing a concise, standalone search phrase or question that captures the user’s current intent. The string is passed verbatim to the retriever, so omit answers, summaries, code, or conversational filler.",
	paramsSchema: queryToolParamSchema,
	handler: queryToolHandler,
};
