import type { ToolDefinitionSchema } from "@/mcp/tools/types";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import { type ZodRawShape, z } from "zod";

// Schema
const toolSchema = {
	query: z.string().min(1),
} satisfies ZodRawShape;

const toolhandler: ToolCallback<typeof toolSchema> = async ({ query: string }, extra) => {
	return {
		content: [{ type: "text", text: "Hello World" }],
	};
};

export const anotherTool: ToolDefinitionSchema<typeof toolSchema> = {
	name: "yet_another_tool",
	description: "There are many tools, this is just another one",
	paramsSchema: toolSchema,
	handler: toolhandler,
};
