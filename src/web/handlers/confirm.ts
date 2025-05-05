import { getSupabase } from "@/web/middleware/supabase";
import { AppRoutes } from "@/web/routes";
import { base, renderErrorScreen } from "@/web/templates";
import type { EmailOtpType } from "@supabase/supabase-js";
import type { Context } from "hono";

export const authConfirmHandler = async (c: Context) => {
	console.log("[POST /auth/confirm] Handling request.");
	const supabase = getSupabase(c);
	// Magic-link query parameters
	const tokenHash = c.req.query("token_hash");
	const type = (c.req.query("type") ?? "email") as EmailOtpType;

	if (!tokenHash) {
		return c.text("Missing token_hash", 400);
	}

	console.debug("[/auth/confirm] Verifying token_hash and type", tokenHash, type);
	const { data, error } = await supabase.auth.verifyOtp({
		token_hash: tokenHash,
		type,
	});
	console.debug(
		"[/auth/confirm] VerifyOTP responded with session for user or error",
		data.user?.email,
		error,
	);

	if (error || !data.session) {
		console.error("[/auth/confirm] verifyOtp error:", error?.message);
		const content = await renderErrorScreen({
			title: "OTP Token Expired or Invalid",
			message: "OTP token is either expired or invalid. Please try again.",
			hint: "Try logging in again. If the problem persists, please contact support.",
			details: error instanceof Error ? { stack: error.stack, name: error.name } : undefined,
		});
		return c.html(base(content, "OTP Expired or Invalid"), 401);
	}

	await supabase.auth.setSession({
		access_token: data.session.access_token,
		refresh_token: data.session.refresh_token,
	});

	// Success – continue the OAuth flow
	return c.redirect(AppRoutes.AUTHORIZE, 302);
};
