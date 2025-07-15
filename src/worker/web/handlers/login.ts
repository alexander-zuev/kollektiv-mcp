import { getSupabase } from "@/web/middleware/supabase";
import { AppRoutes } from "@/web/routes";
import { LoginProvider, renderMagicLinkSentScreen } from "@/web/templates";
import { base } from "@/web/templates/base";
import type { Context } from "hono";

export const loginHandler = async (c: Context) => {
	const supabase = getSupabase(c);
	const formData = await c.req.parseBody();
	const tx = c.req.query("tx");
	if (!tx) {
		console.error("[POST /login] missing tx");
		return c.text("Bad request: missing cookie tx - try logging in again.", 400);
	}
	console.log("[POST /login] Form data received:", formData);

	// Get the site URL to use for redirects
	const siteUrl = c.env.SITE_URL;
	console.log(`[POST /login] Site URL: ${siteUrl}`);
	const redirectURL = `${siteUrl}${AppRoutes.AUTH_CALLBACK}?tx=${tx}`;

	// Determine which login method to use based on form data
	if (formData.provider === LoginProvider.GITHUB) {
		console.log("[POST /login] Processing GitHub login with redirect URL:", redirectURL);
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: redirectURL,
			},
		});

		if (error) {
			console.error("[POST /login] GitHub OAuth error:", error.message);
			return c.text(`Error logging in with GitHub: ${error.message}`, 500);
		}

		if (data?.url) {
			console.log("[POST /login] Redirecting to GitHub OAuth URL", data.url);
			return c.redirect(data.url);
		}
		console.error("[POST /login] GitHub OAuth URL missing");
		return c.text("Error initiating GitHub login", 500);
	}

	if (formData.provider === LoginProvider.GOOGLE) {
		console.log("[POST /login] Processing Google login with redirect URL:", redirectURL);

		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: redirectURL,
			},
		});

		if (error) {
			console.error("[POST /login] Google OAuth error:", error.message);
			return c.text(`Error logging in with Google: ${error.message}`, 500);
		}

		if (data?.url) {
			console.log("[POST /login] Redirecting to Google OAuth URL");
			return c.redirect(data.url);
		}
		console.error("[POST /login] Google OAuth URL missing");
		return c.text("Error initiating Google login", 500);
	}

	// If we have an email, assume magic link login
	if (formData.provider === LoginProvider.MAGIC_LINK) {
		const email = formData.email.toString();
		console.log(
			`[POST /login] Processing Magic Link login for email ${email} and setting redirect URL to ${redirectURL}`,
		);

		// Use signInWithOtp for magic link login
		// This sends an email with a link that the user can click to authenticate
		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				shouldCreateUser: true,
				emailRedirectTo: redirectURL,
			},
		});

		if (error) {
			console.error("[POST /login] Magic Link error:", JSON.stringify(error, null, 2));
			return c.text(`Error sending magic link: ${error.message}`, 500);
		}

		// Import the magic link sent screen template
		const content = await renderMagicLinkSentScreen({ email });
		return c.html(base(content, "Check your email"));
	}

	console.error("[POST /login] No valid login method identified");
	return c.text("Invalid login request. Please provide a valid login method.", 400);
};
