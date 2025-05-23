import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Context, MiddlewareHandler } from "hono";
import { env } from "hono/adapter";
import { setCookie } from "hono/cookie";

declare module "hono" {
	interface ContextVariableMap {
		supabase: SupabaseClient;
	}
}

export const getSupabase = (c: Context) => {
	return c.get("supabase");
};

type SupabaseEnv = {
	SUPABASE_URL: string;
	SUPABASE_ANON_KEY: string;
};
// Define Hono's CookieOptions type alias for clarity if needed (optional)
type HonoCookieOptions = Parameters<typeof setCookie>[3];

export const supabaseMiddleware = (): MiddlewareHandler => {
	return async (c, next) => {
		console.log(`[Middleware] Running for path: ${c.req.path}`);
		// Extract necessary env vars for simplicity
		const supabaseEnv = env<SupabaseEnv>(c);
		const supabaseUrl = supabaseEnv.SUPABASE_URL;
		const supabaseAnonKey = supabaseEnv.SUPABASE_ANON_KEY;
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

		// Create server client
		const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
			cookies: {
				getAll() {
					console.log("[Middleware] getAll cookies invoked.");
					// return parseCookieHeader(c.req.header('Cookie') ?? '')
					const cookies = parseCookieHeader(c.req.header("Cookie") ?? "");
					// Ensure each cookie value is a string (not undefined)
					return cookies.map(({ name, value }) => ({
						name,
						value: value ?? "", // Convert undefined to empty string
					}));
				},
				setAll(cookiesToSet) {
					console.log(`[Middleware] setAll cookies invoked with ${cookiesToSet.length} cookies.`);
					try {
						for (const { name, value, options } of cookiesToSet) {
							console.log(`[Middleware] Setting cookie: ${name}`);
							// Ensure options match Hono's expected type (it should, as both derive from cookie.SerializeOptions)
							// Pass the destructured name, value, and options to setCookie
							setCookie(c, name, value, options as HonoCookieOptions);
						}
					} catch (error) {
						console.error("[Middleware] Error setting cookies:", error);
					}
				},
			},
		});
		// Set client instance to the context's 'supabase' we defined earlier
		c.set("supabase", supabase);
		console.log("[Middleware] Supabase client created and set in context.");

		// Handle the next request
		await next();
		console.log(`[Middleware] Finished handling path: ${c.req.path}`);
	};
};
