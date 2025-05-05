import type { AuthFlowCookieData } from "@/web/types";
import { isValidOAuthRequest } from "@/web/utils/authContext";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

export const AUTH_FLOW_COOKIE_NAME = "authFlow";
const COOKIE_VERSION = 1; // bump when the encoding changes
const MAX_AGE = 60 * 5; // 5 min
const encoder = new TextEncoder();
const decoder = new TextDecoder();

/* ------------------------------------------------------------------ */
/* Helpers                                                            */

/* ------------------------------------------------------------------ */
export function b64url(buf: ArrayBufferLike): string {
	return Buffer.from(buf).toString("base64url");
}

function b64urlDecode(str: string): Uint8Array {
	return new Uint8Array(Buffer.from(str, "base64url"));
}

export async function hmac(secret: string, msg: string): Promise<string> {
	const key = await crypto.subtle.importKey(
		"raw",
		encoder.encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	);
	const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(msg));
	return b64url(sig);
}

function constantTimeEqual(a: string, b: string): boolean {
	if (a.length !== b.length) return false;
	let out = 0;
	for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
	return out === 0;
}

/* ------------------------------------------------------------------ */
/* Encode / decode                                                    */

/* ------------------------------------------------------------------ */
export async function encodeCookie(data: AuthFlowCookieData, secret: string): Promise<string> {
	const payloadJson = JSON.stringify(data);
	const meta = JSON.stringify({ v: COOKIE_VERSION, t: Date.now() });
	const payload = b64url(encoder.encode(payloadJson)); // compact
	const toSign = `${meta}.${payload}`;
	const sig = await hmac(secret, toSign);
	return `${toSign}.${sig}`; // meta.payload.signature
}

export async function decodeCookie(
	raw: string,
	secret: string,
): Promise<AuthFlowCookieData | null> {
	const parts = raw.split(".");
	if (parts.length !== 3) return null;

	const [metaStr, payloadStr, sig] = parts;
	const expectedSig = await hmac(secret, `${metaStr}.${payloadStr}`);
	if (!constantTimeEqual(sig, expectedSig)) return null; // tampered

	try {
		const meta = JSON.parse(metaStr) as { v: number; t: number };
		if (meta.v !== COOKIE_VERSION) return null; // unsupported version

		const payloadJson = decoder.decode(b64urlDecode(payloadStr));
		const data = JSON.parse(payloadJson) as Partial<AuthFlowCookieData>;
		if (!isValidOAuthRequest(data.oauthReq)) return null;

		return { oauthReq: data.oauthReq, clientInfo: data.clientInfo };
	} catch {
		return null;
	}
}

/**
 *  Persist auth-flow context in a signed cookie.
 *  Requires `COOKIE_SIGNING_SECRET` to be set in the Worker environment.
 *
 * @param c Hono Context
 * @param data The AuthFlowCookieData to persist.
 */
export async function persistCookie(c: Context, data: AuthFlowCookieData): Promise<void> {
	const secret = c.env.COOKIE_SIGNING_SECRET;

	// Validate data before persisting
	if (!isValidOAuthRequest(data.oauthReq)) {
		console.error("[Cookie] Attempted to persist invalid AuthFlowCookieData:", data);
		deleteCookie(c, AUTH_FLOW_COOKIE_NAME, { path: "/" });
		return; // Do not persist invalid data
	}
	try {
		const value = await encodeCookie(data, secret); // ← no extra JSON stringify
		setCookie(c, AUTH_FLOW_COOKIE_NAME, value, {
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: "None",
			maxAge: MAX_AGE, // 5 minutes
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
export async function retrieveCookie(c: Context): Promise<AuthFlowCookieData | null> {
	const raw = getCookie(c, AUTH_FLOW_COOKIE_NAME);
	const secret = c.env.COOKIE_SIGNING_SECRET;

	if (!raw) {
		console.log("[Cookie] No cookie data provided. Skipping cookie parsing.");
		return null; // No cookie data provided
	}

	const data = await decodeCookie(raw, secret);
	if (!data) {
		deleteCookie(c, AUTH_FLOW_COOKIE_NAME, { path: "/" });
		return null;
	}
	return data;
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
