import { getSupabase } from "@/web/middleware/supabase";
import { AppRoutes } from "@/web/routes";
import type { Context } from "hono";

export const authCallbackHandler = async (c: Context) => {
	const supabase = getSupabase(c);
	const code = c.req.query("code");
	const state = c.req.query("state");
	const originalUrl = c.req.url;

	console.log(`[GET /auth/callback] Handling request for URL: ${originalUrl}`);
	console.log(
		`[GET /auth/callback] Code: ${code ? "present" : "missing"}, State: ${state ? "present" : "missing"}`,
	);
	console.log(`[GET /auth/callback] Query params: ${new URL(originalUrl).searchParams}`);

	if (!code) {
		console.error("[GET /auth/callback] No code found in the callback request from Supabase");
		return c.text("Authentication Error: Authorization code was missing.", 500);
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
		return c.redirect(`${AppRoutes.AUTHORIZE}`);
	} catch (exchangeError) {
		console.error(`[GET /auth/callback] Unexpected error: ${exchangeError}`);
		return c.text("Internal Server Error: Failed to process authentication callback.", 500);
	}
};
