import { queryTool } from "@/mcp/tools/queryTool";
import type { MCPTool } from "@/mcp/tools/types";

export const allTools: MCPTool<any>[] = [
	queryTool,
	// Add other imported tools here
];
