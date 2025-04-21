import {z, ZodObject, ZodRawShape} from 'zod'

// Define the expected result from any tool handler
export type ToolResultPaylod = {
    content: Array<{ type: 'text'; text: string }> // can be adapted as necessary
}

// Define signature of tool handler
export type ToolHandler<T extends ZodObject<ZodRawShape>> =
    (input: z.infer<T>) => Promise<ToolResultPaylod>;

// Define structure for a complete tool
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