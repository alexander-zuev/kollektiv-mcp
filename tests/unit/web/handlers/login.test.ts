import { loginHandler } from "@/web/handlers/login";
import * as SupabaseModule from "@/web/middleware/supabase";
import { AppRoutes } from "@/web/routes";
import { LoginProvider } from "@/web/templates";
import * as magicLinkTemplates from "@/web/templates/magic-link";
import type { Context } from "hono";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// Import the mock data directly
import { mockSignInWithOAuthSuccess, mockSignInWithOtpSuccess } from "../../../mocks";

// Mock the magic link sent screen render function (needed for magic link path)
vi.mock("@/web/templates/magicLinkSent", () => ({
	renderMagicLinkSentScreen: vi.fn().mockResolvedValue("<html>Mock Magic Link Sent Screen</html>"),
}));

let renderMagicLinkSentScreenSpy: vi.SpyInstance;

beforeEach(() => {
	// mock the template so the handler does not attempt to render real HTML
	renderMagicLinkSentScreenSpy = vi
		.spyOn(magicLinkTemplates, "renderMagicLinkSentScreen")
		.mockReturnValue("<p>magic link sent</p>"); // or html`` if you use `hono/html`
});

// reset between tests
afterEach(() => {
	vi.restoreAllMocks();
});

describe("loginHandler tests", () => {
	// --- Test Setup ---

	// Helper to create a mock context
	const createMockContext = (formData: Record<string, string | File>): Partial<Context> => {
		const mockReq = {
			parseBody: vi.fn().mockResolvedValue(formData),
		} as any; // Using 'any' for simplicity in mocking Request parts

		const mockEnv = {
			SITE_URL: "http://localhost:8787", // Example SITE_URL
		};

		// We'll spy on these later to check if they were called correctly
		const mockRedirect = vi.fn();
		const mockHtml = vi.fn();
		const mockText = vi.fn();

		return {
			req: mockReq,
			env: mockEnv,
			redirect: mockRedirect,
			html: mockHtml,
			text: mockText,
			// Add other context properties/methods if needed by the handler later
		};
	};

	// --- Test Case ---

	it('should correctly parse form data and identify GitHub login method via "provider"', async () => {
		// 1. Arrange: Set up the mock context with GitHub form data
		const formData = { provider: "github" };
		const mockContext = createMockContext(formData) as Context; // Cast to Context for the handler

		// @ts-ignore // Use ts-ignore if TS complains about __mocks not existing on type
		const supabaseMocks = SupabaseModule.__mocks as typeof SupabaseMocks.__mocks;

		// 2. Act: Call the handler
		await loginHandler(mockContext);

		// 3. Assert: Verify the correct actions were taken
		// Check if parseBody was called
		expect(mockContext.req.parseBody).toHaveBeenCalled();

		// Check if the SPECIFIC mockSignInWithOAuth was called *with github*
		expect(supabaseMocks.mockSignInWithOAuth).toHaveBeenCalledWith(
			expect.objectContaining({
				provider: "github",
				options: expect.objectContaining({
					redirectTo: `http://localhost:8787${AppRoutes.AUTH_CALLBACK}`,
				}),
			}),
		);

		// Check if redirect was called (using the DEFAULT success value from setup.ts)
		expect(mockContext.redirect).toHaveBeenCalledWith(mockSignInWithOAuthSuccess.data.url);

		// Ensure other response methods weren't called
		expect(mockContext.html).not.toHaveBeenCalled();
		expect(mockContext.text).not.toHaveBeenCalled();
	});

	it("should correctly handle magic link login when email is provided", async () => {
		// 1. Arrange: Set up the mock context with email form data
		const formData = {
			provider: LoginProvider.MAGIC_LINK, // ← add this line
			email: "test@example.com",
		};
		const mockContext = createMockContext(formData) as Context;

		// Mock the Supabase client's signInWithOtp method
		const mockSupabaseClient = {
			auth: {
				signInWithOtp: vi.fn().mockResolvedValue(mockSignInWithOtpSuccess),
			},
		};
		(SupabaseModule.getSupabase as vi.Mock).mockReturnValue(mockSupabaseClient);

		// Import the renderMagicLinkSentScreen function
		const { renderMagicLinkSentScreen } = await import("@/web/templates/magic-link");

		// 2. Act: Call the handler
		await loginHandler(mockContext);

		// 3. Assert: Verify the correct actions were taken
		// Check if parseBody was called
		expect(mockContext.req.parseBody).toHaveBeenCalled();

		// Check if signInWithOtp was called with the correct parameters
		expect(mockSupabaseClient.auth.signInWithOtp).toHaveBeenCalledWith({
			email: "test@example.com",
			options: expect.objectContaining({
				shouldCreateUser: true,
				emailRedirectTo: `http://localhost:8787${AppRoutes.AUTH_CALLBACK}`,
			}),
		});

		// Check if renderMagicLinkSentScreen was called with the correct email
		expect(renderMagicLinkSentScreen).toHaveBeenCalledWith({ email: "test@example.com" });

		// Check if html was called with the rendered content
		expect(mockContext.html).toHaveBeenCalled();

		// Ensure other response methods weren't called
		expect(mockContext.redirect).not.toHaveBeenCalled();
		expect(mockContext.text).not.toHaveBeenCalled();
	});

	// TODO: Add tests for other scenarios:
	// Google
	// Error handling
	// - Invalid/missing data
});
