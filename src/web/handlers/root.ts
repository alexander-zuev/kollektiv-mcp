import { layout } from "@/web/templates/baseLayout";
import { homeContent } from "@/web/templates/root";
import type { Context } from "hono";

export const rootHandler = async (c: Context) => {
	console.log("[GET /] Handling request.");
	const content = await homeContent(c.req.raw);
	return c.html(layout(content, "MCP Remote Auth Demo - Home"));
};
