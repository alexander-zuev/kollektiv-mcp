import app from "./app";
import {McpAgent} from "agents/mcp";
import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {z} from "zod";
import OAuthProvider from "@cloudflare/workers-oauth-provider";
import {MyMCP} from "@/mcp/server";


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