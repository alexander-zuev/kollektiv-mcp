import { getSupabase } from "@/web/middleware/supabase";
import { AppRoutes } from "@/web/routes";
import type { Context } from "hono";

export const authCallbackHandler = async (c: Context) => {
	const supabase = getSupabase(c);
	const code = c.req.query("code");
	const state = c.req.query("state");
	const tx = c.req.query("tx");
	if (!tx) {
		console.error("[GET /auth/callback] Missing transaction ID in the callback request.");
		return c.text("Bad Request: Missing cookie transaction id.", 400);
	}

	console.log(
		`[GET /auth/callback] Code: ${code ? "present" : "missing"}, State: ${state ? "present" : "missing"}`,
	);

	if (!code) {
		console.error("[GET /auth/callback] No code found in the callback request from Supabase");
		return c.text("Authentication Error: Authorization code was missing.", 400);
	}

	try {
		console.log("[GET /auth/callback] Exchanging code for session...");
		const result = await supabase.auth.exchangeCodeForSession(code);

		if (result.error) {
			console.error(
				`[GET /auth/callback] Error: ${result.error.message}, Status: ${result.error.status}`,
			);
			return c.text(`Authentication Error: ${result.error.message}`, 400);
		}

		console.log("[GET /auth/callback] Code exchange successful.");
		return c.redirect(`${AppRoutes.AUTHORIZE}?tx=${tx}`, 302);
	} catch (exchangeError) {
		console.error(`[GET /auth/callback] Unexpected error: ${exchangeError}`);
		return c.text("Internal Server Error: Failed to process authentication callback.", 500);
	}
};
