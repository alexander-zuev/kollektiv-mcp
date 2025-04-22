import {Context} from "hono";
import {AppRoutes} from "@/web/routes";
import {getSupabase} from "@/web/middleware/supabase";

export const logoutHandler = (c: Context) => {
    const supabase = getSupabase(c);
    console.log("[GET /logout] Logging out user...");
    supabase.auth.signOut();
    console.log("[GET /logout] User logged out.");
    return c.redirect(AppRoutes.AUTHORIZE);
}