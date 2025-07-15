import {APP_ROUTES} from "@shared/api/app-routes.ts";
import {Hono} from "hono";
import {authRoutes, statsRoutes} from "@/worker/api/routes";
import type {AppContext} from "@/worker/common/types";

const app = new Hono<AppContext>();

// Add auth routes
app.route('/auth', authRoutes)
// Add file routes

// Add stats routes
app.route(APP_ROUTES.api.prefix, statsRoutes)


// Export app as the default handler
export default app;