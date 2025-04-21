import {getSupabase} from "@/web/middleware/supabase";
import {layout, renderLoginScreen} from "@/web/utils";
import {renderConsentScreen} from "@/web/templates/consent";

export const getAuthorizeHandler = async (c) => {
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
};


export const postAuthorizeHandler = async (c) => {
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
};