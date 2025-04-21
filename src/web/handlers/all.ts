import {supabaseMiddleware} from "@/web/middleware/supabase";
import {Context, Next} from "hono";

export const allRoutesHandler = async (c: Context, next: Next) => {
    console.log(`[Router] Request received for ${c.req.method} ${c.req.path}`);
    if (c.req.path.startsWith('/sse')) {
        console.log(`[Router] Skipping Supabase middleware for ${c.req.path}`);
        return await next(); // skip Supabase for /sse
    }
    await supabaseMiddleware()(c, next); // apply it for others
}