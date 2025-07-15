import {deleteCookie, getCookie, setCookie} from "hono/cookie";
import {beforeEach, describe, expect, it, type Mock, vi} from "vitest";
import {isValidOAuthRequest} from "@/api/utils/authContext";
import {
    type AuthCookie,
    clearAuthCookie,
    loadAuthCookie,
    saveAuthCookie,
} from "@/api/utils/cookies";
import {createMockContext} from "../../../mocks/hono-mocks";

// Mock the hono/cookie module
vi.mock("hono/cookie", () => ({
    getCookie: vi.fn(),
    setCookie: vi.fn(),
    deleteCookie: vi.fn(),
}));

// Mock the authContext validation functions
vi.mock("@/api/utils/authContext", () => ({
    isValidOAuthRequest: vi.fn(),
}));

// Get the mocked functions
const mockedIsValidOAuthRequest = vi.mocked(isValidOAuthRequest);
const ENCODED = "signed.b64url.payload";
const TEST_TX = "test-transaction-id";

describe("Cookie Utilities", () => {
    // Valid test data
    const validAuthCookie: AuthCookie = {
        oauthReq: {
            responseType: "code",
            clientId: "test-client-id",
            redirectUri: "https://example.com/callback",
            scope: [],
            state: "test-state",
        },
        csrfToken: "test-csrf-token",
    };

    // Reset mocks before each test
    beforeEach(() => {
        vi.resetAllMocks();
    });

    describe("cookie utils (encoding/decoding)", () => {
        it("sets a signed cookie when given valid data", async () => {
            const mockContext = createMockContext();
            await saveAuthCookie(mockContext, TEST_TX, validAuthCookie);

            // Assert
            expect(setCookie).toHaveBeenCalledTimes(1);
            const [_c, cookieName, cookieValue, options] = (setCookie as Mock).mock.calls[0];

            expect(cookieName).toBe(`auth_tx_${TEST_TX}`);
            expect(typeof cookieValue).toBe("string");
            expect(cookieValue.split(".")).toHaveLength(2); // body.signature

            expect(options).toMatchObject({
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 60 * 5,
            });
        });

        it("returns null if the signature is invalid", async () => {
            const c = createMockContext();

            // Mock a tampered cookie value
            const tampered = "invalid.signature";
            (getCookie as Mock).mockReturnValue(tampered);

            const result = await loadAuthCookie(c, TEST_TX);
            expect(result).toBeNull();
        });

        it("returns null for malformed cookie structure", async () => {
            const c = createMockContext();
            (getCookie as Mock).mockReturnValue("invalid-part-only");

            const result = await loadAuthCookie(c, TEST_TX);
            expect(result).toBeNull();
        });

        it("returns null for invalid JSON payload", async () => {
            const c = createMockContext();

            // Mock an invalid JSON payload
            (getCookie as Mock).mockReturnValue("invalid.json.payload");

            const result = await loadAuthCookie(c, TEST_TX);
            expect(result).toBeNull();
        });
    });
    describe("saveAuthCookie", async () => {
        it("should set a cookie with valid data", async () => {
            // Arrange
            const mockContext = createMockContext({
                env: {NODE_ENV: "production"},
            });

            // Mock crypto functions
            vi.spyOn(global.crypto.subtle, "importKey").mockResolvedValue({} as CryptoKey);
            vi.spyOn(global.crypto.subtle, "sign").mockResolvedValue(new ArrayBuffer(32));

            // Mock Buffer.from for encoding
            const originalFrom = Buffer.from;
            vi.spyOn(Buffer, "from").mockImplementation((data: any, encoding?: string) => {
                if (!encoding && (data instanceof ArrayBuffer || ArrayBuffer.isView(data))) {
                    return {
                        toString: () => "mockedSignature",
                    } as Buffer;
                }
                return originalFrom(data, encoding as BufferEncoding);
            });

            // Act
            await saveAuthCookie(mockContext, TEST_TX, validAuthCookie);

            // Assert
            expect(setCookie).toHaveBeenCalledTimes(1);

            const [ctxArg, nameArg, valueArg, optsArg] = (setCookie as Mock).mock.calls[0];

            expect(ctxArg).toBe(mockContext);
            expect(nameArg).toBe(`auth_tx_${TEST_TX}`);
            expect(typeof valueArg).toBe("string");
            expect(valueArg.split(".")).toHaveLength(2); // body.signature
            expect(optsArg).toMatchObject({
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 60 * 5,
            });

            // Restore mocks
            vi.restoreAllMocks();
        });

        it("should set cookie with development settings when NODE_ENV is development", async () => {
            // Arrange
            const mockContext = createMockContext({
                env: {NODE_ENV: "development"},
            });

            // Mock crypto functions
            vi.spyOn(global.crypto.subtle, "importKey").mockResolvedValue({} as CryptoKey);
            vi.spyOn(global.crypto.subtle, "sign").mockResolvedValue(new ArrayBuffer(32));

            // Mock Buffer.from for encoding
            const originalFrom = Buffer.from;
            vi.spyOn(Buffer, "from").mockImplementation((data: any, encoding?: string) => {
                if (!encoding && (data instanceof ArrayBuffer || ArrayBuffer.isView(data))) {
                    return {
                        toString: () => "mockedSignature",
                    } as Buffer;
                }
                return originalFrom(data, encoding as BufferEncoding);
            });

            // Act
            await saveAuthCookie(mockContext, TEST_TX, validAuthCookie);

            // Assert
            expect(setCookie).toHaveBeenCalledTimes(1);
            const [_c, _name, _value, options] = (setCookie as Mock).mock.calls[0];
            expect(options).toMatchObject({
                secure: true,
                sameSite: "lax",
            });

            // Restore mocks
            vi.restoreAllMocks();
        });

        it("should handle errors when setting cookie", async () => {
            // Arrange
            const mockContext = createMockContext();

            // Mock crypto functions
            vi.spyOn(global.crypto.subtle, "importKey").mockResolvedValue({} as CryptoKey);
            vi.spyOn(global.crypto.subtle, "sign").mockResolvedValue(new ArrayBuffer(32));

            // Mock Buffer.from for encoding
            const originalFrom = Buffer.from;
            vi.spyOn(Buffer, "from").mockImplementation((data: any, encoding?: string) => {
                if (!encoding && (data instanceof ArrayBuffer || ArrayBuffer.isView(data))) {
                    return {
                        toString: () => "mockedSignature",
                    } as unknown as Buffer;
                }
                return originalFrom(data, encoding as BufferEncoding);
            });

            // Mock setCookie to throw an error
            (setCookie as Mock).mockImplementationOnce(() => {
                throw new Error("Cookie error");
            });

            // Act & Assert
            await expect(saveAuthCookie(mockContext, TEST_TX, validAuthCookie)).rejects.toThrow(
                "Cookie error",
            );
            expect(setCookie).toHaveBeenCalledTimes(1);

            // Cleanup
            vi.restoreAllMocks();
        });
    });

    describe("loadAuthCookie", () => {
        it("should return null when no cookie data is present", async () => {
            // Arrange
            const mockContext = createMockContext();
            (getCookie as Mock).mockReturnValue(null);

            // Act
            const result = await loadAuthCookie(mockContext, TEST_TX);

            // Assert
            expect(result).toBeNull();
            expect(getCookie).toHaveBeenCalledWith(mockContext, `auth_tx_${TEST_TX}`);
        });

        it("should return valid data from a signed cookie", async () => {
            // Arrange
            const c = createMockContext();

            // Mock getCookie to return a valid cookie value
            const validCookieValue = "validBody.validSignature";
            (getCookie as Mock).mockReturnValue(validCookieValue);

            // Mock hmac to always return the signature part of our cookie
            vi.spyOn(global.crypto.subtle, "importKey").mockResolvedValue({} as CryptoKey);
            vi.spyOn(global.crypto.subtle, "sign").mockImplementation(() => {
                return Promise.resolve(new TextEncoder().encode("validSignature").buffer);
            });

            // Mock Buffer.from for both encoding directions
            const originalFrom = Buffer.from;
            vi.spyOn(Buffer, "from").mockImplementation((data: any, encoding?: string) => {
                // For deb64u function - decode the body
                if (encoding === "base64url" && data === "validBody") {
                    return Buffer.from(
                        JSON.stringify({
                            v: 1,
                            oauthReq: validAuthCookie.oauthReq,
                            csrfToken: validAuthCookie.csrfToken,
                        }),
                    );
                }
                // For b64u function - encode the signature
                if (!encoding && data instanceof ArrayBuffer) {
                    return {
                        toString: () => "validSignature",
                    } as unknown as Buffer;
                }
                return originalFrom(data, encoding as BufferEncoding);
            });

            // Act
            const result = await loadAuthCookie(c, TEST_TX);

            // Assert
            expect(result).not.toBeNull();
            // Ignore version field while asserting core data
            expect(result).toMatchObject(validAuthCookie);
            // Explicitly verify version for completeness
            expect((result as any).v).toBe(1);

            // Cleanup
            vi.restoreAllMocks();
        });

        it("should log message when cookie is invalid", async () => {
            // Arrange
            const mockContext = createMockContext();
            (getCookie as Mock).mockReturnValue("invalid.cookie");

            // Spy on console.log
            const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {
            });

            // Act
            const result = await loadAuthCookie(mockContext, TEST_TX);

            // Assert
            expect(result).toBeNull();
            expect(consoleLogSpy).toHaveBeenCalledWith(`[Cookie] No cookie auth_tx_${TEST_TX}`);

            // Cleanup
            consoleLogSpy.mockRestore();
        });
    });

    describe("clearAuthCookie", () => {
        it("should delete the auth cookie for a transaction", () => {
            // Arrange
            const mockContext = createMockContext();

            // Spy on console.log
            const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {
            });

            // Act
            clearAuthCookie(mockContext, TEST_TX);

            // Assert
            expect(deleteCookie).toHaveBeenCalledWith(mockContext, `auth_tx_${TEST_TX}`, {path: "/"});
            expect(consoleLogSpy).toHaveBeenCalledWith(`[Cookie] Cookie auth_tx_${TEST_TX} deleted`);

            // Cleanup
            consoleLogSpy.mockRestore();
        });
    });
});