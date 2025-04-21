import app from "./web/app";
import OAuthProvider from "@cloudflare/workers-oauth-provider";
import {MyMCP} from "@/mcp/server";


export {MyMCP};


// Export the OAuth handler as the default
export default new OAuthProvider({
    apiRoute: "/sse",
    // @ts-ignore
    apiHandler: MyMCP.mount("/sse"),
    // @ts-ignore
    defaultHandler: app,
    authorizeEndpoint: "/authorize",
    tokenEndpoint: "/token",
    clientRegistrationEndpoint: "/register",
});