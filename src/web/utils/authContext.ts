import { loadAuthCookie, saveAuthCookie } from "@/web/utils/cookies";
import type { AuthRequest, ClientInfo } from "@cloudflare/workers-oauth-provider";
import type { Context } from "hono";

// Custom error for cleaner handling in the route
export class AuthFlowError extends Error {
	public readonly cause?: unknown; // keep the original
	public readonly code?: string; // optional machine-readable code

	constructor(userMessage: string, opts?: { cause?: unknown; code?: string }) {
		super(userMessage, { cause: opts?.cause });
		this.name = "AuthFlowError";
		this.cause = opts?.cause;
		this.code = opts?.code;
	}
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
async function isSubsequentRequest(c: Context, tx: string): Promise<boolean> {
	if (!tx) return false;
	return Boolean(await loadAuthCookie(c, tx));
}

/** Basic validation for OAuthRequest */
export function isValidOAuthRequest(oauthReq: unknown): oauthReq is AuthRequest {
	return (
		!!oauthReq &&
		!!(oauthReq as AuthRequest).clientId &&
		(oauthReq as AuthRequest).clientId.length > 0
	);
}

export type AuthFlowContext = {
	oauthReq: AuthRequest;
	client: ClientInfo;
	tx: string;
	csrfToken: string;
};

async function extractContextFromCookie(c: Context, tx: string): Promise<AuthFlowContext> {
	/* Cookie fallback (second /authorize after /login) */
	const stored = await loadAuthCookie(c, tx);
	if (!stored) {
		console.error("[AuthContext] No auth context found in cookie", tx);
		throw new AuthFlowError("Authorization context missing");
	}
	const client = await c.env.OAUTH_PROVIDER.lookupClient(stored.oauthReq.clientId);
	if (!client) {
		console.error("[AuthContext] Client not found in cookie", stored.oauthReq.clientId);
		throw new AuthFlowError("Client id not found in cookie");
	}
	console.debug("[AuthContext] Valid auth context found in cookie", tx, stored.oauthReq, client);
	return { oauthReq: stored.oauthReq, client, tx, csrfToken: stored.csrfToken };
}

/**
 * Retrieves the valid OAuth request and client information, attempting
 * request parameters first, then falling back to a temporary cookie.
 * Persists valid parameter data to the cookie for later requests
 * within the flow (e.g., after login).
 *
 * @param c Hono Context
 * @returns A promise resolving to an object containing oauthReq and clientInfo.
 * @throws {AuthFlowError} If a valid context cannot be established from cookies.
 */
export async function getValidAuthContext(c: Context): Promise<AuthFlowContext> {
	const url = new URL(c.req.url);
	const tx = url.searchParams.get("state") ?? url.searchParams.get("tx") ?? crypto.randomUUID();
	const subsequent = await isSubsequentRequest(c, tx);
	const csrfToken = crypto.randomUUID();
	let oauthReq: AuthRequest | undefined;

	/* ------------------------------------------------------------------ */
	/* 1. Try to parse the OAuth request that came in on the query string */
	/* ------------------------------------------------------------------ */

	try {
		oauthReq = await c.env.OAUTH_PROVIDER.parseAuthRequest(c.req.raw);
		console.debug("[AuthContext] Parsed auth request:", oauthReq);
	} catch (err) {
		console.error("[AuthContext] Failed to parse auth request:", err);

		// For the very first request we must abort – we have no valid context.
		if (!subsequent) {
			throw new AuthFlowError("Invalid authorization request", { cause: err });
		}
		// Otherwise we silently fall through to cookie restoration ↓
	}

	// if request is valid -> try to extract client info from request parameters
	if (isValidOAuthRequest(oauthReq)) {
		const client = await c.env.OAUTH_PROVIDER.lookupClient(oauthReq.clientId);

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
			await saveAuthCookie(c, tx, { oauthReq, csrfToken });
			console.debug(
				"[AuthContext] Valid auth context found in request parameters",
				tx,
				oauthReq,
				client,
			);
			return { oauthReq, client, tx, csrfToken };
		}
	} else if (!subsequent) {
		// No client_id (or otherwise malformed) in the *first* request → hard fail
		throw new AuthFlowError("Missing or invalid client_id");
	}

	return await extractContextFromCookie(c, tx);
}
