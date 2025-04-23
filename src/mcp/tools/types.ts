import type { ZodRawShape, z } from "zod";

/**
 * Standard MCP tool response format as per SDK spec
 * - isError: Optional flag indicating if the tool execution had an error
 * - content: Array of content items representing the tool's output
 */
export type CallToolResult = {
	/** Whether the tool execution resulted in an error */
	isError?: boolean;

	/** The content returned by the tool */
	content: Array<
		| { [x: string]: unknown; type: "text"; text: string }
		| { [x: string]: unknown; type: "image"; data: string; mimeType: string }
		| { [x: string]: unknown; type: "audio"; data: string; mimeType: string }
		| {
				[x: string]: unknown;
				type: "resource";
				resource:
					| { uri: string; text: string; mimeType?: string }
					| { uri: string; blob: string; mimeType?: string };
		  }
	>;
};

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
 * Define signature of tool handler
 * Tool handlers must return the standard MCP response format
 */
export type ToolHandler<S extends ZodRawShape> = (
	input: z.infer<z.ZodObject<S>>,
) => Promise<CallToolResult>;

/**
 * Define structure for a complete tool
 */
export interface MCPTool<S extends ZodRawShape = ZodRawShape> {
	/** The name of the tool */
	name: string;

	/** A short description of the tool for documentation purposes*/
	description: string;

	/** Zod schema for the tool input */
	schema: S;

	/** Async function that executes the tool's logic*/
	handler: ToolHandler<S>;
}
