import { KollektivMCP } from "@/mcp/server";
import app from "@/web/app";
import OAuthProvider from "@cloudflare/workers-oauth-provider";

export { KollektivMCP };

// Export the OAuth handler as the default
// TODO: once auth support is stable - right now it's more pain in the buttocks then it's worth
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

// export default {
//     fetch(request: Request, env: Env, ctx: ExecutionContext) {
//         const url = new URL(request.url);
//
//         if (url.pathname === "/sse" || url.pathname === "/sse/message") {
//             // @ts-ignore
//             return KollektivMCP.serveSSE("/sse").fetch(request, env, ctx);
//         }
//
//         if (url.pathname === "/mcp") {
//             // @ts-ignore
//             return KollektivMCP.serve("/mcp").fetch(request, env, ctx);
//         }
//         // TODO: route to Hono
//
//         return new Response("Not found", {status: 404});
//     },
// };
