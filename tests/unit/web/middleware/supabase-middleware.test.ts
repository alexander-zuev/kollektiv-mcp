import type { Context } from "hono";
import { beforeEach, describe, expect, it, vi } from "vitest";

// We need to mock these dependencies before importing the module
vi.mock("@supabase/ssr", () => ({
	createServerClient: vi.fn(),
	parseCookieHeader: vi.fn(),
}));

vi.mock("hono/adapter", () => ({
	env: vi.fn(),
}));

vi.mock("hono/cookie", () => ({
	setCookie: vi.fn(),
}));

// Now we can import the actual module and the mocked dependencies
import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import { env } from "hono/adapter";
import { setCookie } from "hono/cookie";

// Import the module directly - we're testing the actual implementation
// We need to use vi.importActual to bypass the global mock in setup.ts
const { getSupabase, supabaseMiddleware } = await vi.importActual<
	typeof import("@/web/middleware/supabase")
>("@/web/middleware/supabase");

describe("Supabase Middleware Implementation", () => {
	// Reset mocks before each test
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe("getSupabase", () => {
		it("should return supabase client from context", () => {
			// Arrange
			const mockSupabaseClient = { auth: {} };
			const mockContext = {
				get: vi.fn().mockReturnValue(mockSupabaseClient),
			};

			// Act
			const result = getSupabase(mockContext as any);

			// Assert
			expect(mockContext.get).toHaveBeenCalledWith("supabase");
			expect(result).toBe(mockSupabaseClient);
		});
	});

	describe("supabaseMiddleware", () => {
		// Setup common test variables
		let mockContext: Partial<Context>;
		let mockNext: () => Promise<void>;
		let middleware: ReturnType<typeof supabaseMiddleware>;

		beforeEach(() => {
			// Mock context
			mockContext = {
				req: {
					path: "/test-path",
					header: vi.fn().mockReturnValue("cookie1=value1; cookie2=value2"),
				},
				set: vi.fn(),
			};

			// Mock next function
			mockNext = vi.fn().mockResolvedValue(undefined);

			// Create middleware instance
			middleware = supabaseMiddleware();

			// Mock environment variables
			vi.mocked(env).mockReturnValue({
				SUPABASE_URL: "https://test-project.supabase.co",
				SUPABASE_ANON_KEY: "test-anon-key",
			});

			// Mock parseCookieHeader
			vi.mocked(parseCookieHeader).mockReturnValue([
				{ name: "cookie1", value: "value1" },
				{ name: "cookie2", value: "value2" },
			]);

			// Mock createServerClient
			vi.mocked(createServerClient).mockReturnValue({ auth: {} } as any);
		});

		it("should create supabase client and set it in context", async () => {
			// Arrange
			const mockSupabaseClient = { auth: {} };
			vi.mocked(createServerClient).mockReturnValue(mockSupabaseClient as any);

			// Act
			await middleware(mockContext as Context, mockNext);

			// Assert
			expect(createServerClient).toHaveBeenCalledWith(
				"https://test-project.supabase.co",
				"test-anon-key",
				expect.objectContaining({
					cookies: expect.objectContaining({
						getAll: expect.any(Function),
						setAll: expect.any(Function),
					}),
				}),
			);
			expect(mockContext.set).toHaveBeenCalledWith("supabase", mockSupabaseClient);
			expect(mockNext).toHaveBeenCalled();
		});

		it("should throw error when SUPABASE_URL is not set", async () => {
			// Arrange
			vi.mocked(env).mockReturnValue({
				SUPABASE_URL: "",
				SUPABASE_ANON_KEY: "test-anon-key",
			});

			// Act & Assert
			await expect(middleware(mockContext as Context, mockNext)).rejects.toThrow(
				"SUPABASE_URL environment variable is not set!",
			);
			expect(mockNext).not.toHaveBeenCalled();
		});

		it("should throw error when SUPABASE_ANON_KEY is not set", async () => {
			// Arrange
			vi.mocked(env).mockReturnValue({
				SUPABASE_URL: "https://test-project.supabase.co",
				SUPABASE_ANON_KEY: "",
			});

			// Act & Assert
			await expect(middleware(mockContext as Context, mockNext)).rejects.toThrow(
				"SUPABASE_ANON_KEY environment variable is not set!",
			);
			expect(mockNext).not.toHaveBeenCalled();
		});

		it("should handle cookies correctly", async () => {
			// Arrange
			const mockSupabaseClient = { auth: {} };
			vi.mocked(createServerClient).mockImplementation((url, key, options) => {
				// Call the getAll function to test it
				const cookies = options.cookies.getAll();
				expect(cookies).toEqual([
					{ name: "cookie1", value: "value1" },
					{ name: "cookie2", value: "value2" },
				]);

				// Call the setAll function to test it
				options.cookies.setAll([
					{ name: "test-cookie", value: "test-value", options: { path: "/" } },
				]);

				return mockSupabaseClient as any;
			});

			// Act
			await middleware(mockContext as Context, mockNext);

			// Assert
			expect(setCookie).toHaveBeenCalledWith(mockContext, "test-cookie", "test-value", {
				path: "/",
			});
		});

		it("should handle undefined cookie values", async () => {
			// Arrange
			vi.mocked(parseCookieHeader).mockReturnValue([{ name: "cookie1", value: undefined }]);

			// Act
			await middleware(mockContext as Context, mockNext);

			// Assert
			expect(createServerClient).toHaveBeenCalled();
			// The middleware should convert undefined values to empty strings
			expect(mockNext).toHaveBeenCalled();
		});
	});
});
