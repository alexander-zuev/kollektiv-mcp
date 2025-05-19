import type { ZodRawShape } from "zod";
import { z } from "zod";

import type { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import type { ServerNotification, ServerRequest } from "@modelcontextprotocol/sdk/types.js";

export interface AuthContext {
	userId: string;
	email?: string;

	[key: string]: unknown; // ← this is required!
}

export type ExtraWithAuth = RequestHandlerExtra<ServerRequest, ServerNotification> & {
	auth: AuthContext;
};

/**
 * Standard MCP tool response format as per SDK spec
 * - isError: Optional flag indicating if the tool execution had an error
 * - content: Array of content items representing the tool's output
 */
export const CallToolResultSchema = z.object({
	isError: z.boolean().optional(),
	content: z.array(
		z.discriminatedUnion("type", [
			z.object({ type: z.literal("text"), text: z.string() }),
			z.object({ type: z.literal("image"), data: z.string(), mimeType: z.string() }),
			z.object({ type: z.literal("audio"), data: z.string(), mimeType: z.string() }),
			z.object({
				type: z.literal("resource"),
				resource: z.union([
					z.object({ uri: z.string(), text: z.string(), mimeType: z.string().optional() }),
					z.object({ uri: z.string(), blob: z.string(), mimeType: z.string().optional() }),
				]),
			}),
		]),
	),
});

export type CallToolResult = z.infer<typeof CallToolResultSchema>;

/**
 * Creates a standard MCP error response object.
 * @param errorText - The error message.
 * @param type - Optional content type (defaults to "text").
 */
export function createErrorResponse(errorText: string, type: "text" = "text"): CallToolResult {
	return {
		isError: true,
		content: [
			{
				type: type,
				text: errorText,
			},
		],
	};
}

/**
 * Creates a standard MCP success response object.
 * @param content - The array of content items for the response.
 */
export function createSuccessResponse(content: CallToolResult["content"]): CallToolResult {
	return {
		content: content,
	};
}

/**
 * Creates a standard MCP success response with simple text content.
 * @param text - The success message.
 */
export function createSuccessTextResponse(text: string): CallToolResult {
	return createSuccessResponse([{ type: "text", text: text }]);
}

/**
 * Define structure for a complete tool
 */
export interface ToolDefinitionSchema<
	S extends ZodRawShape = ZodRawShape,
	E = RequestHandlerExtra<ServerRequest, ServerNotification>,
> {
	/** The name of the tool in snake case */
	name: string;

	/** A short description of the tool for documentation purposes*/
	description: string;

	/** Zod schema for the tool input */
	paramsSchema: S;

	/** Tool annotations */
	toolAnnotations?: {
		// Optional human-readable title
		title?: string;
	};

	/** Async function that executes the tool's logic*/
	handler: (params: z.infer<z.ZodObject<S>>, extra: E) => Promise<CallToolResult>;
}
