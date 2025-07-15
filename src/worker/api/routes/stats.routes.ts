import {APP_ROUTES} from "@shared/api/app-routes.ts";
import {Hono} from "hono";
import type {AppContext} from "@/worker/common/types";

const statsRoutes = new Hono<AppContext>()

// Need JWT middleware or transition to Better Auth (probably not right now to not hang me here)
// withUserFromJWT (that raises, since it's required)???
// withSupabase


statsRoutes.get(APP_ROUTES.api.paths.stats,
    async c => {
        // get supabase client with a JWT set for the current user from Hyperdrive
        // retrieve stats for the user using query_stats_view and user_id filter
        // return UserStatsResponse
        // Try catch DatabaseError and ValidationError?
        return c.json({
            success: true,
            message: "all good"
        })
    })

export default statsRoutes;