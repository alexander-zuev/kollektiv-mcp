import { api } from "@/mcp/api/client"; // Adjust import path
import { ApiRoutes } from "@/mcp/api/routes"; // Adjust import path
import { queryDocumentsTool } from "@/mcp/tools/queryDocumentsTool";
import { createErrorResponse, createSuccessTextResponse } from "@/mcp/tools/types"; // Adjust import path
import { describe, expect, it, vi } from "vitest";

// Mock the api client
vi.mock("@/mcp/api/client", () => ({
	api: {
		post: vi.fn(),
	},
}));

describe("queryDocumentsTool", () => {
	it("should return success response when API call is successful", async () => {
		const mockSuccessResponse = { success: true, response: "Test successful response" };
		vi.mocked(api.post).mockResolvedValue(mockSuccessResponse);
		const mockAuthContext = { userId: "test-user-id" };
		// @ts-ignore
		const result = await queryDocumentsTool.handler(
			{ query: "test query" },
			{} as any,
			mockAuthContext,
		);
		expect(api.post).toHaveBeenCalledWith(
			ApiRoutes.QUERY,
			{ query: "test query" },
			{ headers: { "x-user-id": "test-user-id" } },
		);
		expect(result).toEqual(createSuccessTextResponse(mockSuccessResponse.response));
	});

	it("should return error message when API response success is false", async () => {
		const mockFailResponse = { success: false, response: "Our backend decided not respond" }; // Response content ignored on
		// failure
		vi.mocked(api.post).mockResolvedValue(mockFailResponse);

		// Verify API call parameters
		const expectedQuery = "This query will lead to a failed response";
		const mockAuthContext = { userId: "test-user-id" };
		const result = await queryDocumentsTool.handler(
			{
				query: "This query will lead to a" + " failed response",
			},
			{} as any,
			// @ts-ignore
			mockAuthContext,
		);
		expect(api.post).toHaveBeenCalledWith(
			ApiRoutes.QUERY,
			{ query: expectedQuery },
			{ headers: { "x-user-id": "test-user-id" } },
		);
		expect(result).toEqual(
			createErrorResponse(
				"There was a server error making this tool call, please" + " try" + " again.",
			),
		);
	});

	it("should return error response when API call throws an error", async () => {
		vi.mocked(api.post).mockRejectedValue(new Error("Network Error"));
		const mockAuthContext = { userId: "test-user-id" };

		// Even though the API call will throw an error, we can still verify that it was called with the correct parameters
		// @ts-ignore
		const result = await queryDocumentsTool.handler(
			{ query: "error query" },
			{} as any,
			mockAuthContext,
		);

		expect(api.post).toHaveBeenCalledWith(
			ApiRoutes.QUERY,
			{ query: "error query" },
			{ headers: { "x-user-id": "test-user-id" } },
		);
		expect(result).toEqual(
			createErrorResponse("There was a server error making this tool call, please try again."),
		);
	});
});
