import type {Context} from "hono";
import {getSupabase} from "@/web/middleware/supabase";

export const authCallbackHandler = async (c: Context) => {
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
};