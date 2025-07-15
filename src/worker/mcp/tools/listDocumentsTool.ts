import type {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import type {RequestHandlerExtra} from "@modelcontextprotocol/sdk/shared/protocol.js";
import type {ServerNotification, ServerRequest} from "@modelcontextprotocol/sdk/types.js";
import {getApiRoute} from "@shared/api/app-routes";
import {type ZodTypeAny, z} from "zod";
import type {ListDocsResponse} from "@/api-client/types/documents";
import {getAuthHeaders} from "@/worker/infrastructure/web/auth-helpers";
import {apiClient} from "@/worker/infrastructure/web/http-client";
import {
    type AuthContext,
    createErrorResponse,
    createSuccessTextResponse,
    type ExtraWithAuth,
    type ToolDefinitionSchema,
} from "@/worker/mcp/tools/types";

// Define tool parameters schema
const listDocumentsToolSchema = z.object({
    // takes no arguments just yet
});
type listDocumentToolInput = z.infer<typeof listDocumentsToolSchema>;

// Define handler function

const listDocumentsToolHandler = async (_input: listDocumentToolInput, extra: ExtraWithAuth) => {
    const accessToken = extra.auth.accessToken;
    const userId = extra.auth.userId;

    console.log(`[listDocumentsTool] Fetching documents for user ${userId}`);

    try {
        const docs = await apiClient.get<ListDocsResponse>(getApiRoute('files'), {
            headers: {...getAuthHeaders(accessToken)},
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