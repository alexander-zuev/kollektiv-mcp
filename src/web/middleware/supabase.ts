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