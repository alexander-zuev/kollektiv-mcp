import {McpAgent} from "agents/mcp"
import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js"
import {allTools} from '@/mcp/tools'

// need to import tools object

export class MyMCP extends McpAgent {
    server = new McpServer({
        name: "Kollektiv MCP",
        version: "0.1.0",
    });

    // a stub for now - will be updated
    async init(): Promise<void> {
        console.log("Initializing MCP server...")
        for (const tool of allTools) {
            console.log("Registering tool: " + tool.name)
            this.server.tool(tool.name, tool.schema, tool.handler)
        }
    }
}