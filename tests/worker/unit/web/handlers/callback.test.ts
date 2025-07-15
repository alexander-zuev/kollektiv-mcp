import type {SupabaseClient} from "@supabase/supabase-js";
import type {Context} from "hono";
import {beforeEach, describe, expect, it, vi} from "vitest";
import {authCallbackHandler} from "@/api/handlers/callback";
import * as SupabaseModule from "@/api/middleware/supabase";
import {AppRoutes} from "@/api/routes";
import {testSession, testUser} from "../../../mocks";

const TEST_TX = "unit-test-tx";

describe("authCallbackHandler", () => {
    // Helper to create a mock context with query parameters
    const createMockContext = (queryParams: Record<string, string | null>): Context => {
        /* Always include the `tx` parameter – it’s mandatory for the flow */
        if (!("tx" in queryParams)) queryParams.tx = TEST_TX;

        // Create a mock request with the specified query parameters
        const mockReq = {
            url: `https://example.com/auth/callback${
                Object.keys(queryParams).length > 0
                    ? `?${Object.entries(queryParams)
                        .filter(([_, value]) => value !== null)
                        .map(([key, value]) => `${key}=${value}`)
                        .join("&")}`
                    : ""
            }`,
            query: vi.fn((key: string) => queryParams[key] || null),
        };

        // Create mock response methods
        const mockRedirect = vi.fn();
        const mockText = vi.fn();

        // Create a mock Supabase http-client
        const mockSupabaseClient = {
            auth: {
                exchangeCodeForSession: vi.fn(),
            },
        } as unknown as SupabaseClient;

        // Mock the getSupabase function to return our mock http-client
        vi.spyOn(SupabaseModule, "getSupabase").mockReturnValue(mockSupabaseClient);

        return {
            req: mockReq,
            redirect: mockRedirect,
            text: mockText,
        } as unknown as Context;
    };

    // Reset mocks before each test
    beforeEach(() => {
        vi.resetAllMocks();
    });

    // Happy path test
    it("exchanges code for session and redirects to /authorize with tx on success", async () => {
        const ctx = createMockContext({code: "valid-code", state: "some-state"});

        const supabase = SupabaseModule.getSupabase(ctx);
        supabase.auth.exchangeCodeForSession.mockResolvedValue({
            data: {session: testSession, user: testUser},
            error: null,
        });

        await authCallbackHandler(ctx);

        expect(ctx.req.query).toHaveBeenCalledWith("code");
        expect(ctx.req.query).toHaveBeenCalledWith("state");
        expect(ctx.req.query).toHaveBeenCalledWith("tx");
        expect(supabase.auth.exchangeCodeForSession).toHaveBeenCalledWith("valid-code");
        expect(ctx.redirect).toHaveBeenCalledWith(`${AppRoutes.AUTHORIZE}?tx=${TEST_TX}`, 302);
        expect(ctx.text).not.toHaveBeenCalled();
    });

    // Unhappy path test - missing code
    it("returns 400 when code is missing", async () => {
        const ctx = createMockContext({state: "some-state"});

        await authCallbackHandler(ctx);

        expect(ctx.req.query).toHaveBeenCalledWith("code");
        expect(ctx.req.query).toHaveBeenCalledWith("tx");
        expect(ctx.text).toHaveBeenCalledWith(
            "Authentication Error: Authorization code was missing.",
            400,
        );
        expect(ctx.redirect).not.toHaveBeenCalled();
    });

    // Error handling test - exchange fails
    it("propagates Supabase error when code exchange fails", async () => {
        const ctx = createMockContext({code: "invalid-code"});

        const supabase = SupabaseModule.getSupabase(ctx);
        supabase.auth.exchangeCodeForSession.mockResolvedValue({
            data: {session: null, user: null},
            error: {message: "Invalid code", status: 400},
        });

        await authCallbackHandler(ctx);

        expect(ctx.req.query).toHaveBeenCalledWith("code");
        expect(ctx.req.query).toHaveBeenCalledWith("tx");
        expect(supabase.auth.exchangeCodeForSession).toHaveBeenCalledWith("invalid-code");
        expect(ctx.text).toHaveBeenCalledWith("Authentication Error: Invalid code", 400);
        expect(ctx.redirect).not.toHaveBeenCalled();
    });

    // Error handling test - unexpected error
    it("handles unexpected errors thrown during code exchange", async () => {
        const ctx = createMockContext({code: "error-code"});

        const supabase = SupabaseModule.getSupabase(ctx);
        supabase.auth.exchangeCodeForSession.mockRejectedValue(new Error("Network error"));

        await authCallbackHandler(ctx);

        expect(ctx.req.query).toHaveBeenCalledWith("code");
        expect(ctx.req.query).toHaveBeenCalledWith("tx");
        expect(supabase.auth.exchangeCodeForSession).toHaveBeenCalledWith("error-code");
        expect(ctx.text).toHaveBeenCalledWith(
            "Internal Server Error: Failed to process authentication callback.",
            500,
        );
        expect(ctx.redirect).not.toHaveBeenCalled();
    });

    it("returns 400 when tx parameter is missing", async () => {
        const ctx = createMockContext({code: "some-code", tx: null});

        await authCallbackHandler(ctx);

        expect(ctx.req.query).toHaveBeenCalledWith("tx");
        expect(ctx.text).toHaveBeenCalledWith("Bad Request: Missing cookie transaction id.", 400);
        expect(ctx.redirect).not.toHaveBeenCalled();
    });
});