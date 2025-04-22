import {McpAgent} from "agents/mcp"
import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js"
import {allTools} from '@/mcp/tools'


export class KollektivMCP extends McpAgent {
    // Create a new MCP server instance
    server = new McpServer({
        name: "Kollektiv MCP",
        version: "0.1.0",
    });

    // Register all tools
    async init(): Promise<void> {
        console.log("Initializing MCP server...")
        for (const tool of allTools) {
            console.log("Registering tool: " + tool.name)
            this.server.tool(tool.name, tool.schema, tool.handler)
        }
    }
}