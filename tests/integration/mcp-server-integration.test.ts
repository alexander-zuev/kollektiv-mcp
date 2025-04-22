import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import {KollektivMCP} from '@/mcp/server';
import {allTools} from '@/mcp/tools';

describe('MCP Server Integration', () => {
    let mcpServer: KollektivMCP;

    beforeEach(async () => {
        // Mock console.log to avoid noise in test output
        vi.spyOn(console, 'log').mockImplementation(() => {
        });

        mcpServer = new KollektivMCP();
        await mcpServer.init();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should register all tools correctly', () => {
        // Access the server's tools (this might need adjustment based on actual implementation)
        const registeredTools = mcpServer.server.listTools();

        // Verify all tools are registered
        expect(registeredTools.length).toBe(allTools.length);

        // Verify each tool is registered with correct name
        for (const tool of allTools) {
            const registeredTool = registeredTools.find(t => t.name === tool.name);
            expect(registeredTool).toBeDefined();
        }
    });

    it('should handle tool execution', async () => {
        // Mock the tool handler to avoid actual API calls
        const mockHandler = vi.fn().mockResolvedValue({
            content: [{type: 'text', text: 'Mock response'}]
        });

        // Replace the actual handler with the mock
        // Note: This assumes the server has a method to get and set tool handlers
        // You might need to adjust this based on the actual implementation
        const toolName = 'queryDocs';
        const originalHandler = mcpServer.server.getToolHandler(toolName);
        mcpServer.server.tool(toolName, allTools[0].schema, mockHandler);

        // Execute the tool
        const result = await mcpServer.server.executeTool(toolName, {query: 'test'});

        // Verify the mock was called with correct parameters
        expect(mockHandler).toHaveBeenCalledWith({query: 'test'});

        // Verify the result is as expected
        expect(result).toEqual({
            content: [{type: 'text', text: 'Mock response'}]
        });

        // Restore the original handler
        if (originalHandler) {
            mcpServer.server.tool(toolName, allTools[0].schema, originalHandler);
        }
    });

    it('should handle errors during tool execution', async () => {
        // Mock the tool handler to throw an error
        const mockHandler = vi.fn().mockRejectedValue(new Error('Test error'));

        // Replace the actual handler with the mock
        const toolName = 'queryDocs';
        const originalHandler = mcpServer.server.getToolHandler(toolName);
        mcpServer.server.tool(toolName, allTools[0].schema, mockHandler);

        // Execute the tool and expect it to throw
        await expect(
            mcpServer.server.executeTool(toolName, {query: 'test'})
        ).rejects.toThrow('Test error');

        // Verify the mock was called
        expect(mockHandler).toHaveBeenCalled();

        // Restore the original handler
        if (originalHandler) {
            mcpServer.server.tool(toolName, allTools[0].schema, originalHandler);
        }
    });
});