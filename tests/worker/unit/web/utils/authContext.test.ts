import type {Context} from "hono";
import {deleteCookie} from "hono/cookie";
import {beforeEach, describe, expect, it, type Mock, vi} from "vitest";
import {AuthFlowError, getValidAuthContext, isValidOAuthRequest} from "@/api/utils/authContext";
import {loadAuthCookie, saveAuthCookie} from "@/api/utils/cookies";

// Mock the cookies module
vi.mock("@/api/utils/cookies", () => ({
    loadAuthCookie: vi.fn(),
    saveAuthCookie: vi.fn(),
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
            const invalidRequest = {redirectUri: "https://example.com/callback"};
            expect(isValidOAuthRequest(invalidRequest)).toBe(false);
        });

        it("should return false for request with empty clientId", () => {
            const invalidRequest = {clientId: "", redirectUri: "https://example.com/callback"};
            expect(isValidOAuthRequest(invalidRequest)).toBe(false);
        });
    });

    describe("getValidAuthContext", () => {
        // Create a mock context for testing
        const createMockContext = (txParam?: string): Context => {
            const url = txParam ? `https://example.com?tx=${txParam}` : "https://example.com";

            return {
                req: {
                    raw: new Request(url),
                    url: url,
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

        // Test transaction ID
        const TEST_TX = "test-transaction-id";

        // Valid test data
        const validOAuthReq = {
            clientId: "test-client-id",
            redirectUri: "https://example.com/callback",
        };
        const validClientInfo = {clientName: "Test Client"};
        const validCsrfToken = "test-csrf-token";

        it("should return valid context from request parameters", async () => {
            // Arrange
            const mockContext = createMockContext();
            mockContext.env.OAUTH_PROVIDER.parseAuthRequest.mockResolvedValue(validOAuthReq);
            mockContext.env.OAUTH_PROVIDER.lookupClient.mockResolvedValue(validClientInfo);

            // Mock crypto.randomUUID to return predictable values
            const originalRandomUUID = crypto.randomUUID;
            crypto.randomUUID = vi
                .fn()
                .mockReturnValueOnce(TEST_TX) // First call for tx
                .mockReturnValueOnce(validCsrfToken); // Second call for csrfToken

            // Act
            const result = await getValidAuthContext(mockContext);

            // Assert
            expect(result).toEqual({
                oauthReq: validOAuthReq,
                client: validClientInfo,
                tx: TEST_TX,
                csrfToken: validCsrfToken,
            });

            expect(saveAuthCookie).toHaveBeenCalledWith(mockContext, TEST_TX, {
                oauthReq: validOAuthReq,
                csrfToken: validCsrfToken,
            });

            expect(mockContext.env.OAUTH_PROVIDER.parseAuthRequest).toHaveBeenCalledWith(
                mockContext.req.raw,
            );

            expect(mockContext.env.OAUTH_PROVIDER.lookupClient).toHaveBeenCalledWith(
                validOAuthReq.clientId,
            );

            // Restore original function
            crypto.randomUUID = originalRandomUUID;
        });

        it("should fall back to cookie when AuthRequest is invalid in a subsequent request", async () => {
            // Arrange
            const mockContext = createMockContext(TEST_TX);
            mockContext.env.OAUTH_PROVIDER.parseAuthRequest.mockResolvedValue({clientId: ""}); // Invalid OAuth request
            mockContext.env.OAUTH_PROVIDER.lookupClient.mockResolvedValue(validClientInfo);

            const cookieData = {
                oauthReq: validOAuthReq,
                csrfToken: validCsrfToken,
            };
            (loadAuthCookie as Mock).mockResolvedValue(cookieData);

            // Act
            const result = await getValidAuthContext(mockContext);

            // Assert
            expect(result).toEqual({
                oauthReq: validOAuthReq,
                client: validClientInfo,
                tx: TEST_TX,
                csrfToken: validCsrfToken,
            });
            expect(saveAuthCookie).not.toHaveBeenCalled();
            expect(loadAuthCookie).toHaveBeenCalledWith(mockContext, TEST_TX);
        });

        it("should throw AuthFlowError when parameters are invalid in the first request", async () => {
            // Arrange
            const mockContext = createMockContext();
            mockContext.env.OAUTH_PROVIDER.parseAuthRequest.mockResolvedValue({clientId: ""}); // Invalid OAuth request

            // Mock loadAuthCookie to return null to ensure it's treated as a first request
            (loadAuthCookie as Mock).mockResolvedValue(null);

            // Mock crypto.randomUUID to return predictable values
            const originalRandomUUID = crypto.randomUUID;
            crypto.randomUUID = vi.fn().mockReturnValue(TEST_TX);

            // Act & Assert
            await expect(getValidAuthContext(mockContext)).rejects.toThrow(AuthFlowError);

            // Restore original function
            crypto.randomUUID = originalRandomUUID;
        });

        it("should handle errors from parseAuthRequest in a subsequent request", async () => {
            // Arrange
            const mockContext = createMockContext(TEST_TX);
            mockContext.env.OAUTH_PROVIDER.parseAuthRequest.mockRejectedValue(new Error("Parse error"));

            const cookieData = {
                oauthReq: validOAuthReq,
                csrfToken: validCsrfToken,
            };
            (loadAuthCookie as Mock).mockResolvedValue(cookieData);
            mockContext.env.OAUTH_PROVIDER.lookupClient.mockResolvedValue(validClientInfo);

            // Act
            const result = await getValidAuthContext(mockContext);

            // Assert
            expect(result).toEqual({
                oauthReq: validOAuthReq,
                client: validClientInfo,
                tx: TEST_TX,
                csrfToken: validCsrfToken,
            });
            expect(saveAuthCookie).not.toHaveBeenCalled();
        });

        it("throws AuthFlowError when client lookup fails in the first request", async () => {
            // Arrange
            const mockContext = createMockContext();
            mockContext.env.OAUTH_PROVIDER.parseAuthRequest.mockResolvedValue(validOAuthReq);

            // Mock loadAuthCookie to return null to ensure it's treated as a first request
            (loadAuthCookie as Mock).mockResolvedValue(null);

            // Mock client lookup to throw an AuthFlowError
            mockContext.env.OAUTH_PROVIDER.lookupClient.mockRejectedValue(
                new AuthFlowError("Client lookup failed"),
            );

            // Mock crypto.randomUUID to return predictable values
            const originalRandomUUID = crypto.randomUUID;
            crypto.randomUUID = vi
                .fn()
                .mockReturnValueOnce(TEST_TX) // First call for tx
                .mockReturnValueOnce(validCsrfToken); // Second call for csrfToken

            // ─ Act & Assert
            await expect(getValidAuthContext(mockContext)).rejects.toThrow(AuthFlowError);

            // Restore original function
            crypto.randomUUID = originalRandomUUID;
        });

        describe("cookie with missing client info", () => {
            it("should throw AuthFlowError when cookie exists but client lookup fails", async () => {
                // Arrange
                const mockContext = createMockContext(TEST_TX);
                mockContext.env.OAUTH_PROVIDER.parseAuthRequest.mockResolvedValue({clientId: ""}); // Invalid OAuth request

                const cookieData = {
                    oauthReq: validOAuthReq,
                    csrfToken: validCsrfToken,
                };
                (loadAuthCookie as Mock).mockResolvedValue(cookieData);

                // Mock client lookup to fail with an AuthFlowError
                mockContext.env.OAUTH_PROVIDER.lookupClient.mockRejectedValue(
                    new AuthFlowError("Client lookup failed"),
                );

                // ─ Act & Assert
                await expect(getValidAuthContext(mockContext)).rejects.toThrow(AuthFlowError);
                expect(loadAuthCookie).toHaveBeenCalledWith(mockContext, TEST_TX);
            });

            it("should throw AuthFlowError when client is not found", async () => {
                // Arrange
                const mockContext = createMockContext(TEST_TX);
                mockContext.env.OAUTH_PROVIDER.parseAuthRequest.mockResolvedValue({clientId: ""}); // Invalid OAuth request

                const cookieData = {
                    oauthReq: validOAuthReq,
                    csrfToken: validCsrfToken,
                };
                (loadAuthCookie as Mock).mockResolvedValue(cookieData);

                // Mock client lookup to return null
                mockContext.env.OAUTH_PROVIDER.lookupClient.mockResolvedValue(null);

                // ─ Act & Assert
                await expect(getValidAuthContext(mockContext)).rejects.toThrow(AuthFlowError);
                expect(loadAuthCookie).toHaveBeenCalledWith(mockContext, TEST_TX);
            });
        });
    });
});