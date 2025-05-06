/**
 * helpers for per‑transaction OAuth‑flow cookies
 *
 * One cookie is issued per authorization transaction:
 *   name  : "auth_tx_<tx>"
 *   value : base64url(JSON(AuthCookie)). HMAC‑SHA256(signature)
 *
 * The cookie survives the /login → /authorize round‑trip (≤5min)
 * and is deleted after POST/authorize succeeds or is cancelled.
 */

import type { AuthRequest } from "@cloudflare/workers-oauth-provider";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

const COOKIE_VERSION = 1; // bump when the encoding changes
const TTL_SECONDS = 60 * 5; // 5 min
const COOKIE_PREFIX = "auth_tx_";

/**
 * Structure of the data persisted in the 'SupabaseAuthCookie' cookie.
 */
export type AuthCookie = {
	/** Parsed OAuth 2.1 authorization request (client_id, scope, code_challenge…) */
	oauthReq: AuthRequest;
	/** CSRF token used to verify the consent POST */
	csrfToken: string;
};

/* ─── helpers ───────────────────────────────────────────────────── */
const enc = new TextEncoder();
const dec = new TextDecoder();

function b64u(buf: ArrayBufferLike) {
	return Buffer.from(buf).toString("base64url");
}

function deb64u(s: string) {
	return Buffer.from(s, "base64url");
}

/* HMAC‑SHA256(body) → base64url signature */
async function hmac(secret: string, data: string) {
	const key = await crypto.subtle.importKey(
		"raw",
		enc.encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	);
	const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
	return b64u(sig);
}

/* ─── encode / decode ─────────────────────────────────────────── */
async function encode(data: AuthCookie, secret: string): Promise<string> {
	const body = b64u(enc.encode(JSON.stringify({ v: COOKIE_VERSION, ...data })));
	const sig = await hmac(secret, body);
	return `${body}.${sig}`;
}

async function decode(raw: string, secret: string): Promise<AuthCookie | null> {
	const [body, sig] = raw.split(".");

	if (!body || !sig) return null;
	if ((await hmac(secret, body)) !== sig) return null;

	try {
		const parsed = JSON.parse(dec.decode(deb64u(body)));
		if (parsed.v !== COOKIE_VERSION) return null;
		return parsed as AuthCookie;
	} catch {
		return null;
	}
}

/**
 * Persist the AuthCookie for a given transaction.
 * @param c   Hono context
 * @param tx  Transaction ID (appended to cookie name)
 * @param data Data to sign and store
 */
export async function saveAuthCookie(c: Context, tx: string, data: AuthCookie): Promise<void> {
	const value = await encode(data, c.env.COOKIE_SIGNING_SECRET);
	const cookieName = COOKIE_PREFIX + tx;
	setCookie(c, cookieName, value, {
		path: "/",
		httpOnly: true,
		secure: c.env.NODE_ENV !== "development",
		sameSite: c.env.NODE_ENV !== "development" ? "none" : "lax",
		maxAge: TTL_SECONDS,
	});
	console.log(`[Cookie] Saved ${cookieName}`);
}

/**
 * Load and verify the AuthCookie for a transaction.
 * @param c  Hono context
 * @param tx Transaction ID
 * @returns  Parsed AuthCookie or null if missing/invalid
 */
export async function loadAuthCookie(c: Context, tx: string): Promise<AuthCookie | null> {
	const cookieName = COOKIE_PREFIX + tx;
	const raw = getCookie(c, cookieName);
	if (!raw) return null;
	const out = await decode(raw, c.env.COOKIE_SIGNING_SECRET);
	if (!out) {
		console.log(`[Cookie] No cookie ${cookieName}`);
		return null;
	}
	console.log(`[Cookie] Loaded ${cookieName}`);
	return out;
}

/**
 * Delete the AuthCookie after the flow concludes.
 * @param c  Hono context
 * @param tx Transaction ID
 */
export function clearAuthCookie(c: Context, tx: string): void {
	const cookieName = COOKIE_PREFIX + tx;
	deleteCookie(c, cookieName, { path: "/" });
	console.log(`[Cookie] Cookie ${cookieName} deleted`);
}
