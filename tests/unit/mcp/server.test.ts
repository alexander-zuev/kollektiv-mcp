import { KollektivMCP } from "@/mcp/server";
import { allTools } from "@/mcp/tools";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { describe, expect, it, vi } from "vitest";

// Mock the McpAgent class
vi.mock("agents/mcp", () => ({
	McpAgent: class MockMcpAgent {
		props: any;

		constructor() {
			this.props = {};
		}
	},
}));

// Mock the McpServer class
vi.mock("@modelcontextprotocol/sdk/server/mcp.js", () => ({
	McpServer: vi.fn().mockImplementation(() => ({
		tool: vi.fn(),
	})),
}));

// Mock the allTools array
vi.mock("@/mcp/tools", () => ({
	allTools: [
		{
			name: "mockTool1",
			description: "Mock tool 1 description",
			paramsSchema: { param1: "string" },
			handler: vi.fn(),
		},
		{
			name: "mockTool2",
			description: "Mock tool 2 description",
			paramsSchema: { param2: "number" },
			handler: vi.fn(),
		},
	],
}));

describe("KollektivMCP", () => {
	it("should create a new MCP server instance", () => {
		// Arrange & Act
		// @ts-ignore
		const mcp = new KollektivMCP();

		// Assert
		expect(McpServer).toHaveBeenCalledWith({
			name: "Kollektiv MCP",
			version: "0.1.0",
		});
		expect(mcp.server).toBeDefined();
	});

	it("should register all tools during initialization", async () => {
		// Arrange
		// @ts-ignore
		const mcp = new KollektivMCP();
		const toolSpy = vi.spyOn(mcp.server, "tool");

		// Act
		await mcp.init();

		// Assert
		// Check that tool() was called for each tool in allTools
		expect(toolSpy).toHaveBeenCalledTimes(allTools.length);

		// Check that tool() was called with the correct arguments for each tool
		for (const tool of allTools) {
			expect(toolSpy).toHaveBeenCalledWith(
				tool.name,
				tool.description,
				tool.paramsSchema,
				expect.any(Function),
			);
		}
	});

	it("should pass authContext to tool handlers", async () => {
		// Arrange
		// @ts-ignore
		const mcp = new KollektivMCP();
		const authContext = { userId: "test-user-id" };
		mcp.props = authContext;

		// Define a more specific type for the handler function
		type ToolHandler = (params: Record<string, unknown>, extra: Record<string, unknown>) => unknown;

		// Mock the first tool's handler to verify it receives the authContext
		const mockToolHandler = vi.fn().mockReturnValue({
			content: [{ type: "text", text: "Mock response" }],
		});

		// Replace the first tool's handler with our mock
		const originalHandler = allTools[0].handler;
		allTools[0].handler = mockToolHandler;

		// Act
		await mcp.init();

		// Assert
		// Verify the tool was registered
		expect(mockToolHandler).not.toHaveBeenCalled(); // Handler isn't called during registration

		// Simulate calling the handler through the server
		// Get the handler function that was registered
		const registeredHandler = vi.mocked(mcp.server.tool).mock.calls[0][3] as ToolHandler;

		// Call the handler with test parameters
		const params = { test: "params" };
		const extra = {};
		registeredHandler(params, extra);

		// Verify our mock handler was called with the correct arguments
		expect(mockToolHandler).toHaveBeenCalledWith(params, extra, authContext);

		// Restore the original handler
		allTools[0].handler = originalHandler;
	});
});
