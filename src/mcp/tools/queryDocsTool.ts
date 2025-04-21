import {MCPTool, ToolHandler} from "@/mcp/tools/types";
import {z} from 'zod';

// Define schema
const queryToolSchema = z.object({
    query: z.string().min(1)
})

// Define handler function
const queryToolHandler: ToolHandler<typeof queryToolSchema> = (query) => {
    // POST to the API endpoint on BE
    // response =
    // if error => raise
    // otherwise return
    return {}
}

// Create and export tool
export const queryDocsTool: MCPTool<typeof queryToolSchema> = {
    name: "queryDocs",
    description: "Query the documents indexed by Mindtrove and return references if found",
    schema: queryToolSchema,
    handler: queryToolHandler
}