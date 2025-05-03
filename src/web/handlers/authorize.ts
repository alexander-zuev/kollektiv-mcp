import { type ConsentFormData, ConsentFormSchema } from "@/web/schemas/consentForm"; // Adjust path
import { base } from "@/web/templates/base";
import { renderConsentScreen } from "@/web/templates/consent";
import { renderErrorScreen } from "@/web/templates/error";
import { renderLoginScreen } from "@/web/templates/login";
import type { ClientInfo, OAuthRequest, User } from "@/web/types";
import { AuthFlowError, getValidAuthContext } from "@/web/utils/authContext";
import { AUTH_FLOW_COOKIE_NAME, retrieveCookie } from "@/web/utils/cookies";
import { FormValidationError, parseFormData } from "@/web/utils/form";
import { getCurrentUser } from "@/web/utils/user";
import type { Context } from "hono";
import { deleteCookie } from "hono/cookie";

export const getAuthorizeHandler = async (c: Context) => {
	let oauthReq: OAuthRequest | null = null;
	let clientInfo: ClientInfo | null = null;

	// 1. Get oauth req
	console.log("[GET /authorize] Handling request.");
	try {
		({ oauthReq, clientInfo } = await getValidAuthContext(c));
		console.log("[GET /authorize] Successfully obtained valid auth context.");
	} catch (error) {
		console.warn("[GET /authorize] No valid auth context:", error);
		// Ensure stale cookie is cleaned up if context fetching fails
		deleteCookie(c, AUTH_FLOW_COOKIE_NAME, { path: "/" });

		if (error instanceof AuthFlowError) {
			// Specific, expected error from our logic (e.g., missing params and cookie)
			// Return 401
			const content = await renderErrorScreen({
				title: "Invalid Authorisation Request",
				message: error.message,
				hint:
					"Please ensure you are logging in from an MCP client (Cursor / Windsurf /" +
					" Claude Desktop / others)",
			});
			return c.html(base(content, "Authorization Error"), 401);
		}
		// Unexpected error during context fetching (e.g., provider internal error)
		// Return 500 Internal Server Error
		const content = await renderErrorScreen({
			title: "Internal Server Error",
			message: "An unexpected error occurred while authorizing your session.",
			hint: "Please try again later.",
			details: error instanceof Error ? { stack: error.stack, name: error.name } : undefined,
		});
		return c.html(base(content, "Internal Server Error"), 500);
	}

	// If we reach here, oauthReq and clientInfo are guaranteed to be valid

	// 2. Check user
	const user: User | null = await getCurrentUser(c);

	// 3. If no user -> render login screen
	if (!user) {
		console.log("[GET /authorize] No session found. Rendering login screen.");
		// Pass the validated clientInfo
		const content = await renderLoginScreen(clientInfo); // Pass the whole object
		const pageTitle = `Log in to authorize ${clientInfo.clientName || "Application"}`;
		return c.html(base(content, pageTitle));
	}

	// 4. If user -> render consent screen
	console.log(`[GET /authorize] Session found for user ${user.id}. Rendering consent screen.`);
	// Pass validated objects
	const content = await renderConsentScreen({ oauthReq, clientInfo, user });
	const pageTitle = `Authorize ${clientInfo.clientName || "Application"}`;
	return c.html(base(content, pageTitle));
};

export const postAuthorizeHandler = async (c: Context) => {
	console.log("[POST /authorize] Handling request.");
	// Verify user session
	const user = await getCurrentUser(c);
	if (!user) {
		console.log("[POST /authorize] No session found. Returning 401 Unauthorized.");
		return c.text("Unauthorized", 401);
	}

	const cookieData = retrieveCookie(c);

	// Validate Cookie Data and Extract OAuth Request
	if (!cookieData || !cookieData.oauthReq) {
		console.error("[POST /authorize] Failed to retrieve valid OAuth request from cookie.");
		// Clean up potentially invalid cookie if present
		deleteCookie(c, AUTH_FLOW_COOKIE_NAME, { path: "/" });
		// Return an error - cannot proceed without the original request context
		return c.text("Bad Request: Missing or invalid authorization context.", 400);
	}
	// Store the validated OAuth Request (ignore clientInfo if not needed)
	const oauthReq: OAuthRequest = cookieData.oauthReq;

	// Parse consent form
	let validatedFormData: ConsentFormData; // Use the type inferred from the schema
	console.log(
		`[POST /authorize] Successfully retrieved OAuth request from cookie for client: ${oauthReq.clientId}`,
	);

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

	// Execute action based on form data
	if (validatedFormData.action === "deny") {
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
		deleteCookie(c, AUTH_FLOW_COOKIE_NAME, { path: "/" }); // Clean up cookie on completion
		return c.redirect(redirectTo, 302);
	} catch (error) {
		console.error("[POST /authorize] Error during completeAuthorization:", error);
		deleteCookie(c, AUTH_FLOW_COOKIE_NAME, { path: "/" }); // Clean up cookie on error

		// Attempt to redirect with error, using details from the cookie's oauthReq
		const { redirectUri, state } = oauthReq;
		if (redirectUri) {
			try {
				const errorRedirectUrl = new URL(redirectUri);
				errorRedirectUrl.searchParams.set("error", "server_error");
				if (state) errorRedirectUrl.searchParams.set("state", state);
				return c.redirect(errorRedirectUrl.toString(), 302);
			} catch (e) {
				/* fall through to generic error if redirect URI is bad */
			}
		}
		// Fallback generic error page
		return c.html("<h1>Server Error</h1><p>Could not complete authorization.</p>", 500);
	}
};
