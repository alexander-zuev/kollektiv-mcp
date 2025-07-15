import {OAuthProvider} from "@cloudflare/workers-oauth-provider";
import app from "@/worker/api/app";
import {KollektivMCP} from "@/worker/mcp/server";

export {KollektivMCP};

// Export the OAuth handler as the default
// Type assertions needed due to library compatibility issues with @cloudflare/workers-types versions
export default {
    fetch: new OAuthProvider({
        apiHandlers: {
            "/sse": KollektivMCP.serveSSE("/sse") as any, // Oauth provider handles /sse route
            "/mcp": KollektivMCP.serve("/mcp") as any, // Oauth provider handles /mcp route
        },
        defaultHandler: app as any, // Hono handles all other unmatched routes

        // OAuth endpoints handled by OAuthProvider itself
        authorizeEndpoint: "/auth/authorize",
        tokenEndpoint: "/auth/token",
        clientRegistrationEndpoint: "/auth/register",
    }),
    async queue(batch: MessageBatch, env: Env): Promise<void> {
        // implement queue based indexing to improve performance
    },
    async scheduled(controller: ScheduledController, env: Env, _ctx: ExecutionContext) {
        // feedback queue trigger that puts a message to the queue
        // potentially re-sync queue or sync queue?

    }
}