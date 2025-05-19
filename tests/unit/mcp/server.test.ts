import { KollektivMCP } from "@/mcp/server";
import { registerListDocumentsTool, registerRagSearchTool } from "@/mcp/tools";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock registration functions so that we can assert later
// If you look at this and cry recalling AsyncMock/MagicMock from pytest you're not alone
vi.mock("@/mcp/tools", () => ({
	registerListDocumentsTool: vi.fn(),
	registerRagSearchTool: vi.fn(),
}));

describe("Basic unit tests for KollektivMCP class, no biggie", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should create a new KollektivMCP instance and register tools", async () => {
		// @ts-ignore
		const mcp = new KollektivMCP();
		await mcp.init();

		// Assert
		expect(McpServer).toBeCalledWith({
			name: "Kollektiv MCP",
			version: "0.1.0",
		});
		expect(mcp.server).toBeDefined();

		// Assert tools were registered
		expect(registerRagSearchTool).toHaveBeenCalledOnce();
		expect(registerListDocumentsTool).toHaveBeenCalledOnce();
	});
});
