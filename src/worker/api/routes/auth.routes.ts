import type {AuthRequest} from "@cloudflare/workers-oauth-provider";
import type {Session, User} from "@supabase/supabase-js";
import type {Context} from "hono";
import {Hono} from "hono";
import {withSupabaseClient} from "@/worker/api/middleware";
import {type ConsentFormData, ConsentFormSchema} from "@/worker/api/schemas/consentForm";
import {AuthFlowService} from "@/worker/application/auth/AuthFlowService.ts";
import {AuthFlowError, FormValidationError} from '@/worker/common/errors'
import type {AppContext} from "@/worker/common/types";
import type {
    AuthFlowContext,
} from "@/worker/domain/auth/models/AuthFlowContext";
// import {getCurrentUser, getUserSession} from "@/worker/features/auth/utils";
import {
    base, LoginProvider,
    renderConsentScreen,
    renderErrorPage,
    renderLoginScreen, renderMagicLinkSentScreen
} from "@/worker/infrastructure/presentation/templates";
import {clearAuthCookie, loadAuthCookie} from "@/worker/infrastructure/web/cookies";
import {parseFormData} from "@/worker/infrastructure/web/forms";


const authRoutes = new Hono<AppContext>()

authRoutes.use('*', withSupabaseClient())

// GET /auth/authorize - OAuth authorization flow
authRoutes.get('/authorize', async (c: Context<AppContext>) => {
    let ctx: AuthFlowContext;
    let authFlowService: AuthFlowService

    // 1. Get oauth req
    console.log("[GET /auth/authorize] Handling request.");
    try {
        authFlowService = new AuthFlowService(c.env.OAUTH_PROVIDER)
        ctx = await authFlowService.getValidAuthContext(c);
    } catch (error) {
        if (error instanceof AuthFlowError) {
            return renderErrorPage(
                error.message,
                "Invalid Authorization Request",
                c,
                `
Try the following:

1. Clear your browser cookies
2. Run in terminal: rm -rf ~/.mcp-auth (Mac)
3. Restart your editor (Cursor, Windsurf, etc.)

Full steps: 
https://github.com/alexander-zuev/kollektiv-mcp#connection-troubleshooting
`,
                "Authorization Error",
            );
        }
        throw error;
    }

    // 2. Check user
    // const user: User | null = await getCurrentUser(c);
    const user = await authFlowService.getCurrentUser(c)

    // 3. If no user -> render login screen
    if (!user) {
        console.log("[GET /auth/authorize] No User found. Rendering login screen.");
        return renderLoginScreen(c, ctx.client, ctx.tx);
    }

    // 4. If user -> render consent screen
    console.log(`[GET /auth/authorize] Session found for user ${user.id}. Rendering consent screen.`);
    // Check that redirect URI belongs to this client ID? or sooner?
    return renderConsentScreen(c, ctx.oauthReq, ctx.client, user, ctx.tx, ctx.csrfToken);
});

// POST /auth/authorize - Handle consent form submission
authRoutes.post('/authorize', async c => {
    console.log("[POST /auth/authorize] Handling request.");
    let authFlowService: AuthFlowService
    authFlowService = new AuthFlowService(c.env.OAUTH_PROVIDER)

    const tx = c.req.query("tx");
    if (!tx) {
        console.error("[POST /auth/authorize] No transaction ID found in the request.");
        return c.text("Bad Request: Missing cookie transaction id.", 400);
    }
    const user = await authFlowService.getCurrentUser(c);
    if (!user) {
        console.log("[POST /auth/authorize] No session found. Returning 401 Unauthorized.");
        return c.text("Unauthorized", 401);
    }

    const cookieData = await loadAuthCookie(c, tx);

    // Validate Cookie Data and Extract OAuth Request
    if (!cookieData || !cookieData.oauthReq) {
        console.error("[POST /auth/authorize] Failed to retrieve valid OAuth request from cookie.");
        clearAuthCookie(c, tx);
        return c.text("Bad Request: Missing or invalid authorization context.", 400);
    }

    // Parse consent form
    let validatedFormData: ConsentFormData;

    try {
        validatedFormData = await parseFormData(c, ConsentFormSchema);
        const cookieCsrf = cookieData.csrfToken;
        if (validatedFormData.csrf !== cookieCsrf) {
            clearAuthCookie(c, tx);
            return c.text("Forbidden", 403);
        }
        console.log(
            "[POST /auth/authorize] Validated form data:",
            JSON.stringify(validatedFormData, null, 2),
        );
    } catch (error) {
        if (error instanceof FormValidationError) {
            console.error("[POST /auth/authorize] Form validation failed:", error.issues);
            return c.text(`Bad Request: ${error.message}`, 400);
        }
        console.error("[POST /auth/authorize] Error processing form data:", error);
        return c.text("Internal Server Error: Failed to process request form.", 500);
    }
    const oauthReq: AuthRequest = cookieData.oauthReq;
    // Execute action based on form data
    if (validatedFormData.action === "deny") {
        const oauthReq: AuthRequest = cookieData.oauthReq;
        const {redirectUri, state} = oauthReq;
        console.log("[POST /auth/authorize] User denied the request via form.");
        const redirectUrl = new URL(redirectUri);
        redirectUrl.searchParams.set("error", "access_denied"); // Standard error code for denial

        if (state) {
            redirectUrl.searchParams.set("state", state);
        }

        const finalRedirectUrl = redirectUrl.toString();
        console.log(`[POST /auth/authorize] Redirecting denial to: ${finalRedirectUrl}`);

        // 3. Perform the redirect
        return c.redirect(finalRedirectUrl, 302);
    }

    // At this time user should be authenticated and we have a valid session
    let session: Session | null;
    try {
        session = await authFlowService.getUserSession(c);
    } catch (error) {
        console.error("[POST /auth/authorize] Failed to retrieve user session:", error);
        return c.text("Internal Server Error: Failed to retrieve user session.", 500);
    }
    if (!session) {
        console.error("[POST /auth/authorize] Failed to retrieve user session.");
        return c.text("Internal Server Error: Failed to retrieve user session.", 500);
    }

    try {
        console.log(`[POST /auth/authorize] Completing authorization for user ${user.id}.`);
        const {redirectTo} = await c.env.OAUTH_PROVIDER.completeAuthorization({
            request: oauthReq,
            userId: user.id,
            metadata: {email: user.email},
            scope: oauthReq.scope, // Pass the parsed scope array
            props: {userId: user.id, email: user.email, accessToken: session.access_token},
        });

        console.log(`[POST /auth/authorize] Redirecting approval to: ${redirectTo}`);
        clearAuthCookie(c, tx);
        return c.redirect(redirectTo, 302);
    } catch (error) {
        console.error("[POST /auth/authorize] Error during completeAuthorization:", error);
        clearAuthCookie(c, tx);

        // Attempt to redirect with error, using details from the cookie's oauthReq
        const {redirectUri, state} = oauthReq;
        if (redirectUri) {
            try {
                const errorRedirectUrl = new URL(redirectUri);
                errorRedirectUrl.searchParams.set("error", "server_error");
                if (state) errorRedirectUrl.searchParams.set("state", state);
                return c.redirect(errorRedirectUrl.toString(), 302);
            } catch (e) {
            }
        }
        // Fallback generic error page
        return c.html("<h1>Server Error</h1><p>Could not complete authorization.</p>", 500);
    }
});

authRoutes.get('/callback', async c => {
    const supabase = c.get('supabaseClient');
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
        return c.redirect(`/auth/authorize?tx=${tx}`, 302);
    } catch (exchangeError) {
        console.error(`[GET /auth/callback] Unexpected error: ${exchangeError}`);
        return c.text("Internal Server Error: Failed to process authentication callback.", 500);
    }
});

authRoutes.post('/login', async c => {
    const supabase = c.get('supabaseClient');
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
    const redirectURL = `${siteUrl}/auth/callback?tx=${tx}`;

    // Determine which login method to use based on form data
    if (formData.provider === LoginProvider.GITHUB) {
        console.log("[POST /login] Processing GitHub login with redirect URL:", redirectURL);
        const {data, error} = await supabase.auth.signInWithOAuth({
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

        const {data, error} = await supabase.auth.signInWithOAuth({
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
        const {error} = await supabase.auth.signInWithOtp({
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
        // TODO: route should manage the layout interanlly

        const content = await renderMagicLinkSentScreen({email});
        return c.html(base(content, "Check your email"));
    }

    console.error("[POST /login] No valid login method identified");
    return c.text("Invalid login request. Please provide a valid login method.", 400);
});

authRoutes.get('/logout', async c => {
    const supabase = c.get('supabaseClient');
    console.log("[GET /logout] Logging out user...");
    await supabase.auth.signOut();
    console.log("[GET /logout] User logged out.");
    return c.redirect('/auth/authorize');
});

export default authRoutes;