import {z, ZodObject, ZodRawShape} from 'zod'


/**
 * Standard MCP tool response format as per spec
 * - isError: Optional flag indicating if the tool execution had an error
 * - content: Array of content items representing the tool's output
 */
// export type MCPToolResponse = {
//     /** Whether the tool execution resulted in an error */
//     isError?: boolean;
//
//     /** The content returned by the tool */
//     content: Array<{
//         type: string;
//         [key: string]: any;
//     }>;
// }

/**
 * Define signature of tool handler
 * Tool handlers must return the standard MCP response format
 */
export type ToolHandler<T extends ZodObject<ZodRawShape>> =
    (input: z.infer<T>) => Promise<unknown>;

/**
 * Define structure for a complete tool
 */
export type MCPTool<T extends ZodObject<ZodRawShape> = ZodObject<ZodRawShape>> = {
    /** The name of the tool */
    name: string;

    /** A short description of the tool for documentation purposes*/
    description: string;

    /** Zod schema for the tool input */
    schema: T;

    /** Async function that executes the tool's logic*/
    handler: ToolHandler<T>;
}