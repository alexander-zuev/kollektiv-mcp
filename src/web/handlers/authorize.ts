import { type ConsentFormData, ConsentFormSchema } from "@/web/schemas/consentForm"; // Adjust path
import { renderConsentScreen } from "@/web/templates/consent";
import { renderErrorPage } from "@/web/templates/error";
import { renderLoginScreen } from "@/web/templates/login";
import { type AuthFlowContext, AuthFlowError, getValidAuthContext } from "@/web/utils/authContext";
import { clearAuthCookie, loadAuthCookie } from "@/web/utils/cookies";
import { FormValidationError, parseFormData } from "@/web/utils/form";
import { getCurrentUser } from "@/web/utils/user";
import type { AuthRequest } from "@cloudflare/workers-oauth-provider";
import type { User } from "@supabase/supabase-js";
import type { Context } from "hono";

export const getAuthorizeHandler = async (c: Context) => {
	let ctx: AuthFlowContext;

	// 1. Get oauth req
	console.log("[GET /authorize] Handling request.");
	try {
		ctx = await getValidAuthContext(c);
	} catch (error) {
		if (error instanceof AuthFlowError) {
			return renderErrorPage(
				error.message,
				"Invalid Authorization Request",
				c,
				"Please ensure you are logging in from an MCP client (Cursor / Windsurf /" +
					" Claude Desktop / others)",
				"Authorization Error",
			);
		}
		throw error;
	}

	// 2. Check user
	const user: User | null = await getCurrentUser(c);

	// 3. If no user -> render login screen
	if (!user) {
		console.log("[GET /authorize] No User found. Rendering login screen.");
		return renderLoginScreen(c, ctx.client, ctx.tx);
	}

	// 4. If user -> render consent screen
	console.log(`[GET /authorize] Session found for user ${user.id}. Rendering consent screen.`);
	return renderConsentScreen(c, ctx.oauthReq, ctx.client, user, ctx.tx, ctx.csrfToken);
};

export const postAuthorizeHandler = async (c: Context) => {
	console.log("[POST /authorize] Handling request.");
	const tx = c.req.query("tx");
	if (!tx) {
		console.error("[POST /authorize] No transaction ID found in the request.");
		return c.text("Bad Request: Missing cookie transaction id.", 400);
	}
	const user = await getCurrentUser(c);
	if (!user) {
		console.log("[POST /authorize] No session found. Returning 401 Unauthorized.");
		return c.text("Unauthorized", 401);
	}

	const cookieData = await loadAuthCookie(c, tx);

	// Validate Cookie Data and Extract OAuth Request
	if (!cookieData || !cookieData.oauthReq) {
		console.error("[POST /authorize] Failed to retrieve valid OAuth request from cookie.");
		clearAuthCookie(c, tx);
		return c.text("Bad Request: Missing or invalid authorization context.", 400);
	}

	// Parse consent form
	let validatedFormData: ConsentFormData;

	try {
		validatedFormData = await parseFormData(c, ConsentFormSchema);
		console.log(
			"[POST /authorize] Validated form data:",
			JSON.stringify(validatedFormData, null, 2),
		);
	} catch (error) {
		if (error instanceof FormValidationError) {
			console.error("[POST /authorize] Form validation failed:", error.issues);
			return c.text(`Bad Request: ${error.message}`, 400);
		}
		console.error("[POST /authorize] Error processing form data:", error);
		return c.text("Internal Server Error: Failed to process request form.", 500);
	}
	const oauthReq: AuthRequest = cookieData.oauthReq;
	// Execute action based on form data
	if (validatedFormData.action === "deny") {
		const oauthReq: AuthRequest = cookieData.oauthReq;
		const { redirectUri, state } = oauthReq;
		console.log("[POST /authorize] User denied the request via form.");
		const redirectUrl = new URL(redirectUri);
		redirectUrl.searchParams.set("error", "access_denied"); // Standard error code for denial

		if (state) {
			redirectUrl.searchParams.set("state", state);
		}

		const finalRedirectUrl = redirectUrl.toString();
		console.log(`[POST /authorize] Redirecting denial to: ${finalRedirectUrl}`);

		// 3. Perform the redirect
		return c.redirect(finalRedirectUrl, 302);
	}

	try {
		console.log(`[POST /authorize] Completing authorization for user ${user.id}.`);
		const { redirectTo } = await c.env.OAUTH_PROVIDER.completeAuthorization({
			request: oauthReq,
			userId: user.id,
			metadata: { email: user.email },
			scope: oauthReq.scope, // Pass the parsed scope array
			props: { userId: user.id, email: user.email },
		});

		console.log(`[POST /authorize] Redirecting approval to: ${redirectTo}`);
		clearAuthCookie(c, tx);
		return c.redirect(redirectTo, 302);
	} catch (error) {
		console.error("[POST /authorize] Error during completeAuthorization:", error);
		clearAuthCookie(c, tx);

		// Attempt to redirect with error, using details from the cookie's oauthReq
		const { redirectUri, state } = oauthReq;
		if (redirectUri) {
			try {
				const errorRedirectUrl = new URL(redirectUri);
				errorRedirectUrl.searchParams.set("error", "server_error");
				if (state) errorRedirectUrl.searchParams.set("state", state);
				return c.redirect(errorRedirectUrl.toString(), 302);
			} catch (e) {}
		}
		// Fallback generic error page
		return c.html("<h1>Server Error</h1><p>Could not complete authorization.</p>", 500);
	}
};
