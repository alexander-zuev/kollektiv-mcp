import { isValidClientInfo, isValidOAuthRequest } from "@/web/utils/authContext";
import {
	AUTH_FLOW_COOKIE_NAME,
	deleteAuthFlowCookie,
	persistCookie,
	retrieveCookie,
} from "@/web/utils/cookies";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the hono/cookie module
vi.mock("hono/cookie", () => ({
	getCookie: vi.fn(),
	setCookie: vi.fn(),
	deleteCookie: vi.fn(),
}));

// Mock the authContext validation functions
vi.mock("@/web/utils/authContext", () => ({
	isValidOAuthRequest: vi.fn(),
	isValidClientInfo: vi.fn(),
}));

// Get the mocked functions
const mockedIsValidOAuthRequest = vi.mocked(isValidOAuthRequest);
const mockedIsValidClientInfo = vi.mocked(isValidClientInfo);

describe("Cookie Utilities", () => {
	// Create a mock context for testing
	const createMockContext = (): Context => {
		return {
			req: {
				url: "https://example.com",
			},
		} as unknown as Context;
	};

	// Valid test data
	const validAuthFlowData = {
		oauthReq: { clientId: "test-client-id", redirectUri: "https://example.com/callback" },
		clientInfo: { clientName: "Test Client" },
	};

	// Reset mocks before each test
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe("persistCookie", () => {
		it("should set a cookie with valid data", () => {
			// Arrange
			const mockContext = createMockContext();
			mockedIsValidOAuthRequest.mockReturnValue(true);
			mockedIsValidClientInfo.mockReturnValue(true);

			// Act
			persistCookie(mockContext, validAuthFlowData);

			// Assert
			expect(setCookie).toHaveBeenCalledWith(
				mockContext,
				"authFlow",
				JSON.stringify(validAuthFlowData),
				expect.objectContaining({
					path: "/",
					httpOnly: true,
					secure: true,
					sameSite: "Lax",
				}),
			);
		});

		it("should not set a cookie with invalid OAuth request", () => {
			// Arrange
			const mockContext = createMockContext();
			const invalidData = { ...validAuthFlowData, oauthReq: null };
			mockedIsValidOAuthRequest.mockReturnValue(false);
			mockedIsValidClientInfo.mockReturnValue(true);

			// Act
			persistCookie(mockContext, invalidData);

			// Assert
			expect(setCookie).not.toHaveBeenCalled();
			expect(deleteCookie).toHaveBeenCalledWith(mockContext, AUTH_FLOW_COOKIE_NAME, { path: "/" });
		});

		it("should not set a cookie with invalid client info", () => {
			// Arrange
			const mockContext = createMockContext();
			const invalidData = { ...validAuthFlowData, clientInfo: null };
			mockedIsValidOAuthRequest.mockReturnValue(true);
			mockedIsValidClientInfo.mockReturnValue(false);

			// Act
			persistCookie(mockContext, invalidData);

			// Assert
			expect(setCookie).not.toHaveBeenCalled();
			expect(deleteCookie).toHaveBeenCalledWith(mockContext, AUTH_FLOW_COOKIE_NAME, { path: "/" });
		});

		it("should handle errors when setting cookie", () => {
			// Arrange
			const mockContext = createMockContext();
			mockedIsValidOAuthRequest.mockReturnValue(true);
			mockedIsValidClientInfo.mockReturnValue(true);

			// Mock setCookie to throw an error
			const setCookieMock = setCookie as vi.Mock;
			setCookieMock.mockImplementationOnce(() => {
				throw new Error("Cookie error");
			});

			// Spy on console.error
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

			// Act
			persistCookie(mockContext, validAuthFlowData);

			// Assert
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				"[persistAuthFlowCookie] Error persisting auth flow cookie:",
				expect.any(Error),
			);

			// Cleanup
			consoleErrorSpy.mockRestore();
		});
	});

	describe("retrieveCookie", () => {
		it("should return null when no cookie data is present", () => {
			// Arrange
			const mockContext = createMockContext();
			(getCookie as vi.Mock).mockReturnValue(null);

			// Act
			const result = retrieveCookie(mockContext);

			// Assert
			expect(result).toBeNull();
			expect(getCookie).toHaveBeenCalledWith(mockContext, AUTH_FLOW_COOKIE_NAME);
		});

		it("should return valid data from cookie", () => {
			// Arrange
			const mockContext = createMockContext();
			(getCookie as vi.Mock).mockReturnValue(JSON.stringify(validAuthFlowData));
			mockedIsValidOAuthRequest.mockReturnValue(true);
			mockedIsValidClientInfo.mockReturnValue(true);

			// Act
			const result = retrieveCookie(mockContext);

			// Assert
			expect(result).toEqual(validAuthFlowData);
		});

		it("should return null and delete cookie when data is invalid", () => {
			// Arrange
			const mockContext = createMockContext();
			const invalidData = { oauthReq: null, clientInfo: null };
			(getCookie as vi.Mock).mockReturnValue(JSON.stringify(invalidData));
			mockedIsValidOAuthRequest.mockReturnValue(false);
			mockedIsValidClientInfo.mockReturnValue(false);

			// Act
			const result = retrieveCookie(mockContext);

			// Assert
			expect(result).toBeNull();
			expect(deleteCookie).toHaveBeenCalledWith(mockContext, AUTH_FLOW_COOKIE_NAME, { path: "/" });
		});

		it("should handle JSON parsing errors", () => {
			// Arrange
			const mockContext = createMockContext();
			(getCookie as vi.Mock).mockReturnValue("invalid-json");

			// Spy on console.error
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

			// Act
			const result = retrieveCookie(mockContext);

			// Assert
			expect(result).toBeNull();
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				"[extractAuthFlowDataFromCookie] Error parsing auth flow cookie:",
				expect.any(Error),
			);

			// Cleanup
			consoleErrorSpy.mockRestore();
		});
	});

	describe("deleteAuthFlowCookie", () => {
		it("should delete the auth flow cookie", () => {
			// Arrange
			const mockContext = createMockContext();

			// Act
			deleteAuthFlowCookie(mockContext);

			// Assert
			expect(deleteCookie).toHaveBeenCalledWith(mockContext, AUTH_FLOW_COOKIE_NAME, { path: "/" });
		});
	});
});
