import {getAuthorizeHandler} from "@/web/handlers/authorize";
import {renderConsentScreen} from "@/web/templates/consent";
import {renderErrorPage} from "@/web/templates/error";
import {renderLoginScreen} from "@/web/templates/login";
import {AuthFlowError, getValidAuthContext} from "@/web/utils/authContext";
import {getCurrentUser} from "@/features/auth/utils";
import type {Context} from "hono";
import {beforeEach, describe, expect, it, vi, Mock} from "vitest";
import {testUser} from "@tests/mocks";

/* ─────────────────────────  Mocks  ────────────────────────── */

vi.mock("@/web/utils/authContext", () => ({
    AuthFlowError: vi.fn().mockImplementation((message) => {
        const err = new Error(message);
        err.name = "AuthFlowError";
        return err;
    }),
    getValidAuthContext: vi.fn(),
}));

vi.mock("@/features/auth/utils", () => ({getCurrentUser: vi.fn()}));


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

vi.mock("@/web/templates/error", () => ({
    renderErrorPage: vi.fn().mockResolvedValue("<error-page-html>"),
}));

vi.mock("@/web/utils/form", () => ({
    FormValidationError: vi.fn().mockImplementation((issues) => {
        const err = new Error(`Form validation failed: ${issues[0]?.message || "Invalid input"}`);
        err.name = "FormValidationError";
        err.issues = issues;
        return err;
    }),
    parseFormData: vi.fn(),
}));

/* ────────────────────────  Helpers  ───────────────────────── */

const createMockContext = (): Context => {
    const mockHtml = vi.fn();
    const mockText = vi.fn();
    const mockRedirect = vi.fn();

    return {
        req: {
            raw: new Request("https://example.com"),
            url: "https://example.com",
            query: () => undefined,
        },
        html: mockHtml,
        text: mockText,
        redirect: mockRedirect,
        env: {
            OAUTH_PROVIDER: {
                parseAuthRequest: vi.fn(),
                lookupClient: vi.fn(),
                completeAuthorization: vi.fn(),
            },
        },
    } as unknown as Context;
};

/* ─────────────────────────  Fixtures  ──────────────────────── */

const validOAuthReq = {
    clientId: "test-client-id",
    redirectUri: "https://example.com/callback",
    state: "test-state",
    scope: ["profile", "email"],
    responseType: "code",
    codeChallenge: "test-challenge",
    codeChallengeMethod: "S256",
};

const validClientInfo = {clientName: "Test Client"};
const txId = "test-tx";
const csrfToken = "csrf-token";

/* ─────────────────────────  Tests  ────────────────────────── */

describe("Authorize Handlers", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    describe("getAuthorizeHandler", () => {
        it("renders login screen when no user is authenticated", async () => {
            const c = createMockContext();

            (getValidAuthContext as Mock).mockResolvedValue({
                oauthReq: validOAuthReq,
                client: validClientInfo,
                tx: txId,
                csrfToken,
            });
            (getCurrentUser as Mock).mockResolvedValue(null);

            await getAuthorizeHandler(c);

            expect(getValidAuthContext).toHaveBeenCalledWith(c);
            expect(getCurrentUser).toHaveBeenCalledWith(c);
            expect(renderLoginScreen).toHaveBeenCalledWith(c, validClientInfo, txId);
        });

        it("renders consent screen when user is authenticated", async () => {
            const c = createMockContext();

            (getValidAuthContext as vi.Mock).mockResolvedValue({
                oauthReq: validOAuthReq,
                client: validClientInfo,
                tx: txId,
                csrfToken,
            });
            (getCurrentUser as vi.Mock).mockResolvedValue(testUser);

            await getAuthorizeHandler(c);

            expect(getValidAuthContext).toHaveBeenCalledWith(c);
            expect(getCurrentUser).toHaveBeenCalledWith(c);
            expect(renderConsentScreen).toHaveBeenCalledWith(
                c,
                validOAuthReq,
                validClientInfo,
                testUser,
                txId,
                csrfToken,
            );
        });

        it("handles AuthFlowError and returns error page", async () => {
            const c = createMockContext();

            (getValidAuthContext as vi.Mock).mockRejectedValue(new AuthFlowError("Bad request"));

            await getAuthorizeHandler(c);

            expect(renderErrorPage).toHaveBeenCalled();
        });

        it("propagates unexpected errors (500)", async () => {
            const c = createMockContext();
            const boom = new Error("Unexpected");

            (getValidAuthContext as vi.Mock).mockRejectedValue(boom);

            await expect(getAuthorizeHandler(c)).rejects.toThrow(boom);
        });
    });
});