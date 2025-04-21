import {queryDocsTool} from "@/mcp/tools/queryDocsTool";
import {MCPTool} from "@/mcp/tools/types";

export const allTools: MCPTool<any>[] = [
    queryDocsTool,
    // Add other imported tools here
];