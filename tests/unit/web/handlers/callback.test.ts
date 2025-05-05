import { authCallbackHandler } from "@/web/handlers/callback";
import * as SupabaseModule from "@/web/middleware/supabase";
import { AppRoutes } from "@/web/routes";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Context } from "hono";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { testSession, testUser } from "../../../mocks";

describe("authCallbackHandler", () => {
	// Helper to create a mock context with query parameters
	const createMockContext = (queryParams: Record<string, string | null>): Context => {
		// Create a mock request with the specified query parameters
		const mockReq = {
			url: `https://example.com/auth/callback${
				Object.keys(queryParams).length > 0
					? `?${Object.entries(queryParams)
							.filter(([_, value]) => value !== null)
							.map(([key, value]) => `${key}=${value}`)
							.join("&")}`
					: ""
			}`,
			query: vi.fn((key: string) => queryParams[key] || null),
		};

		// Create mock response methods
		const mockRedirect = vi.fn();
		const mockText = vi.fn();

		// Create a mock Supabase client
		const mockSupabaseClient = {
			auth: {
				exchangeCodeForSession: vi.fn(),
			},
		} as unknown as SupabaseClient;

		// Mock the getSupabase function to return our mock client
		vi.spyOn(SupabaseModule, "getSupabase").mockReturnValue(mockSupabaseClient);

		return {
			req: mockReq,
			redirect: mockRedirect,
			text: mockText,
		} as unknown as Context;
	};

	// Reset mocks before each test
	beforeEach(() => {
		vi.resetAllMocks();
	});

	// Happy path test
	it("should exchange code for session and redirect to authorize page on success", async () => {
		// Arrange
		const mockContext = createMockContext({ code: "valid-code", state: "some-state" });

		// Get the mock Supabase client
		const mockSupabaseClient = SupabaseModule.getSupabase(mockContext as Context);

		// Configure the mock to return a successful response
		mockSupabaseClient.auth.exchangeCodeForSession.mockResolvedValue({
			data: {
				session: testSession,
				user: testUser,
			},
			error: null,
		});

		// Act
		await authCallbackHandler(mockContext);

		// Assert
		expect(mockContext.req.query).toHaveBeenCalledWith("code");
		expect(mockContext.req.query).toHaveBeenCalledWith("state");
		expect(mockSupabaseClient.auth.exchangeCodeForSession).toHaveBeenCalledWith("valid-code");
		expect(mockContext.redirect).toHaveBeenCalledWith(`${AppRoutes.AUTHORIZE}`);
		expect(mockContext.text).not.toHaveBeenCalled();
	});

	// Unhappy path test - missing code
	it("should return an error when code is missing", async () => {
		// Arrange
		const mockContext = createMockContext({ state: "some-state" });

		// Act
		await authCallbackHandler(mockContext);

		// Assert
		expect(mockContext.req.query).toHaveBeenCalledWith("code");
		expect(mockContext.text).toHaveBeenCalledWith(
			"Authentication Error: Authorization code was missing.",
			400,
		);
		expect(mockContext.redirect).not.toHaveBeenCalled();
	});

	// Error handling test - exchange fails
	it("should handle errors when exchanging code for session", async () => {
		// Arrange
		const mockContext = createMockContext({ code: "invalid-code" });

		// Get the mock Supabase client
		const mockSupabaseClient = SupabaseModule.getSupabase(mockContext as Context);

		// Configure the mock to return an error
		mockSupabaseClient.auth.exchangeCodeForSession.mockResolvedValue({
			data: { session: null, user: null },
			error: { message: "Invalid code", status: 400 },
		});

		// Act
		await authCallbackHandler(mockContext);

		// Assert
		expect(mockContext.req.query).toHaveBeenCalledWith("code");
		expect(mockSupabaseClient.auth.exchangeCodeForSession).toHaveBeenCalledWith("invalid-code");
		expect(mockContext.text).toHaveBeenCalledWith("Authentication Error: Invalid code", 400);
		expect(mockContext.redirect).not.toHaveBeenCalled();
	});

	// Error handling test - unexpected error
	it("should handle unexpected errors during code exchange", async () => {
		// Arrange
		const mockContext = createMockContext({ code: "error-code" });

		// Get the mock Supabase client
		const mockSupabaseClient = SupabaseModule.getSupabase(mockContext as Context);

		// Configure the mock to throw an error
		mockSupabaseClient.auth.exchangeCodeForSession.mockRejectedValue(new Error("Network error"));

		// Act
		await authCallbackHandler(mockContext);

		// Assert
		expect(mockContext.req.query).toHaveBeenCalledWith("code");
		expect(mockSupabaseClient.auth.exchangeCodeForSession).toHaveBeenCalledWith("error-code");
		expect(mockContext.text).toHaveBeenCalledWith(
			"Internal Server Error: Failed to process authentication callback.",
			500,
		);
		expect(mockContext.redirect).not.toHaveBeenCalled();
	});
});
