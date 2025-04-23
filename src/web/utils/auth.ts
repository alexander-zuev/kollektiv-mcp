import {getSupabase} from "@/web/middleware/supabase";
import {AuthError,} from "@supabase/supabase-js";
import type {Context} from "hono";
import {getCookie, setCookie} from "hono/cookie"; // Import AuthError if you want to check instanceof
import {User, AuthFlowCookieData, OAuthRequest, ClientInfo} from "@/web/types";

/**
 * Retrieves the current Supabase user.
 * Handles the specific AuthSessionMissingError by returning null.
 * Throws any other unexpected AuthErrors.
 *
 * @param c Hono Context
 * @returns The Supabase User object or null if no session exists.
 * @throws {AuthError} Throws unexpected errors encountered during user retrieval.
 * @throws {Error} Throws a generic Error wrapping other runtime exceptions caught during execution.
 */
export async function getCurrentUser(c: Context): Promise<User | null> {
    const supabase = getSupabase(c);

    // Key piece of logic
    // It returns user is user.data
    // It returns null if !user.data
    // It throws an error IF the error != AuthSessionError

    try {
        console.log("[getCurrentUser] Attempting to get user...");
        const {data, error} = await supabase.auth.getUser();

        if (error) {
            if (error.name === "AuthSessionMissingError") {
                // No session === user is not logged in
                return null;
            }
            // Not a session error, throw it
            console.error("[getCurrentUser] Unexpected error:", error);
            throw error;
        }
        // we have a user
        console.log("[getCurrentUserOrNull] User retrieved successfully:", data?.user?.id);
        return data?.user ?? null;
    } catch (err) {
        console.error("[getCurrentUser] Caught exception during user retrieval:", err);
        // If it's already an AuthError that was re-thrown, just throw it again
        if (err instanceof AuthError) {
            throw err;
        }

        // If it's some other kind of Error, wrap it for clarity
        if (err instanceof Error) {
            throw new Error(`[getCurrentUser] Unexpected runtime error: ${err.message} (${err.name})`);
        }

        // If it's something else entirely (unlikely in JS/TS), wrap that too

        throw new Error(`[getCurrentUser] Unexpected non-Error thrown: ${err}`);
    }
}


export function isValidOAuthRequest(oauthReq: any): oauthReq is OAuthRequest {
    return !!(oauthReq && typeof oauthReq.clientId === "string" && oauthReq.clientId.length > 0);
}

export function persistAuthFlowCookie(c: Context, {oauthReq, clientInfo}: {
    oauthReq: OAuthRequest,
    clientInfo: ClientInfo
}) {
    // Validation happens before calling this, but an extra check doesn't hurt
    if (!isValidOAuthRequest(oauthReq)) {
        console.error("[persistAuthFlowCookie] Attempted to persist invalid data:", data);
        return;
    }

    const data: AuthFlowCookieData = {
        oauthReq,
        clientInfo,
    }
    setCookie(c, "authFlow", JSON.stringify(data), {
        path: "/",
        httpOnly: true,
        maxAge: 60 * 10,
    });
    console.log("[persistAuthFlowCookie] Auth flow data persisted to cookie.");

}

/**
 * Extracts and validates OAuth request data and client info from a cookie string.
 * @param cookieData The raw string value from the "authFlow" cookie.
 * @returns An object containing the parsed oauthReq and clientInfo, or null if parsing fails or data is invalid.
 */
export function extractAuthFlowDataFromCookie(cookieData: string | undefined): AuthFlowCookieData | null {
    if (!cookieData) {
        return null; // No cookie data provided
    }

    try {
        const parsed = JSON.parse(cookieData) as Partial<AuthFlowCookieData>; // Type assertion for better checking

        // Validate the structure and content
        if (parsed && isValidOAuthRequest(parsed.oauthReq) && typeof parsed.clientInfo?.clientName === 'string') {
            // Ensure oauthReq is fully typed before returning
            return {
                oauthReq: parsed.oauthReq, // No need for null check due to isValidOAuthRequest
                clientInfo: parsed.clientInfo
            };
        } else {
            console.warn("[extractAuthFlowDataFromCookie] Parsed cookie data is invalid or incomplete:", parsed);
            return null; // Invalid structure or content
        }
    } catch (e) {
        console.error("[extractAuthFlowDataFromCookie] Error parsing auth flow cookie:", e);
        return null; // Parsing failed
    }
}