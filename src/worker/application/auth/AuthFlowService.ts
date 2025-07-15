import type {AuthRequest, OAuthHelpers} from "@cloudflare/workers-oauth-provider";
import {isAuthApiError, type Session, type User} from "@supabase/supabase-js";
import type {Context} from "hono";
import {AuthFlowError} from "@/worker/common/errors/domain.errors";
import type {AppContext} from "@/worker/common/types";
import type {AuthFlowContext} from "@/worker/domain/auth/models/AuthFlowContext";
import {loadAuthCookie, saveAuthCookie} from "@/worker/infrastructure/web/cookies";

const NO_VALID_SESSION_ERRORS = new Set([
    "user_not_found",
    "refresh_token_not_found",
    "session_not_found",
    "session_expired",
]);

/**
 * Application Service for OAuth Authorization Flow
 *
 * Orchestrates the OAuth authorization flow by coordinating between:
 * - Domain logic (OAuth validation)
 * - Infrastructure (cookies, HTTP parsing)
 * - External integrations (OAuth provider)
 *
 * TODO: Consider splitting into two distinct flows:
 * 1. Initial authorization flow (GET /authorize)
 * 2. Follow-up authorization flow (POST /authorize)
 */
export class AuthFlowService {
    constructor(private oauthProvider: OAuthHelpers) {
    }

    /**
     * Retrieves the valid OAuth request and http-client information, attempting
     * request parameters first, then falling back to a temporary cookie.
     * Persists valid parameter data to the cookie for later requests
     * within the flow (e.g., after login).
     *
     * @param c Hono Context
     * @returns A promise resolving to an object containing oauthReq and clientInfo.
     * @throws {AuthFlowError} If a valid context cannot be established from cookies.
     */
    async getValidAuthContext(c: Context): Promise<AuthFlowContext> {
        const url = new URL(c.req.url);
        const tx = url.searchParams.get("state") ?? url.searchParams.get("tx") ?? crypto.randomUUID();
        const subsequent = await this.isSubsequentRequest(c, tx);
        const csrfToken = crypto.randomUUID();
        let oauthReq: AuthRequest | undefined;

        /* ------------------------------------------------------------------ */
        /* 1. Try to parse the OAuth request that came in on the query string */
        /* ------------------------------------------------------------------ */

        try {
            oauthReq = await this.oauthProvider.parseAuthRequest(c.req.raw);
            console.debug("[AuthContext] Parsed auth request:", oauthReq);
        } catch (err) {
            console.error("[AuthContext] Failed to parse auth request:", err);

            // For the very first request we must abort – we have no valid context.
            if (!subsequent) {
                throw new AuthFlowError("Invalid authorization request", {cause: err});
            }
            // Otherwise we silently fall through to cookie restoration ↓
        }

        // if request is valid -> try to extract http-client info from request parameters
        if (this.isValidOAuthRequest(oauthReq)) {
            const client = await this.oauthProvider.lookupClient(oauthReq.clientId);

            if (!client) {
                // Client is unknown -> this should also be addressed. Authentication can not continue
                console.error("[AuthContext] clientInfo not found for clientID:", oauthReq.clientId);

                if (!subsequent) {
                    throw new AuthFlowError("Client application unknown");
                }
                // fall through to cookie
            } else {
                console.debug("[AuthContext] Retrieved clientInfo for client_id", client);
                // Everything checks out → persist and return
                await saveAuthCookie(c, tx, {oauthReq, csrfToken});
                console.debug(
                    "[AuthContext] Valid auth context found in request parameters",
                    tx,
                    oauthReq,
                    client,
                );
                return {oauthReq, client, tx, csrfToken};
            }
        } else if (!subsequent) {
            // No client_id (or otherwise malformed) in the *first* request → hard fail
            throw new AuthFlowError("Missing or invalid client_id");
        }

        return await this.extractContextFromCookie(c, tx);
    }

    /**
     * Decides whether the current /authorize hit is the *initial* OAuth request
     * (coming straight from the relying party) or a *subsequent* one that we
     * triggered ourselves (e.g. after login / callback).
     *
     * Heuristics:
     *   1.  The server only adds the `tx` parameter once it has written the
     *       auth-context cookie.
     *   2.  Therefore, if a `tx` is present **and** the corresponding cookie can
     *       be loaded, we are in a follow-up request.
     */
    private async isSubsequentRequest(c: Context, tx: string): Promise<boolean> {
        if (!tx) return false;
        return Boolean(await loadAuthCookie(c, tx));
    }

    /** Basic validation for OAuthRequest */
    private isValidOAuthRequest(oauthReq: unknown): oauthReq is AuthRequest {
        return (
            !!oauthReq &&
            !!(oauthReq as AuthRequest).clientId &&
            (oauthReq as AuthRequest).clientId.length > 0
        );
    }

    private async extractContextFromCookie(c: Context, tx: string): Promise<AuthFlowContext> {
        /* Cookie fallback (second /authorize after /login) */
        const stored = await loadAuthCookie(c, tx);
        if (!stored) {
            console.error("[AuthContext] No auth context found in cookie", tx);
            throw new AuthFlowError("Authorization context missing");
        }
        const client = await this.oauthProvider.lookupClient(stored.oauthReq.clientId);
        if (!client) {
            console.error("[AuthContext] Client not found in cookie", stored.oauthReq.clientId);
            throw new AuthFlowError("Client id not found in cookie");
        }
        console.debug("[AuthContext] Valid auth context found in cookie", tx, stored.oauthReq, client);
        return {oauthReq: stored.oauthReq, client, tx, csrfToken: stored.csrfToken};
    }

    async getCurrentUser(c: Context<AppContext>): Promise<User | null> {
        const supabase = c.get('supabaseClient');

        // Key piece of logic
        // It returns user is user.data
        // It returns null if !user.data
        // It throws an error IF the error != AuthSessionError

        try {
            console.log("[getCurrentUser] Attempting to get user...");
            const {data, error} = await supabase.auth.getUser();

            if (error) {
                // Check name first for the specific non-AuthApiError case
                if (error.name === "AuthSessionMissingError") {
                    console.log(
                        `[getCurrentUser] Handled expected auth condition: name - ${error.name} code - ${error.code}. Returning null.`,
                    );
                    return null;
                }
                // Then check if it's an AuthApiError with a code in our set
                if (isAuthApiError(error) && error.code && NO_VALID_SESSION_ERRORS.has(error.code)) {
                    // We now know error.code is a string and it's in the set
                    console.log(
                        `[getCurrentUser] Handled expected auth condition: ${error.code}. Returning null.`,
                    );
                    return null;
                }
                // Not a session error, throw it
                console.error("[getCurrentUser] Error during authentication occurred:", error);
                throw error;
            }
            // we have a user
            console.log("[getCurrentUserOrNull] User retrieved successfully:", data?.user?.id);
            return data?.user || null;
        } catch (err) {
            // If it's already an AuthError that was re-thrown, just throw it again
            if (isAuthApiError(err) || err instanceof Error) {
                console.error("[getCurrentUser] Unexpected runtime error:", err);
                throw err;
            }

            // If it's something else entirely (unlikely in JS/TS), wrap that too
            throw new Error(`[getCurrentUser] Unexpected non-Error thrown: ${err}`);
        }
    }

    async getUserSession(c: Context<AppContext>): Promise<Session | null> {
        const supabase = c.get('supabaseClient');

        const {data, error} = await supabase.auth.getSession();

        if (error) {
            throw error;
        }
        return data?.session || null;
    }
}