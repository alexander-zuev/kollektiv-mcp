import {Hono} from "hono";
import type {OAuthHelpers} from "@cloudflare/workers-oauth-provider";
import {
    allRoutesHandler,
    approveHandler,
    authCallbackHandler,
    getAuthorizeHandler,
    postAuthorizeHandler,
    rootHandler,
    loginHandler,
} from "@/web/handlers";

import {AppRoutes} from "@/web/routes";


export type Bindings = Env & {
    OAUTH_PROVIDER: OAuthHelpers;
};


const app = new Hono<{
    Bindings: Bindings;
}>();

// Apply middleware to all routes
app.use(AppRoutes.ALL, allRoutesHandler)

// Basic root page
app.get(AppRoutes.ROOT, rootHandler)

// Render an authorization page
// If the user is logged in, we'll show a form to approve the appropriate scopes
// If the user is not logged in, we'll show a form to both login and approve the scopes
app.get(AppRoutes.AUTHORIZE, getAuthorizeHandler)


app.post(AppRoutes.AUTHORIZE, postAuthorizeHandler)


// The /authorize page has a form that will POST to /approve
// This endpoint is responsible for validating any login information and
// then completing the authorization request with the OAUTH_PROVIDER
app.post(AppRoutes.APPROVE, approveHandler)

app.get(AppRoutes.AUTH_CALLBACK, authCallbackHandler)


app.post(AppRoutes.LOGIN, loginHandler)

// Export app as the default handler
export default app;