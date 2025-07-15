import {createServerClient, parseCookieHeader} from "@supabase/ssr";
import type {MiddlewareHandler} from "hono";
import {setCookie} from "hono/cookie";


export const withSupabaseClient = (): MiddlewareHandler => {
    return async (c, next) => {
        console.log(`[Middleware] Running for path: ${c.req.path}`);

        const supabaseUrl = c.env.SUPABASE_URL;
        const supabaseAnonKey = c.env.SUPABASE_ANON_KEY;
        console.debug("Connected to Supabase at:", supabaseUrl);

        // Check each variable separately
        if (!supabaseUrl) {
            console.error("[Middleware] SUPABASE_URL is not set!");
            throw new Error("SUPABASE_URL environment variable is not set!");
        }
        if (!supabaseAnonKey) {
            console.error("[Middleware] SUPABASE_ANON_KEY is not set!");
            throw new Error("SUPABASE_ANON_KEY environment variable is not set!");
        }

        // Create server http-client
        const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
            cookies: {
                getAll() {
                    console.log("[Middleware] getAll cookies invoked.");
                    // return parseCookieHeader(c.req.header('Cookie') ?? '')
                    const cookies = parseCookieHeader(c.req.header("Cookie") ?? "");
                    // Ensure each cookie value is a string (not undefined)
                    return cookies.map(({name, value}) => ({
                        name,
                        value: value ?? "", // Convert undefined to empty string
                    }));
                },
                setAll(cookiesToSet) {
                    console.log(`[Middleware] setAll cookies invoked with ${cookiesToSet.length} cookies.`);
                    try {
                        for (const {name, value, options} of cookiesToSet) {
                            console.log(`[Middleware] Setting cookie: ${name}`);
                            setCookie(c, name, value, options as any);
                        }
                    } catch (error) {
                        console.error("[Middleware] Error setting cookies:", error);
                    }
                },
            },
        });
        // Set http-client instance to the context's 'supabase' we defined earlier
        c.set("supabase", supabase);
        console.log("[Middleware] Supabase client created and set in context.");

        // Handle the next request
        await next();
        console.log(`[Middleware] Finished handling path: ${c.req.path}`);
    };
};