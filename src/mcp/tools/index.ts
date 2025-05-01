import { listDocumentsTool } from "@/mcp/tools/listDocumentsTool";
import { queryDocumentsTool } from "@/mcp/tools/queryDocumentsTool";

export const allTools = [queryDocumentsTool, listDocumentsTool] as const; // <- keeps type info
