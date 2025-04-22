import {MCPTool, ToolHandler} from "@/mcp/tools/types";
import {z} from 'zod';
import {api} from "@/mcp/api/client";
import {ApiRoutes} from "@/mcp/api/routes";
import {QueryToolRequest, QueryToolResponse} from '@/mcp/api/types/query'; // Adjust path as needed

// Define schema
const queryToolSchema = z.object({
    query: z.string().min(1)
})

// Define handler function
const queryToolHandler: ToolHandler<typeof queryToolSchema> = async (query) => {
    const userId = "hardcoded"


    console.log(`[queryDocsTool] User ${userId} querying with: "${query}"`);

    try {
        const apiResponse = await api.post<QueryToolResponse>(ApiRoutes.QUERY, {query: query})
        console.log(`[queryDocsTool] Received response from backend for user ${userId}`);

        // --- Handle API-Level Errors ---
        if (apiResponse.error) {
            console.error(`[queryDocsTool] API Error for user ${userId}.`, apiResponse.error);
            // Return MCP formatted error
            return {
                isError: true,
                content: [
                    {
                        type: "text",
                        text: `API Error: ${apiResponse.error.message} (Status: ${apiResponse.error.status})`
                    }
                ]
            };
        }


        // --- Handle Case Where API Succeeded but Data is Null/Missing ---
        // This check is crucial because ApiResponse<T> allows data to be null on error
        // And even on success, hypothetically, a 204 No Content could result in non-error but null/empty data depending on client logic
        if (apiResponse.data === null || apiResponse.data === undefined) {
            console.error(`[queryDocsTool] API call succeeded for user ${userId} but returned no data.`);
            return {
                isError: true,
                content: [
                    {
                        type: "text",
                        text: "API call succeeded but returned no data."
                    }
                ]
            };
        }

        // --- Process Successful API Response with Data ---
        const toolResponse: QueryToolResponse = apiResponse.data; // Type assertion is safe here due to the checks above

        if (toolResponse.success) {
            // Backend reported success
            const resultText = toolResponse.response ?? "Query successful, but no specific response content.";
            console.log(`[queryDocsTool] Success for user ${userId}. Returning result.`);
            // Return MCP formatted success response
            return {
                // isError: false is implied if omitted
                content: [
                    {
                        type: "text",
                        text: resultText
                    }
                    // Future: Could add metadata here if needed, e.g.,
                    // ...(toolResponse.metadata ? [{ type: "json", data: toolResponse.metadata }] : [])
                ]
            };
        } else {
            // Backend reported logical failure (e.g., query failed, document not found)
            const failureText = toolResponse.response ?? "Tool execution failed (backend reported success: false).";
            console.warn(`[queryDocsTool] Logical failure reported by backend for user ${userId}. Message: ${failureText}`);
            // Return MCP formatted error indicating logical failure
            return {
                isError: true,
                content: [
                    {
                        type: "text",
                        text: failureText
                    }
                ]
            };
        }

    } catch (error: any) {
        // --- Handle Network/Fetch Errors or Unexpected Exceptions ---
        console.error(`[queryDocsTool] Caught unexpected exception for user ${userId}.`, error);
        // Return MCP formatted error for unexpected issues
        return {
            isError: true,
            content: [
                {
                    type: "text",
                    text: `Tool execution failed unexpectedly: ${error.message || "Unknown error"}`
                }
            ]
        };
        // Alternatively, you could re-throw if you want higher-level MCP error handling to take over completely:
        // throw error;
    }
};


// Create and export tool
export const queryTool: MCPTool<typeof queryToolSchema> = {
    name: "query",
    description: "Query the documents uploaded by the user and return a response from LLM based" +
        " on retrieved documents. The response will be LLM summary based on retrieved documents" +
        " (if any). ",
    schema: queryToolSchema,
    handler: queryToolHandler
}