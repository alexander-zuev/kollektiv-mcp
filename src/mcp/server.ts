import { allTools } from "@/mcp/tools";
import type { AuthContext } from "@/mcp/tools/types";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";

export class KollektivMCP extends McpAgent<Env, unknown, AuthContext> {
	// Create a new MCP server instance
	server = new McpServer({
		name: "Kollektiv MCP",
		version: "0.1.0",
	});

	// Register all tools
	async init() {
		console.log("Initializing MCP server...");

		for (const tool of allTools) {
			console.log(`Registering tool: ${tool.name}`);

			this.server.tool(tool.name, tool.description, tool.paramsSchema, (params, extra) => {
				// @ts-ignore because I couldn't find a better way to pass props
				return tool.handler(params, extra, this.props);
			});
		}
	}
}
