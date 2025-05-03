import { getAuthorizeHandler } from "@/web/handlers/authorize";
import { renderConsentScreen } from "@/web/templates/consent";
import { renderLoginScreen } from "@/web/templates/login";
import { AuthFlowError, getValidAuthContext } from "@/web/utils/authContext";
import { getCurrentUser } from "@/web/utils/user";
import type { Context } from "hono";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { testUser } from "../../../mocks";

// Mock dependencies
vi.mock("@/web/utils/authContext", () => ({
	AuthFlowError: vi.fn().mockImplementation((message) => {
		const error = new Error(message);
		error.name = "AuthFlowError";
		return error;
	}),
	getValidAuthContext: vi.fn(),
}));

vi.mock("@/web/utils/user", () => ({
	getCurrentUser: vi.fn(),
}));

vi.mock("@/web/utils/cookies", () => {
	return {
		retrieveCookie: vi.fn(),

		AUTH_FLOW_COOKIE_NAME: "authFlow",
	};
});

// Mock the hono/cookie module
vi.mock("hono/cookie", () => ({
	deleteCookie: vi.fn(),
	getCookie: vi.fn(),
	setCookie: vi.fn(),
}));

vi.mock("@/web/templates/login", () => ({
	renderLoginScreen: vi.fn().mockResolvedValue("<login-screen-html>"),
}));

vi.mock("@/web/templates/consent", () => ({
	renderConsentScreen: vi.fn().mockResolvedValue("<consent-screen-html>"),
}));

vi.mock("@/web/templates/base", () => ({
	base: vi.fn((content) => `<base>${content}</base>`),
}));

vi.mock("@/web/utils/form", () => ({
	FormValidationError: vi.fn().mockImplementation((issues) => {
		const error = new Error(`Form validation failed: ${issues[0]?.message || "Invalid input"}`);
		error.name = "FormValidationError";
		error.issues = issues;
		return error;
	}),
	parseFormData: vi.fn(),
}));

describe("Authorize Handlers", () => {
	// Reset mocks before each test
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe("getAuthorizeHandler", () => {
		// Helper to create a mock context
		const createMockContext = (): Context => {
			const mockHtml = vi.fn();
			const mockText = vi.fn();

			return {
				req: {
					raw: new Request("https://example.com"),
					url: "https://example.com",
				},
				html: mockHtml,
				text: mockText,
				env: {
					OAUTH_PROVIDER: {
						parseAuthRequest: vi.fn(),
						lookupClient: vi.fn(),
						completeAuthorization: vi.fn(),
					},
				},
			} as unknown as Context;
		};

		// Valid test data
		const validOAuthReq = {
			clientId: "test-client-id",
			redirectUri: "https://example.com/callback",
			state: "test-state",
			scope: ["profile", "email"],
			responseType: "code",
			codeChallenge: "test-challenge",
			codeChallengeMethod: "S256",
		};
		const validClientInfo = { clientName: "Test Client" };

		it("should render login screen when no user is authenticated", async () => {
			// Arrange
			const mockContext = createMockContext();

			// Mock getValidAuthContext to return valid data
			(getValidAuthContext as vi.Mock).mockResolvedValue({
				oauthReq: validOAuthReq,
				clientInfo: validClientInfo,
			});

			// Mock getCurrentUser to return null (no authenticated user)
			(getCurrentUser as vi.Mock).mockResolvedValue(null);

			// Act
			await getAuthorizeHandler(mockContext);

			// Assert
			expect(getValidAuthContext).toHaveBeenCalledWith(mockContext);
			expect(getCurrentUser).toHaveBeenCalledWith(mockContext);
			expect(renderLoginScreen).toHaveBeenCalledWith(validClientInfo);
			expect(mockContext.html).toHaveBeenCalled();
			expect(mockContext.html.mock.calls[0][0]).toContain("<base>");
			expect(mockContext.html.mock.calls[0][1]).toBeUndefined();
		});

		it("should render consent screen when user is authenticated", async () => {
			// Arrange
			const mockContext = createMockContext();

			// Mock getValidAuthContext to return valid data
			(getValidAuthContext as vi.Mock).mockResolvedValue({
				oauthReq: validOAuthReq,
				clientInfo: validClientInfo,
			});

			// Mock getCurrentUser to return a user
			(getCurrentUser as vi.Mock).mockResolvedValue(testUser);

			// Act
			await getAuthorizeHandler(mockContext);

			// Assert
			expect(getValidAuthContext).toHaveBeenCalledWith(mockContext);
			expect(getCurrentUser).toHaveBeenCalledWith(mockContext);
			expect(renderConsentScreen).toHaveBeenCalledWith({
				oauthReq: validOAuthReq,
				clientInfo: validClientInfo,
				user: testUser,
			});
			expect(mockContext.html).toHaveBeenCalled();
			expect(mockContext.html.mock.calls[0][0]).toContain("<base>");
			expect(mockContext.html.mock.calls[0][1]).toBeUndefined();
		});

		it("should handle AuthFlowError and return 400 Bad Request", async () => {
			// Arrange
			const mockContext = createMockContext();

			// Mock getValidAuthContext to throw AuthFlowError
			const errorMessage = "Invalid or missing authorization request.";
			(getValidAuthContext as vi.Mock).mockRejectedValue(new AuthFlowError(errorMessage));

			// Act
			await getAuthorizeHandler(mockContext);

			// Assert
			expect(getValidAuthContext).toHaveBeenCalledWith(mockContext);
			expect(mockContext.html).toHaveBeenCalled();
			expect(mockContext.html.mock.calls[0][0]).toContain("<base>");
			expect(mockContext.html.mock.calls[0][1]).toBe(401);
		});

		it("should handle unexpected errors and return 500 Internal Server Error", async () => {
			// Arrange
			const mockContext = createMockContext();

			// Mock getValidAuthContext to throw an unexpected error
			(getValidAuthContext as vi.Mock).mockRejectedValue(new Error("Unexpected error"));

			// Act
			await getAuthorizeHandler(mockContext);

			// Assert
			expect(getValidAuthContext).toHaveBeenCalledWith(mockContext);
			expect(mockContext.html).toHaveBeenCalled();
			expect(mockContext.html.mock.calls[0][0]).toContain("<base>");
			expect(mockContext.html.mock.calls[0][1]).toBe(500);
		});
	});

	// Tests for postAuthorizeHandler can be added here
});
