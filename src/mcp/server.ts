import { allTools } from "@/mcp/tools";
import type { AuthContext } from "@/mcp/tools/types";
import type {
	RequestHandlerExtra,
	ServerNotification,
	ServerRequest,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";

export interface ExtraWithAuth extends RequestHandlerExtra<ServerRequest, ServerNotification> {
	authContext: AuthContext;
}

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
				return tool.handler(params, extra, this.props);
			});

			this.server.tool("test_tool", "testing_extra", {}, (params, extra) => {
				// Inject this.props into extra dynamically
				(extra as any).authContext = this.props; // 🔥 Add your props

				console.debug("Debugging extra:", JSON.stringify(extra, null, 2));

				return {
					content: [{ type: "text", text: "Check console!" }],
				};
			});
		}
	}
}
