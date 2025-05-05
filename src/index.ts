import { env } from "cloudflare:workers";
import { KollektivMCP } from "@/mcp/server";
import app from "@/web/app";
import OAuthProvider from "@cloudflare/workers-oauth-provider";

export { KollektivMCP };

// Export the OAuth handler as the default
export default new OAuthProvider({
	apiRoute: "/sse",
	// @ts-ignore
	apiHandler: KollektivMCP.mount("/sse"),
	// @ts-ignore
	defaultHandler: app,
	authorizeEndpoint: `${env.SITE_URL}/authorize`,
	tokenEndpoint: `${env.SITE_URL}/token`,
	clientRegistrationEndpoint: `${env.SITE_URL}/register`,
});
