# Test Strategy for Kollektiv MCP

This document outlines the testing strategy for the Kollektiv MCP project, focusing on a test pyramid approach with an emphasis on unit tests.

## Test Pyramid

Our testing strategy follows the test pyramid approach:

```
    /\
   /  \
  /    \
 / E2E  \
/--------\
/          \
/ Integration \
/--------------\
/                \
/     Unit Tests   \
/--------------------\
```

- **Unit Tests (70-80%)**: The foundation of our testing strategy, focusing on testing individual components in isolation.
- **Integration Tests (15-25%)**: Testing how components work together.
- **End-to-End Tests (5-10%)**: Testing the complete application flow.

## Test Directory Structure

```
tests/
├── unit/
│   ├── mcp/
│   │   ├── server.test.ts
│   │   └── tools/
│   │       ├── queryDocsTool.test.ts
│   │       └── listDocsTool.test.ts
│   ├── app/
│   │   ├── auth.test.ts
│   │   └── routes.test.ts
│   └── utils/
│       └── utils.test.ts
├── integration/
│   ├── mcp-server-integration.test.ts
│   ├── auth-flow.test.ts
│   └── tool-registration.test.ts
├── e2e/
│   ├── auth-flow.test.ts
│   └── tool-execution.test.ts
├── mocks/
│   ├── supabase.ts
│   ├── cloudflare-env.ts
│   └── oauth-provider.ts
└── fixtures/
    ├── tool-responses.ts
    └── auth-data.ts
```

## Test Examples

### Unit Test Example (tests/unit/mcp/tools/queryDocsTool.test.ts)

```typescript
import { describe, it, expect, vi } from 'vitest';
import { queryDocsTool } from '@/mcp/tools/queryDocsTool';
import { z } from 'zod';

describe('queryDocsTool', () => {
  it('should have the correct structure', () => {
    expect(queryDocsTool.name).toBe('queryDocs');
    expect(queryDocsTool.description).toBeDefined();
    expect(queryDocsTool.schema).toBeDefined();
    expect(queryDocsTool.handler).toBeInstanceOf(Function);
  });

  it('should validate input correctly', () => {
    const validInput = { query: 'test query' };
    const invalidInput = { query: '' };

    expect(() => queryDocsTool.schema.parse(validInput)).not.toThrow();
    expect(() => queryDocsTool.schema.parse(invalidInput)).toThrow();
  });

  it('should call the backend API and return results', async () => {
    // Mock fetch or API call
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [{ id: '1', title: 'Test Doc' }] }),
    });

    const result = await queryDocsTool.handler({ query: 'test query' });
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        body: expect.any(String),
      })
    );
    
    expect(result).toEqual({
      content: expect.arrayContaining([
        expect.objectContaining({
          type: 'text',
          text: expect.any(String),
        }),
      ]),
    });
  });
});
```

### Integration Test Example (tests/integration/mcp-server-integration.test.ts)

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MyMCP } from '@/mcp/server';
import { allTools } from '@/mcp/tools';

describe('MCP Server Integration', () => {
  let mcpServer: MyMCP;

  beforeEach(async () => {
    mcpServer = new MyMCP();
    await mcpServer.init();
  });

  it('should register all tools correctly', () => {
    const registeredTools = mcpServer.server.listTools();
    
    expect(registeredTools.length).toBe(allTools.length);
    
    for (const tool of allTools) {
      const registeredTool = registeredTools.find(t => t.name === tool.name);
      expect(registeredTool).toBeDefined();
    }
  });

  it('should handle tool execution', async () => {
    // Mock the tool handler to avoid actual API calls
    const mockHandler = vi.fn().mockResolvedValue({
      content: [{ type: 'text', text: 'Mock response' }]
    });
    
    // Replace the actual handler with the mock
    const originalHandler = mcpServer.server.getToolHandler('queryDocs');
    mcpServer.server.tool('queryDocs', allTools[0].schema, mockHandler);
    
    // Execute the tool
    const result = await mcpServer.server.executeTool('queryDocs', { query: 'test' });
    
    expect(mockHandler).toHaveBeenCalledWith({ query: 'test' });
    expect(result).toEqual({
      content: [{ type: 'text', text: 'Mock response' }]
    });
    
    // Restore the original handler
    mcpServer.server.tool('queryDocs', allTools[0].schema, originalHandler);
  });
});
```

### E2E Test Example (tests/e2e/tool-execution.test.ts)

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { unstable_dev } from 'wrangler';
import type { UnstableDevWorker } from 'wrangler';

describe('E2E Tool Execution', () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    worker = await unstable_dev('src/index.ts', {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it('should execute a tool through the MCP server', async () => {
    // Mock authentication
    const authResponse = await worker.fetch('/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'password',
        username: 'test@example.com',
        password: 'password',
      }),
    });
    
    const { access_token } = await authResponse.json();
    
    // Connect to SSE endpoint
    const sseResponse = await worker.fetch('/sse', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'text/event-stream',
      },
    });
    
    expect(sseResponse.status).toBe(200);
    
    // Execute tool (this would need a custom SSE client implementation)
    // For demonstration purposes only
    const toolResponse = await worker.fetch('/sse', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'execute',
        tool: 'queryDocs',
        input: { query: 'test query' },
      }),
    });
    
    const result = await toolResponse.json();
    expect(result).toHaveProperty('content');
  });
});
```

## Testing Guidelines

### General Guidelines

1. **Test Isolation**: Each test should be independent and not rely on the state from other tests.
2. **Mock External Dependencies**: Use mocks for external services, APIs, and databases.
3. **Test Coverage**: Aim for high test coverage, especially for critical paths.
4. **Test Naming**: Use descriptive names that explain what is being tested.

### Unit Testing Guidelines

1. **Focus Areas**:
   - MCP tool schemas and validation
   - MCP tool handlers
   - Utility functions
   - Auth logic
   - Route handlers

2. **Mocking Strategy**:
   - Mock external API calls
   - Mock Cloudflare environment
   - Mock Supabase client
   - Mock OAuth provider

3. **Testing Tools**:
   - Use Vitest for fast, parallel testing
   - Use vi.mock() for mocking dependencies
   - Use vi.spyOn() for spying on function calls

### Integration Testing Guidelines

1. **Focus Areas**:
   - MCP server tool registration
   - Authentication flow
   - API integration with backend services

2. **Testing Approach**:
   - Test how components work together
   - Mock external dependencies but test real interactions between internal components
   - Verify correct data flow between components

### E2E Testing Guidelines

1. **Focus Areas**:
   - Complete authentication flow
   - Tool execution through the MCP server
   - SSE connection and event handling

2. **Testing Approach**:
   - Use wrangler's unstable_dev for testing Cloudflare Workers
   - Test the complete flow from authentication to tool execution
   - Minimize the number of E2E tests, focusing on critical paths

## Recommended Testing Libraries

1. **Vitest**: Fast and feature-rich testing framework compatible with TypeScript
2. **MSW (Mock Service Worker)**: For mocking HTTP requests
3. **@cloudflare/vitest-pool-workers**: For testing Cloudflare Workers
4. **@testing-library/dom**: For testing DOM interactions in auth pages

## CI/CD Integration

1. Add test scripts to package.json:
   ```json
   "scripts": {
     "test": "vitest run",
     "test:watch": "vitest",
     "test:coverage": "vitest run --coverage",
     "test:ui": "vitest --ui"
   }
   ```

2. Configure GitHub Actions to run tests on pull requests and pushes to main branch.

## Conclusion

This testing strategy provides a comprehensive approach to testing the Kollektiv MCP project, with a focus on unit tests as the foundation. By following this strategy, we can ensure the reliability and maintainability of the codebase while minimizing the risk of regressions.