import {chunkFactory} from "@tests/factories/factories";
import {describe, expect, it, vi} from "vitest";
import {api} from "@/api-client/client"; // Adjust import path
import {ApiRoutes} from "@/api-client/routes"; // Adjust import path
import type {RagSearchResponse} from "@/api-client/types/ragTasks";
import {getAuthHeader} from "@/features/auth";
import {createRagSearchToolResult, ragSearchTool} from "@/mcp/tools/ragSearchTool";
import {createErrorResponse} from "@/mcp/tools/types"; // Adjust import path

// Mock the api-http-client http-client
vi.mock("@/api-client/client", () => ({
    api: {
        post: vi.fn(),
    },
}));

describe("ragSearchTool", () => {
    it("Should correct create tool result from API response", () => {
        const mockSuccessResponse: RagSearchResponse = {response: [chunkFactory()], metadata: {}};
        const result = createRagSearchToolResult(mockSuccessResponse);

        expect(result).toEqual({
            content: [
                {
                    type: "text",
                    text: "Search returned 1 chunks:",
                },
                {
                    type: "text",
                    text: JSON.stringify(mockSuccessResponse.response, null, 2),
                },
            ],
        });
    });

    it("should return success response when API call is successful", async () => {
        const mockSuccessResponse: RagSearchResponse = {response: [chunkFactory()], metadata: {}};
        vi.mocked(api.post).mockResolvedValue(mockSuccessResponse);

        const result = await ragSearchTool.handler(
            {
                rag_query: "test query",
                context: "No context provided",
            },
            {
                auth: {userId: "test-user-id", accessToken: "test-token"},
            } as any,
        );

        expect(api.post).toHaveBeenCalledWith(
            ApiRoutes.RAG_SEARCH,
            {
                ragQuery: "test query",
                context: "No context provided",
            },
            {headers: {...getAuthHeader("test-token")}},
        );
        expect(result).toEqual(createRagSearchToolResult(mockSuccessResponse));
    });

    it("should return error message when API response success is false", async () => {
        const simulatedApiError = new Error("Simulated API error (e.g., backend returned non-200)");
        vi.mocked(api.post).mockRejectedValue(simulatedApiError);

        // Verify API call parameters
        const expectedQuery = "This query will lead to a failed response";

        const result = await ragSearchTool.handler(
            {
                rag_query: expectedQuery,
                context: "No context provided",
            },
            {
                auth: {userId: "test-user-id", accessToken: "test-token"},
            } as any,
        );

        expect(api.post).toHaveBeenCalledWith(
            ApiRoutes.RAG_SEARCH,
            {
                ragQuery: expectedQuery,
                context: "No context provided",
            },
            {headers: {...getAuthHeader("test-token")}},
        );
        expect(result).toEqual(
            createErrorResponse("There was a server error making this tool call, please try again."),
        );
    });

    it("should return error response when API call throws an error", async () => {
        vi.mocked(api.post).mockRejectedValue(new Error("Network Error"));

        // Even though the API call will throw an error, we can still verify that it was called with the correct parameters
        const result = await ragSearchTool.handler(
            {
                rag_query: "error query",
                context: "No context provided",
            },
            {
                auth: {userId: "test-user-id", accessToken: "test-token"},
            } as any,
        );

        expect(api.post).toHaveBeenCalledWith(
            ApiRoutes.RAG_SEARCH,
            {
                ragQuery: "error query",
                context: "No context provided",
            },
            {headers: {...getAuthHeader("test-token")}},
        );
        expect(result).toEqual(
            createErrorResponse("There was a server error making this tool call, please try again."),
        );
    });
});