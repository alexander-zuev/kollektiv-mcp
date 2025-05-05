import { persistCookie, retrieveCookie } from "@/web/utils/cookies";
import type { AuthRequest, ClientInfo } from "@cloudflare/workers-oauth-provider";
import type { Context } from "hono";
import { deleteCookie } from "hono/cookie";

// Custom error for cleaner handling in the route
export class AuthFlowError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "AuthFlowError";
	}
}

/** Basic validation for OAuthRequest */
export function isValidOAuthRequest(oauthReq: any): oauthReq is AuthRequest {
	// Add more checks as needed (e.g., redirectUri, responseType)
	return !!(oauthReq && typeof oauthReq.clientId === "string" && oauthReq.clientId.length > 0);
}

export type authContext = {
	oauthReq: AuthRequest;
	clientInfo: ClientInfo;
};

/**
 * Retrieves the valid OAuth request and client information, attempting
 * request parameters first, then falling back to a temporary cookie.
 * Persists valid parameter data to the cookie for subsequent requests
 * within the flow (e.g., after login).
 *
 * @param c Hono Context
 * @returns A promise resolving to an object containing oauthReq and clientInfo.
 * @throws {AuthFlowError} If a valid context cannot be established from params or cookie.
 */
export async function getValidAuthContext(c: Context): Promise<{
	oauthReq: AuthRequest;
	clientInfo?: ClientInfo;
}> {
	console.log("[AuthContext] Attempting to establish valid auth context...");

	// 1. Try parsing from request parameters
	let oauthReq: AuthRequest | undefined;
	let clientInfo: ClientInfo | undefined;

	try {
		// These provider functions might throw errors, or return null/invalid shapes
		oauthReq = await c.env.OAUTH_PROVIDER.parseAuthRequest(c.req.raw);
		// Only lookup client if clientId seems present
		console.log("[AuthContext] Calling lookupClient with clientId:", oauthReq?.clientId);
		if (oauthReq?.clientId) {
			try {
				console.debug("[AuthContext] Attempting to lookup client info with AuthReq:", oauthReq);
				clientInfo = await c.env.OAUTH_PROVIDER.lookupClient(oauthReq.clientId);
			} catch (lookupError) {
				console.warn(`[AuthContext] Failed to lookup client ${oauthReq.clientId}:`, lookupError);
				clientInfo = undefined; // Explicitly set to null on lookup failure
			}
		}
		console.debug("[AuthContext] Client lookup result:", clientInfo || "No client info");
	} catch (error) {
		console.warn("[AuthContext] Error parsing request/client from params:", error);
	}

	// 2. Validate data from parameters
	if (isValidOAuthRequest(oauthReq)) {
		console.log("[AuthContext] Valid context established from parameters.");
		// Persist this valid context to the cookie for potential subsequent steps (like post-login)
		await persistCookie(c, { oauthReq, clientInfo });
		return { oauthReq, clientInfo };
	}

	// 3. If parameters didn't yield valid data, try the cookie
	console.log(
		"[AuthContext] Invalid or incomplete context from parameters, attempting cookie fallback.",
	);
	const cookie = await retrieveCookie(c);

	if (cookie) {
		console.log("[AuthContext] Valid context established from cookie.");
		// We have valid data from the cookie, use it.
		return cookie; // Contains validated oauthReq and clientInfo
	}

	// 4. If neither parameters nor cookie yielded valid data, fail the flow.
	console.error("[AuthContext] Failed to establish valid context from parameters or cookie.");
	// Clean up any potentially invalid cookie before throwing
	deleteCookie(c, "authFlow", { path: "/" });
	throw new AuthFlowError("Missing or invalid authorization request details.");
}
