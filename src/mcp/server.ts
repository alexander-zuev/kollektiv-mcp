import { registerListDocumentsTool, registerRagSearchTool } from "@/mcp/tools";
import type { AuthContext } from "@/mcp/tools/types";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";

// TODO: review if I have to switch to access token (when supporting auth)?
// https://github.com/cloudflare/ai/blob/main/demos/remote-mcp-auth0/mcp-auth0-oidc/src/index.ts
export class KollektivMCP extends McpAgent<Env, unknown, AuthContext> {
	// Create a new MCP server instance
	server = new McpServer({
		name: "Kollektiv MCP",
		version: "0.1.0",
	});

	// Register all tools
	async init() {
		console.log("Initializing MCP server...");

		registerRagSearchTool(this.server, this.props);
		registerListDocumentsTool(this.server, this.props);
	}
}
