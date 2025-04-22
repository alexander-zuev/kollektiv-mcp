import { getSupabase } from "@/web/middleware/supabase";
import { AuthError, type User } from "@supabase/supabase-js";
import type { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie"; // Import AuthError if you want to check instanceof

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
		const { data, error } = await supabase.auth.getUser();

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
			throw new Error(
				`[getCurrentUser] Unexpected runtime error: ${err.message} (${err.name})`,
			);
		}

		// If it's something else entirely (unlikely in JS/TS), wrap that too

		throw new Error(`[getCurrentUser] Unexpected non-Error thrown: ${err}`);
	}
}

type OAuthRequest = {
	clientId: string;
	redirectUri: string;
	state?: string;
	[key: string]: any;
};

export function isValidOAuthRequest(oauthReq: any): oauthReq is OAuthRequest {
	return !!(oauthReq && typeof oauthReq.clientId === "string" && oauthReq.clientId.length > 0);
}

export function extractOAuthReqFromCookie(c: Context): OAuthRequest | null {
	try {
		const cookieVal = getCookie(c, "oauthParams");
		if (!cookieVal) return null;
		const obj = JSON.parse(cookieVal);
		return isValidOAuthRequest(obj) ? obj : null;
	} catch {
		return null;
	}
}

export function persistOAuthReqToCookie(c: Context, oauthReq: OAuthRequest) {
	if (!isValidOAuthRequest(oauthReq)) return;
	setCookie(c, "oauthParams", JSON.stringify(oauthReq), {
		path: "/",
		httpOnly: true,
		maxAge: 60 * 5,
	});
}
