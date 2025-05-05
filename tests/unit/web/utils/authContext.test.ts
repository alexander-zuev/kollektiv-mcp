import { AuthFlowError, getValidAuthContext, isValidOAuthRequest } from "@/web/utils/authContext";
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

		// TODO: this previously asserted that we fallback to cookie if both params are invalid
		//  - this is no longer the case
		it("should fall back to cookie when AuthRequest is invalid. ClientInfo may be empty", async () => {
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

		it("resolves with {oauthReq, clientInfo: undefined} and DOES NOT consult cookie when lookupClient fails", async () => {
			// Arrange
			const mockContext = createMockContext();
			mockContext.env.OAUTH_PROVIDER.parseAuthRequest.mockResolvedValue(validOAuthReq);
			mockContext.env.OAUTH_PROVIDER.lookupClient.mockRejectedValue(
				new Error("Client lookup failed"),
			);

			// ─ Act
			const result = await getValidAuthContext(mockContext);

			// ─ Assert
			expect(result).toEqual({ oauthReq: validOAuthReq, clientInfo: undefined });

			// retrieveCookie must never be called
			expect(retrieveCookie).not.toHaveBeenCalled();

			// The function must write a cookie that contains ONLY oauthReq
			expect(persistCookie).toHaveBeenCalledTimes(1);
			expect(persistCookie).toHaveBeenCalledWith(mockContext, {
				oauthReq: validOAuthReq,
				clientInfo: undefined,
			});
		});

		describe("cookie that holds only oauthReq", () => {
			const cookieOnlyOAuthReq = { oauthReq: validOAuthReq, clientInfo: undefined };

			it("accepts an existing cookie with only oauthReq (no persistence)", async () => {
				// Arrange
				const mockContext = createMockContext();
				mockContext.env.OAUTH_PROVIDER.parseAuthRequest.mockResolvedValue(null); // invalid params
				(retrieveCookie as Mock).mockReturnValue(cookieOnlyOAuthReq);

				// ─ Act
				const result = await getValidAuthContext(mockContext);

				// ─ Assert
				expect(result).toEqual(cookieOnlyOAuthReq);
				expect(persistCookie).not.toHaveBeenCalled();
			});

			it("persists a cookie with only oauthReq when lookupClient fails", async () => {
				// Arrange
				const mockContext = createMockContext();
				mockContext.env.OAUTH_PROVIDER.parseAuthRequest.mockResolvedValue(validOAuthReq);
				mockContext.env.OAUTH_PROVIDER.lookupClient.mockRejectedValue(
					new Error("Client lookup failed"),
				);
				(retrieveCookie as Mock).mockReturnValue(null); // nothing in the browser yet

				// ─ Act
				const result = await getValidAuthContext(mockContext);

				// ─ Assert
				expect(result).toEqual(cookieOnlyOAuthReq);
				expect(persistCookie).toHaveBeenCalledWith(mockContext, cookieOnlyOAuthReq);
			});
		});
	});
});
