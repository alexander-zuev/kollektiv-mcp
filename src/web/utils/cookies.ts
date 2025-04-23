import { type AuthFlowCookieData, ClientInfo, OAuthRequest } from "@/web/types";
import { isValidClientInfo, isValidOAuthRequest } from "@/web/utils/authContext";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

export const AUTH_FLOW_COOKIE_NAME = "authFlow";

/**
 * Persists valid OAuth request and client info to the auth flow cookie.
 * Validates the data before setting the cookie.
 *
 * @param c Hono Context
 * @param data The AuthFlowCookieData to persist.
 */
export function persistCookie(c: Context, data: AuthFlowCookieData): void {
	// Validate data before persisting
	if (!isValidOAuthRequest(data.oauthReq) || !isValidClientInfo(data.clientInfo)) {
		console.error("[Cookie] Attempted to persist invalid AuthFlowCookieData:", data);
		deleteCookie(c, AUTH_FLOW_COOKIE_NAME, { path: "/" });
		return; // Do not persist invalid data
	}

	try {
		setCookie(c, "authFlow", JSON.stringify(data), {
			path: "/",
			httpOnly: true,
			secure: c.req.url.startsWith("https://"), // Set Secure flag if using HTTPS
			sameSite: "Lax",
			maxAge: 60 * 5, // 5 minutes
		});
		console.log("[persistAuthFlowCookie] Auth flow data persisted to cookie.");
	} catch (error) {
		console.error("[persistAuthFlowCookie] Error persisting auth flow cookie:", error);
	}
}

/**
 * Extracts and validates OAuth request data and client info from a cookie string.
 * @param c Hono context
 * @returns An object containing the parsed oauthReq and clientInfo, or null if parsing fails or data is invalid.
 */
export function retrieveCookie(c: Context): AuthFlowCookieData | null {
	const cookieData = getCookie(c, AUTH_FLOW_COOKIE_NAME);
	if (!cookieData) {
		console.log("[Cookie] No cookie data provided. Skipping cookie parsing.");
		return null; // No cookie data provided
	}

	try {
		const parsedData = JSON.parse(cookieData) as Partial<AuthFlowCookieData>; // Type assertion for better checking

		// Validate the structure and content
		if (isValidOAuthRequest(parsedData.oauthReq) && isValidClientInfo(parsedData.clientInfo)) {
			console.log("[Cookie] Valid auth flow data parsed from cookie.");
			return {
				oauthReq: parsedData.oauthReq, // No need for null check due to isValidOAuthRequest
				clientInfo: parsedData.clientInfo,
			};
		}
		console.warn(
			"[extractAuthFlowDataFromCookie] Parsed cookie data is invalid or incomplete:",
			parsedData,
		);
		deleteCookie(c, AUTH_FLOW_COOKIE_NAME, { path: "/" });
		return null;
	} catch (e) {
		console.error("[extractAuthFlowDataFromCookie] Error parsing auth flow cookie:", e);
		return null; // Parsing failed
	}
}

/**
 * Deletes the auth flow cookie.
 *
 * @param c Hono Context
 */
export function deleteAuthFlowCookie(c: Context): void {
	console.log("[Cookie] Deleting auth flow cookie.");
	deleteCookie(c, AUTH_FLOW_COOKIE_NAME, { path: "/" });
}
