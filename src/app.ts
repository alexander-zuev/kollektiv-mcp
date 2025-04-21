import {Hono} from "hono";
import {
    layout,
    homeContent,
    parseApproveFormBody,
    renderAuthorizationRejectedContent,
    renderAuthorizationApprovedContent,
    renderLoggedOutAuthorizeScreen,
    renderLoginScreen
} from "./utils";
import type {OAuthHelpers} from "@cloudflare/workers-oauth-provider";
import {createServerClient, parseCookieHeader, type CookieOptions} from '@supabase/ssr';
import {SupabaseClient} from '@supabase/supabase-js'
import type {Context, MiddlewareHandler} from 'hono'
import {env} from 'hono/adapter'
import {getCookie, setCookie} from 'hono/cookie';


declare module 'hono' {
    interface ContextVariableMap {
        supabase: SupabaseClient;
    }
}

export const getSupabase = (c: Context) => {
    return c.get('supabase')
}


type SupabaseEnv = {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
}
// Define Hono's CookieOptions type alias for clarity if needed (optional)
type HonoCookieOptions = Parameters<typeof setCookie>[3];


export const supabaseMiddleware = (): MiddlewareHandler => {
    return async (c, next) => {
        console.log(`[Middleware] Running for path: ${c.req.path}`);
        // Extract necessary env vars for simplicity
        const supabaseEnv = env<SupabaseEnv>(c)
        const supabaseUrl = supabaseEnv.SUPABASE_URL
        const supabaseAnonKey = supabaseEnv.SUPABASE_ANON_KEY

        // Check each variable separately
        if (!supabaseUrl) {
            console.error("[Middleware] SUPABASE_URL is not set!");
            throw new Error("SUPABASE_URL environment variable is not set!");
        }
        if (!supabaseAnonKey) {
            console.error("[Middleware] SUPABASE_ANON_KEY is not set!");
            throw new Error("SUPABASE_ANON_KEY environment variable is not set!");
        }

        // Create server client


        const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
            cookies: {
                getAll() {
                    console.log("[Middleware] getAll cookies invoked.");
                    const cookies = parseCookieHeader(c.req.header('Cookie') ?? '');
                    // Explicitly map to the expected { name: string, value: string } structure
                    const cookieArray = Object.entries(cookies).map(([name, value]) => {
                        // Ensure value is treated as a string
                        return {name: name, value: String(value ?? '')};
                    });
                    console.log(`[Middleware] Found ${cookieArray.length} cookies.`);
                    // Return the array (or null if empty, though an empty array is often fine)
                    return cookieArray.length > 0 ? cookieArray : null;
                },
                setAll(cookiesToSet) {
                    console.log(`[Middleware] setAll cookies invoked with ${cookiesToSet.length} cookies.`);
                    try {
                        // Hono's setCookie is synchronous and expects compatible options
                        cookiesToSet.forEach(({name, value, options}) => {
                            console.log(`[Middleware] Setting cookie: ${name}`);
                            // Ensure options match Hono's expected type (it should, as both derive from cookie.SerializeOptions)
                            setCookie(c, name, value, options as HonoCookieOptions);
                        });
                    } catch (error) {
                        console.error("[Middleware] Error setting cookies:", error);
                    }
                },
            },
        })
        // Set client instance to the context's 'supabase' we defined earlier
        c.set('supabase', supabase)
        console.log("[Middleware] Supabase client created and set in context.");

        // Handle the next request
        await next()
        console.log(`[Middleware] Finished handling path: ${c.req.path}`);
    }
}


export type Bindings = Env & {
    OAUTH_PROVIDER: OAuthHelpers;
};

type RenderLoginScreenProps = {
    clientInfo: {
        clientName: string;
    };
}


type ConsentScreenProps = {
    oauthReq: {
        clientId: string;
        state: string;
        codeChallenge: string;
        codeChallengeMethod: string;
    };
    clientInfo: {
        clientName: string;
    };
    user: {
        email: string;
    };
};

export const renderConsentScreen = ({oauthReq, clientInfo, user}: ConsentScreenProps): string => {
    return `
        <h2>Hi, ${user.email}</h2>
        <p><b>${clientInfo.clientName}</b> wants to access your account.</p>
    
        <form method="POST" action="/authorize">
          <input type="hidden" name="client_id" value="${oauthReq.clientId}" />
          <input type="hidden" name="state" value="${oauthReq.state}" />
          <input type="hidden" name="code_challenge" value="${oauthReq.codeChallenge}" />
          <input type="hidden" name="code_challenge_method" value="${oauthReq.codeChallengeMethod}" />
          <button type="submit">Authorize</button>
        </form>
      `;
};

const app = new Hono<{
    Bindings: Bindings;
}>();

// Register middleware
app.use('*', async (c, next) => {
    console.log(`[Router] Request received for ${c.req.method} ${c.req.path}`);
    if (c.req.path.startsWith('/sse')) {
        console.log(`[Router] Skipping Supabase middleware for ${c.req.path}`);
        return await next(); // skip Supabase for /sse
    }
    await supabaseMiddleware()(c, next); // apply it for others
});

// Render a basic homepage placeholder to make sure the app is up
app.get("/", async (c) => {
    console.log("[GET /] Handling request.");
    const content = await homeContent(c.req.raw);
    return c.html(layout(content, "MCP Remote Auth Demo - Home"));
});

// Render an authorization page
// If the user is logged in, we'll show a form to approve the appropriate scopes
// If the user is not logged in, we'll show a form to both login and approve the scopes
app.get("/authorize", async (c) => {
    console.log("[GET /authorize] Handling request.");
    const supabase = getSupabase(c);
    console.log("[GET /authorize] Getting session...");
    const {data: {session}, error: sessionError} = await supabase.auth.getSession();

    if (sessionError) {
        console.error("[GET /authorize] Error getting session:", sessionError.message);
        return c.text("Error checking authentication status", 500);
    }

    console.log("[GET /authorize] Parsing OAuth request...");
    const oauthReq = await c.env.OAUTH_PROVIDER.parseAuthRequest(c.req.raw);
    console.log(`[GET /authorize] Looking up client: ${oauthReq.clientId}`);
    const clientInfo = await c.env.OAUTH_PROVIDER.lookupClient(oauthReq.clientId);


    if (!session) {
        console.log("[GET /authorize] No session found. Rendering login screen.");
        // User not logged in → render login screen
        const content = await renderLoginScreen({clientInfo});
        return c.html(layout(content, "Log in to authorize"));
    }

    // User is logged in → show consent screen
    const user = session.user;
    console.log(`[GET /authorize] Session found for user ${user.id}. Rendering consent screen.`);
    const content = await renderConsentScreen({oauthReq, clientInfo, user});
    return c.html(layout(content, "Authorize access"));
});

app.post("/authorize", async (c) => {
    console.log("[POST /authorize] Handling request.");
    const supabase = getSupabase(c);
    console.log("[POST /authorize] Getting session...");
    const {data: {session}, error: sessionError} = await supabase.auth.getSession();

    if (sessionError) {
        console.error("[POST /authorize] Error getting session:", sessionError.message);
        return c.text("Error checking authentication status", 500);
    }

    if (!session) {
        console.log("[POST /authorize] No session found. Returning 401 Unauthorized.");
        return c.text("Unauthorized", 401);
    }

    console.log(`[POST /authorize] Session found for user ${session.user.id}. Parsing OAuth request.`);
    const oauthReq = await c.env.OAUTH_PROVIDER.parseAuthRequest(c.req.raw);
    const user = session.user;

    console.log(`[POST /authorize] Completing authorization for user ${user.id}.`);
    const {redirectTo} = await c.env.OAUTH_PROVIDER.completeAuthorization({
        request: oauthReq,
        userId: user.id,
        metadata: {email: user.email},
        scope: oauthReq.scope,
        props: {
            userId: user.id,
            email: user.email,
        },
    });

    console.log(`[POST /authorize] Redirecting to: ${redirectTo}`);
    return c.redirect(redirectTo, 302);
});

// The /authorize page has a form that will POST to /approve
// This endpoint is responsible for validating any login information and
// then completing the authorization request with the OAUTH_PROVIDER
app.post("/approve", async (c) => {
    console.log("[POST /approve] Handling request.");
    const {action, oauthReqInfo, email, password} = await parseApproveFormBody(
        await c.req.parseBody(),
    );
    console.log(`[POST /approve] Action: ${action}, Email: ${email}`);

    if (!oauthReqInfo) {
        console.log("[POST /approve] Invalid OAuth request info. Returning 401.");
        return c.html("INVALID LOGIN", 401);
    }

    // If the user needs to both login and approve, we should validate the login first
    if (action === "login_approve") {
        console.log("[POST /approve] Validating login (demo allows any).");
        // We'll allow any values for email and password for this demo
        // but you could validate them here
        // Ex:
        // if (email !== "user@example.com" || password !== "password") {
        // biome-ignore lint/correctness/noConstantCondition: This is a demo
        if (false) {
            console.log("[POST /approve] Login validation failed (demo condition).");
            return c.html(
                layout(
                    await renderAuthorizationRejectedContent("/"),
                    "MCP Remote Auth Demo - Authorization Status",
                ),
            );
        }
        console.log("[POST /approve] Login validation successful (demo).");
    }

    console.log(`[POST /approve] Completing authorization for user ${email}.`);
    // The user must be successfully logged in and have approved the scopes, so we
    // can complete the authorization request
    const {redirectTo} = await c.env.OAUTH_PROVIDER.completeAuthorization({
        request: oauthReqInfo,
        userId: email, // Using email as userId here, ensure this aligns with your logic
        metadata: {
            label: "Test User",
        },
        scope: oauthReqInfo.scope,
        props: {
            userEmail: email,
        },
    });

    console.log(`[POST /approve] Rendering approved content, will redirect to: ${redirectTo}`);
    return c.html(
        layout(
            await renderAuthorizationApprovedContent(redirectTo),
            "MCP Remote Auth Demo - Authorization Status",
        ),
    );
});
app.get("/auth/callback", async (c: Context) => {
    const supabase = getSupabase(c)
    const code = c.req.query('code');
    const originalUrl = c.req.url;
    console.log(`[GET /auth/callback] Handling request for URL: ${originalUrl}`);
    console.log(`[GET /auth/callback] Code from query: ${code ? 'found' : 'missing'}`);

    if (!code) {
        // no code in the URL and we are in the auth callback - not good
        console.error("[GET /auth/callback] No code found in the callback request from Supabase at", originalUrl)

        return c.text("Authentication Error: Authorization code was missing.", 400);
    }

    // code found
    console.log("[GET /auth/callback] Code found. Exchanging code for session...");

    try {
        // exchange code for a session
        // 'setAll' will be automatically called by the supabase client because of createServerClient setup
        const {error} = await supabase.auth.exchangeCodeForSession(code)

        // Check if the exchange resulted in an error
        if (error) {
            console.error("[GET /auth/callback] Error exchanging code for session:", error.message, "at", originalUrl);
            return c.text(`Authentication Error: ${error.message}`, 400); // Return error response
        }

        // If successful (no error), redirect back to /authorize
        // The cookies containing the session are automatically set by the middleware's setAll
        console.log("[GET /auth/callback] Code exchange successful. Redirecting to /authorize...");
        return c.redirect('/authorize'); // Perform the redirect

    } catch (exchangeError) {
        // Catch unexpected errors during the exchange process itself
        console.error("[GET /auth/callback] Unexpected error during code exchange:", exchangeError);
        return c.text("Internal Server Error: Failed to process authentication callback.", 500);
    }
});
// GitHub login
app.post("/login/github", async (c) => {
    console.log("[POST /login/github] Handling request.");
    const supabase = getSupabase(c);
    const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {redirectTo: "http://localhost:8787/auth/callback"}, // Ensure this matches your Supabase config exactly
    });
    if (error) {
        console.error("[POST /login/github] GitHub login failed:", error.message);
        return c.text("Login failed", 500);
    }
    console.log(`[POST /login/github] Redirecting user to GitHub OAuth URL: ${data.url}`);
    return c.redirect(data.url);
});

// Google login (stub - ensure it's finished if used)
app.post("/login/google", async (c) => {
    console.log("[POST /login/google] Handling request (stub).");
    // Implementation needed here similar to GitHub
    return c.text("Google login not implemented", 501);
});

export default app; // Ensure app is exported if it's the main handler in index.ts default export