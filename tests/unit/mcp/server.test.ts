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
    const mcp = new KollektivMCP();
    const toolSpy = vi.spyOn(mcp.server, "tool");

    // Act
    await mcp.init();

    // Assert
    // Check that tool() was called for each tool in allTools
    expect(toolSpy).toHaveBeenCalledTimes(allTools.length + 1); // +1 for test_tool

    // Check that tool() was called with the correct arguments for each tool
    allTools.forEach((tool) => {
      expect(toolSpy).toHaveBeenCalledWith(
        tool.name,
        tool.description,
        tool.paramsSchema,
        expect.any(Function)
      );
    });

    // Check that tool() was called for test_tool
    expect(toolSpy).toHaveBeenCalledWith(
      "test_tool",
      "testing_extra",
      {},
      expect.any(Function)
    );
  });

  it("should pass authContext to tool handlers", async () => {
    // Arrange
    const mcp = new KollektivMCP();
    const authContext = { userId: "test-user-id" };
    mcp.props = authContext;

    // Capture the handler function when tool() is called
    let capturedHandler: Function | null = null;
    vi.spyOn(mcp.server, "tool").mockImplementation((name, description, schema, handler) => {
      if (name === "test_tool") {
        capturedHandler = handler;
      }
      return mcp.server;
    });

    // Act
    await mcp.init();

    // Assert
    expect(capturedHandler).not.toBeNull();

    // Call the captured handler and check that it uses authContext
    const extra = {};
    const result = capturedHandler!({}, extra);

    // Check that authContext was added to extra
    expect((extra as any).authContext).toBe(authContext);

    // Check the result
    expect(result).toEqual({
      content: [{ type: "text", text: "Check console!" }],
    });
  });
});