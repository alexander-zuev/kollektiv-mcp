import {
	AuthFlowError,
	getValidAuthContext,
	isValidClientInfo,
	isValidOAuthRequest,
} from "@/web/utils/authContext";
import { persistCookie, retrieveCookie } from "@/web/utils/cookies";
import type { Context } from "hono";
import { deleteCookie } from "hono/cookie";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";

// Mock the cookies module
vi.mock("@/web/utils/cookies", () => ({
	persistCookie: vi.fn(),
	retrieveCookie: vi.fn(),
}));

// Mock the hono/cookie module
vi.mock("hono/cookie", () => ({
	deleteCookie: vi.fn(),
}));

describe("Auth Context Utilities", () => {
	// Reset mocks before each test
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe("AuthFlowError", () => {
		it("should create an error with the correct name and message", () => {
			const error = new AuthFlowError("Test error message");
			expect(error.name).toBe("AuthFlowError");
			expect(error.message).toBe("Test error message");
		});
	});

	describe("isValidOAuthRequest", () => {
		it("should return true for valid OAuth request", () => {
			const validRequest = {
				clientId: "test-client-id",
				redirectUri: "https://example.com/callback",
			};
			expect(isValidOAuthRequest(validRequest)).toBe(true);
		});

		it("should return false for null or undefined", () => {
			expect(isValidOAuthRequest(null)).toBe(false);
			expect(isValidOAuthRequest(undefined)).toBe(false);
		});

		it("should return false for request without clientId", () => {
			const invalidRequest = { redirectUri: "https://example.com/callback" };
			expect(isValidOAuthRequest(invalidRequest)).toBe(false);
		});

		it("should return false for request with empty clientId", () => {
			const invalidRequest = { clientId: "", redirectUri: "https://example.com/callback" };
			expect(isValidOAuthRequest(invalidRequest)).toBe(false);
		});
	});

	describe("isValidClientInfo", () => {
		it("should return true for valid client info", () => {
			const validClientInfo = { clientName: "Test Client" };
			expect(isValidClientInfo(validClientInfo)).toBe(true);
		});

		it("should return false for null or undefined", () => {
			expect(isValidClientInfo(null)).toBe(false);
			expect(isValidClientInfo(undefined)).toBe(false);
		});

		it("should return false for client info without clientName", () => {
			const invalidClientInfo = { someOtherProp: "value" };
			expect(isValidClientInfo(invalidClientInfo)).toBe(false);
		});

		it("should return false for client info with non-string clientName", () => {
			const invalidClientInfo = { clientName: 123 };
			expect(isValidClientInfo(invalidClientInfo)).toBe(false);
		});
	});

	describe("getValidAuthContext", () => {
		// Create a mock context for testing
		const createMockContext = (): Context => {
			return {
				req: {
					raw: new Request("https://example.com"),
				},
				env: {
					OAUTH_PROVIDER: {
						parseAuthRequest: vi.fn(),
						lookupClient: vi.fn(),
					},
					SITE_URL: "https://example.com",
				},
			} as unknown as Context;
		};

		// Valid test data
		const validOAuthReq = {
			clientId: "test-client-id",
			redirectUri: "https://example.com/callback",
		};
		const validClientInfo = { clientName: "Test Client" };

		it("should return valid context from request parameters", async () => {
			// Arrange
			const mockContext = createMockContext();
			mockContext.env.OAUTH_PROVIDER.parseAuthRequest.mockResolvedValue(validOAuthReq);
			mockContext.env.OAUTH_PROVIDER.lookupClient.mockResolvedValue(validClientInfo);

			// Act
			const result = await getValidAuthContext(mockContext);

			// Assert
			expect(result).toEqual({ oauthReq: validOAuthReq, clientInfo: validClientInfo });
			expect(persistCookie).toHaveBeenCalledWith(mockContext, {
				oauthReq: validOAuthReq,
				clientInfo: validClientInfo,
			});
			expect(mockContext.env.OAUTH_PROVIDER.parseAuthRequest).toHaveBeenCalledWith(
				mockContext.req.raw,
			);
			expect(mockContext.env.OAUTH_PROVIDER.lookupClient).toHaveBeenCalledWith(
				validOAuthReq.clientId,
			);
		});

		it("should fall back to cookie when request parameters are invalid", async () => {
			// Arrange
			const mockContext = createMockContext();
			mockContext.env.OAUTH_PROVIDER.parseAuthRequest.mockResolvedValue({ clientId: "" }); // Invalid OAuth request
			mockContext.env.OAUTH_PROVIDER.lookupClient.mockResolvedValue(validClientInfo);

			const cookieData = { oauthReq: validOAuthReq, clientInfo: validClientInfo };
			(retrieveCookie as Mock).mockReturnValue(cookieData);

			// Act
			const result = await getValidAuthContext(mockContext);

			// Assert
			expect(result).toEqual(cookieData);
			expect(persistCookie).not.toHaveBeenCalled();
			expect(retrieveCookie).toHaveBeenCalledWith(mockContext);
		});

		it("should fall back to cookie when lookupClient fails", async () => {
			// Arrange
			const mockContext = createMockContext();
			mockContext.env.OAUTH_PROVIDER.parseAuthRequest.mockResolvedValue(validOAuthReq);
			mockContext.env.OAUTH_PROVIDER.lookupClient.mockRejectedValue(
				new Error("Client lookup failed"),
			);

			const cookieData = { oauthReq: validOAuthReq, clientInfo: validClientInfo };
			(retrieveCookie as Mock).mockReturnValue(cookieData);

			// Act
			const result = await getValidAuthContext(mockContext);

			// Assert
			expect(result).toEqual(cookieData);
			expect(persistCookie).not.toHaveBeenCalled();
			expect(retrieveCookie).toHaveBeenCalledWith(mockContext);
		});

		it("should throw AuthFlowError when both parameters and cookie are invalid", async () => {
			// Arrange
			const mockContext = createMockContext();
			mockContext.env.OAUTH_PROVIDER.parseAuthRequest.mockResolvedValue(null);
			(retrieveCookie as Mock).mockReturnValue(null);

			// Act & Assert
			await expect(getValidAuthContext(mockContext)).rejects.toThrow(AuthFlowError);
			expect(deleteCookie).toHaveBeenCalled();
		});

		it("should handle errors from parseAuthRequest", async () => {
			// Arrange
			const mockContext = createMockContext();
			mockContext.env.OAUTH_PROVIDER.parseAuthRequest.mockRejectedValue(new Error("Parse error"));

			const cookieData = { oauthReq: validOAuthReq, clientInfo: validClientInfo };
			(retrieveCookie as Mock).mockReturnValue(cookieData);

			// Act
			const result = await getValidAuthContext(mockContext);

			// Assert
			expect(result).toEqual(cookieData);
			expect(persistCookie).not.toHaveBeenCalled();
		});
	});
});
