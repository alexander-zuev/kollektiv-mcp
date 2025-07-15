import {KollektivMCP} from "@/worker/mcp/server";
import app from "@/worker/web/app";
import {OAuthProvider} from "@cloudflare/workers-oauth-provider";

export {KollektivMCP};

// Export the OAuth handler as the default
// TODO: mount mcp on the root path
export default new OAuthProvider({
    apiHandlers: {
        "/sse": KollektivMCP.serveSSE("/sse"),
        "/mcp": KollektivMCP.serve("/mcp"),
    },
    // @ts-ignore
    defaultHandler: app,
    authorizeEndpoint: "/authorize",
    tokenEndpoint: "/token",
    clientRegistrationEndpoint: "/register",
});