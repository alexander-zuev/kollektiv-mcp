import { isValidOAuthRequest } from "@/web/utils/authContext";
import {
	AUTH_FLOW_COOKIE_NAME,
	b64url,
	deleteAuthFlowCookie,
	encodeCookie,
	hmac,
	persistCookie,
	retrieveCookie,
} from "@/web/utils/cookies";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { createMockContext } from "../../../mocks/hono-mocks";

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
const ENCODED = "signed.b64url.payload";

describe("Cookie Utilities", () => {
	// Valid test data
	const validAuthFlowData = {
		oauthReq: {
			responseType: "code",
			clientId: "test-client-id",
			redirectUri: "https://example.com/callback",
			scope: [],
			state: "test-state",
		},
		clientInfo: {
			clientName: "Test Client",
			clientId: "test-client-id",
			redirectUris: ["https://example.com/callback"],
			tokenEndpointAuthMethod: "client_secret_basic",
		},
	};

	// Reset mocks before each test
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe("cookie utils (encoding/decoding)", () => {
		it("sets a signed cookie when given valid data", async (c) => {
			mockedIsValidOAuthRequest.mockReturnValue(true);

			const mockContext = createMockContext();
			await persistCookie(mockContext, validAuthFlowData);

			// Assert
			expect(setCookie).toHaveBeenCalledTimes(1);
			const [_c, cookieName, cookieValue, options] = (setCookie as Mock).mock.calls[0];

			expect(cookieName).toBe(AUTH_FLOW_COOKIE_NAME);
			expect(typeof cookieValue).toBe("string");
			expect(cookieValue.split(".")).toHaveLength(3); // meta.payload.signature

			expect(options).toMatchObject({
				path: "/",
				httpOnly: true,
				secure: true,
				sameSite: "None",
				maxAge: 60 * 5,
			});
		});
		it("returns null if the signature is invalid", async () => {
			mockedIsValidOAuthRequest.mockReturnValue(true);

			const c = createMockContext();
			const cookie = await encodeCookie(validAuthFlowData, c.env.COOKIE_SIGNING_SECRET);
			const tampered = cookie.replace(/\w$/, "X"); // flip one character

			(getCookie as Mock).mockReturnValue(tampered);

			const result = await retrieveCookie(c);
			expect(result).toBeNull();
			expect(deleteCookie).toHaveBeenCalledWith(c, AUTH_FLOW_COOKIE_NAME, { path: "/" });
		});
		it("returns null for malformed cookie structure", async () => {
			const c = createMockContext();
			(getCookie as Mock).mockReturnValue("invalid-part-only");

			const result = await retrieveCookie(c);
			expect(result).toBeNull();
		});

		it("returns null for invalid JSON payload", async () => {
			const c = createMockContext();
			const meta = JSON.stringify({ v: 1, t: Date.now() });
			const payload = b64url(new TextEncoder().encode("{invalid-json"));
			const toSign = `${meta}.${payload}`;
			const sig = await hmac(c.env.COOKIE_SIGNING_SECRET, toSign);

			const malformedCookie = `${toSign}.${sig}`;
			(getCookie as Mock).mockReturnValue(malformedCookie);

			const result = await retrieveCookie(c);
			expect(result).toBeNull();
		});
	});
	describe("persistCookie", async () => {
		it("should set a cookie with valid data", async () => {
			// Arrange
			const mockContext = createMockContext();
			mockedIsValidOAuthRequest.mockReturnValue(true);

			// Act
			await persistCookie(mockContext, validAuthFlowData);

			// Assert
			expect(setCookie).toHaveBeenCalledTimes(1);

			const [ctxArg, nameArg, valueArg, optsArg] = (setCookie as Mock).mock.calls[0];

			expect(ctxArg).toBe(mockContext);
			expect(nameArg).toBe(AUTH_FLOW_COOKIE_NAME);
			expect(typeof valueArg).toBe("string");
			expect(valueArg.split(".")).toHaveLength(3); // meta.payload.signature
			expect(optsArg).toMatchObject({
				path: "/",
				httpOnly: true,
				secure: true,
				sameSite: "None",
			});
		});

		it("should not set a cookie with invalid OAuth request", () => {
			// Arrange
			const mockContext = createMockContext();
			const invalidData = { ...validAuthFlowData, oauthReq: null };
			mockedIsValidOAuthRequest.mockReturnValue(false);

			// Act
			// @ts-ignore
			persistCookie(mockContext, invalidData);

			// Assert
			expect(setCookie).not.toHaveBeenCalled();
			expect(deleteCookie).toHaveBeenCalledWith(mockContext, AUTH_FLOW_COOKIE_NAME, { path: "/" });
		});

		it("should set a cookie with invalid client info", async () => {
			// Arrange
			const mockContext = createMockContext();
			const invalidData = { ...validAuthFlowData, clientInfo: null };
			mockedIsValidOAuthRequest.mockReturnValue(true);

			// Act
			// @ts-ignore
			await persistCookie(mockContext, invalidData);

			// Assert
			expect(setCookie).toHaveBeenCalled();
		});

		it("should handle errors when setting cookie", async () => {
			// Arrange
			const mockContext = createMockContext();
			mockedIsValidOAuthRequest.mockReturnValue(true);

			// Mock setCookie to throw an error
			const setCookieMock = setCookie as Mock;
			setCookieMock.mockImplementationOnce(() => {
				throw new Error("Cookie error");
			});

			// Spy on console.error
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

			// Act
			await persistCookie(mockContext, validAuthFlowData);

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
		it("should return null when no cookie data is present", async () => {
			// Arrange
			const mockContext = createMockContext();
			(getCookie as Mock).mockReturnValue(null);

			// Act
			const result = await retrieveCookie(mockContext);

			// Assert
			expect(result).toBeNull();
			expect(getCookie).toHaveBeenCalledWith(mockContext, AUTH_FLOW_COOKIE_NAME);
		});

		it("should return valid data from a signed cookie", async () => {
			// Arrange
			const c = createMockContext();
			mockedIsValidOAuthRequest.mockReturnValue(true);

			const signedCookie = await encodeCookie(validAuthFlowData, c.env.COOKIE_SIGNING_SECRET);
			(getCookie as Mock).mockReturnValue(signedCookie);

			// Act
			const result = await retrieveCookie(c);

			// Assert
			expect(result).toEqual(validAuthFlowData);
		});

		it("should return null and delete cookie when data is invalid", async () => {
			// Arrange
			const mockContext = createMockContext();
			const invalidData = { oauthReq: null, clientInfo: null };
			(getCookie as Mock).mockReturnValue(JSON.stringify(invalidData));
			mockedIsValidOAuthRequest.mockReturnValue(false);

			// Act
			const result = await retrieveCookie(mockContext);

			// Assert
			expect(result).toBeNull();
			expect(deleteCookie).toHaveBeenCalledWith(mockContext, AUTH_FLOW_COOKIE_NAME, { path: "/" });
		});
	});

	describe("deleteAuthFlowCookie", () => {
		it("deletes cookie and does not persist if oauthReq is invalid", async () => {
			// Arrange
			const mockContext = createMockContext();

			mockedIsValidOAuthRequest.mockReturnValue(false);

			// Act
			await persistCookie(mockContext, validAuthFlowData);

			// Assert
			expect(setCookie).not.toHaveBeenCalled();
			expect(deleteCookie).toHaveBeenCalledWith(mockContext, AUTH_FLOW_COOKIE_NAME, { path: "/" });
		});
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
