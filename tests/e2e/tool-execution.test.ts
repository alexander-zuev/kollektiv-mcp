import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { unstable_dev } from 'wrangler';
import type { UnstableDevWorker } from 'wrangler';

describe('E2E Tool Execution', () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    // Start the worker in development mode
    worker = await unstable_dev('src/index.ts', {
      experimental: { disableExperimentalWarning: true },
      // Add any environment variables needed for testing
      env: {
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_KEY: 'test-key',
      },
    });
  });

  afterAll(async () => {
    // Stop the worker after tests
    await worker.stop();
  });

  it('should authenticate and execute a tool', async () => {
    // Step 1: Authenticate with the server
    // This is a simplified example - in a real test, you might need to:
    // - Create a test user in Supabase
    // - Handle OAuth flow or use a test-specific auth endpoint
    const authResponse = await worker.fetch('/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'password',
        username: 'test@example.com',
        password: 'password',
      }),
    });
    
    expect(authResponse.status).toBe(200);
    const { access_token } = await authResponse.json();
    expect(access_token).toBeDefined();
    
    // Step 2: Connect to SSE endpoint
    // Note: In a real test, you would need a proper SSE client
    // This is a simplified example that just checks if the endpoint is accessible
    const sseResponse = await worker.fetch('/sse', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'text/event-stream',
      },
    });
    
    expect(sseResponse.status).toBe(200);
    
    // Step 3: Execute a tool
    // Note: In a real test with SSE, you would:
    // - Establish an SSE connection
    // - Send a message to execute the tool
    // - Listen for the response events
    // This is a simplified example that uses a direct HTTP request instead
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
    
    expect(toolResponse.status).toBe(200);
    const result = await toolResponse.json();
    expect(result).toHaveProperty('content');
  });

  it('should handle authentication failure', async () => {
    // Test with invalid credentials
    const authResponse = await worker.fetch('/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'password',
        username: 'invalid@example.com',
        password: 'wrong-password',
      }),
    });
    
    expect(authResponse.status).toBe(401);
    
    // Try to access SSE endpoint without authentication
    const sseResponse = await worker.fetch('/sse', {
      headers: {
        Accept: 'text/event-stream',
      },
    });
    
    expect(sseResponse.status).toBe(401);
  });

  it('should handle tool execution errors', async () => {
    // First authenticate
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
    
    // Try to execute a non-existent tool
    const toolResponse = await worker.fetch('/sse', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'execute',
        tool: 'nonExistentTool',
        input: { query: 'test query' },
      }),
    });
    
    expect(toolResponse.status).not.toBe(200);
  });
});