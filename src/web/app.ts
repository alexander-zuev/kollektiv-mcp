import {
	allRoutesHandler,
	authCallbackHandler,
	authConfirmHandler,
	getAuthorizeHandler,
	loginHandler,
	postAuthorizeHandler,
	rootHandler,
} from "@/web/handlers";
import type { OAuthHelpers } from "@cloudflare/workers-oauth-provider";
import { Hono } from "hono";

import { logoutHandler } from "@/web/handlers/logout";
import { AppRoutes } from "@/web/routes";

export type Bindings = Env & {
	OAUTH_PROVIDER: OAuthHelpers;
};

const app = new Hono<{
	Bindings: Bindings;
}>();

// Apply middleware to all routes
app.use(AppRoutes.ALL, allRoutesHandler);

// Render a basic home page
app.get(AppRoutes.ROOT, rootHandler);

// Handle the OAuth authorization flow
app.get(AppRoutes.AUTHORIZE, getAuthorizeHandler);

// Validate the login information and complete the authorization request
app.post(AppRoutes.AUTHORIZE, postAuthorizeHandler);

// Validate OTP code and complete the authorization request
app.post(AppRoutes.AUTH_CONFIRM, authConfirmHandler);
// Validate OTP code and complete the authorization request
app.get(AppRoutes.AUTH_CONFIRM, authConfirmHandler);

// Exchange PKCE code for access and session tokens from Supabase
app.get(AppRoutes.AUTH_CALLBACK, authCallbackHandler);

// Handle login request (Oauth vs email)
app.post(AppRoutes.LOGIN, loginHandler);

// Handle logout request
app.get(AppRoutes.LOGOUT, logoutHandler);

// Export app as the default handler
export default app;
