import { api } from "@/mcp/api/client";
import { ApiRoutes } from "@/mcp/api/routes";
import type { ListDocsResponse } from "@/mcp/api/types/documents";
import {
	type AuthContext,
	type ExtraWithAuth,
	type ToolDefinitionSchema,
	createErrorResponse,
	createSuccessTextResponse,
} from "@/mcp/tools/types";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import type { ServerNotification, ServerRequest } from "@modelcontextprotocol/sdk/types.js";
import { type ZodTypeAny, z } from "zod";

// Define tool parameters schema
const listDocumentsToolSchema = z.object({
	// takes no arguments just yet
});
type listDocumentToolInput = z.infer<typeof listDocumentsToolSchema>;

// Define handler function

const listDocumentsToolHandler = async (_input: listDocumentToolInput, extra: ExtraWithAuth) => {
	const userId = extra.auth.userId;

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
export const listDocumentsTool: ToolDefinitionSchema<
	typeof listDocumentsToolSchema.shape,
	ExtraWithAuth
> = {
	name: "list_uploaded_documents",
	description:
		"Returns the list of documents current user has previously uploaded to Kollektiv. " +
		"It takes no parameters.",
	paramsSchema: listDocumentsToolSchema,
	toolAnnotations: {
		title: "List documents uploaded by user to Kollektiv",
	},
	handler: listDocumentsToolHandler,
};

// TODO: DRY this up later -> a single registerTool function should do
export function registerListDocumentsTool(mcpServer: McpServer, authContext: AuthContext) {
	mcpServer.tool(
		listDocumentsTool.name,
		listDocumentsTool.description,
		listDocumentsTool.paramsSchema,
		(
			params: z.objectOutputType<typeof listDocumentsTool.paramsSchema, ZodTypeAny>,
			extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
		) => {
			// Extend extra safely
			const extendedExtra: ExtraWithAuth = {
				...extra,
				auth: authContext,
			};
			// return tool handler as callback
			return listDocumentsTool.handler(params, extendedExtra);
		},
	);
}
