import { api } from "@/mcp/api/client";
import { ApiRoutes } from "@/mcp/api/routes";
import type { QueryResponse } from "@/mcp/api/types/query"; // Adjust path as needed
import {
	type ToolDefinitionSchema,
	createErrorResponse,
	createSuccessTextResponse,
} from "@/mcp/tools/types"; // Ensure
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Define tool parameters schema
const queryToolParamSchema = {
	query: z.string().min(1, "Query can not be empty"),
};

// Define handler function
const queryToolHandler: ToolCallback<typeof queryToolParamSchema> = async ({ query }) => {
	const userId = "hardcoded";

	console.log(`[queryDocsTool] User ${userId} querying with: "${query}"`);

	try {
		const response = await api.post<QueryResponse>(ApiRoutes.QUERY, { query: query });
		console.log(`[queryDocsTool] Received response from backend for user ${userId}`);
		return createSuccessTextResponse(response.response);
	} catch (error) {
		console.error(`[queryDocsTool] Error querying backend for user ${userId}:`, error);
		return createErrorResponse("There was a server making this tool call, please try again.");
	}
};

// Create and export tool
export const queryDocumentsTool: ToolDefinitionSchema<typeof queryToolParamSchema> = {
	name: "queryDocumentsTool",
	description:
		"Query the documents uploaded by the user and return a response from LLM based" +
		" on retrieved documents. The response will be LLM summary based on retrieved documents" +
		" (if any). ",
	paramsSchema: queryToolParamSchema,
	handler: queryToolHandler,
};
