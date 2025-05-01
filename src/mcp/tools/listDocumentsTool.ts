import { api } from "@/mcp/api/client";
import { ApiRoutes } from "@/mcp/api/routes";
import type { ListDocsResponse } from "@/mcp/api/types/documents";
import {
	type AuthContext,
	type ToolDefinitionSchema,
	createErrorResponse,
	createSuccessTextResponse,
} from "@/mcp/tools/types";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

// Define tool parameters schema
const listDocumentsToolSchema = {};

// Define handler function

const listDocumentsToolHandler: ToolCallback<typeof listDocumentsToolSchema> = async (
	_params,
	_extra: any,
	authContext: AuthContext,
) => {
	const userId = authContext.userId;

	console.log(`[listDocumentsTool] Fetching documents for user ${userId}`);

	try {
		const docs = await api.get<ListDocsResponse>(ApiRoutes.DOCUMENTS, {
			headers: { "x-user-id": userId },
		});
		console.log(`[listDocumentsTool] Retrieved ${docs.length} documents for user ${userId}`);
		return createSuccessTextResponse(JSON.stringify(docs, null, 2));
	} catch (error) {
		console.error(`[listDocumentsTool] Failed for user ${userId}:`, error);
		return createErrorResponse(
			"There was a server error while fetching your documents. " + "Please try again.",
		);
	}
};

// Create and export tool
export const listDocumentsTool: ToolDefinitionSchema<typeof listDocumentsToolSchema> = {
	name: "list_documents",
	description:
		"Returns the list of documents current user has previously uploaded to Kollektiv. " +
		"It takes no parameters.",
	paramsSchema: listDocumentsToolSchema,
	handler: listDocumentsToolHandler,
};
