import app from "@/web/app";
import OAuthProvider from "@cloudflare/workers-oauth-provider";
import {KollektivMCP} from "@/mcp/server";

export {KollektivMCP};


// Export the OAuth handler as the default
export default new OAuthProvider({
    apiRoute: "/sse",
    // @ts-ignore
    apiHandler: KollektivMCP.mount("/sse"),
    // @ts-ignore
    defaultHandler: app,
    authorizeEndpoint: "/authorize",
    tokenEndpoint: "/token",
    clientRegistrationEndpoint: "/register",
});