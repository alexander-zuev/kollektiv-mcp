import { queryDocumentsTool } from "@/mcp/tools/queryDocumentsTool";

export const allTools = [queryDocumentsTool] as const; // <- keeps type info
