import { base } from "@/web/templates/base";
import { renderHomePage } from "@/web/templates/root";
import type { Context } from "hono";

export const rootHandler = async (c: Context) => {
	console.log("[GET /] Handling request.");
	const content = await renderHomePage();
	return c.html(base(content, "MCP Remote Auth Demo - Home"));
};
