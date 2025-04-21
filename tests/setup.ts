import {vi} from 'vitest';

// Mock global fetch
global.fetch = vi.fn();

// Mock Cloudflare environment
vi.mock('hono/adapter', () => ({
    env: vi.fn().mockImplementation((c) => ({
        OAUTH_KV: {
            get: vi.fn(),
            put: vi.fn(),
            delete: vi.fn(),
        },
        // Add other environment variables as needed
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_KEY: 'test-key',
    })),
}));

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
    createClient: vi.fn().mockReturnValue({
        auth: {
            signInWithPassword: vi.fn().mockResolvedValue({
                data: {user: {id: 'test-user-id', email: 'test@example.com'}},
                error: null,
            }),
            signOut: vi.fn().mockResolvedValue({error: null}),
        },
    }),
}));

// Mock OAuth provider
vi.mock('@cloudflare/workers-oauth-provider', () => ({
    default: vi.fn().mockImplementation((config) => ({
        fetch: vi.fn(),
        ...config,
    })),
}));

// Mock MCP SDK
vi.mock('@modelcontextprotocol/sdk/server/mcp.js', () => ({
    McpServer: vi.fn().mockImplementation(() => ({
        tool: vi.fn(),
        listTools: vi.fn().mockReturnValue([]),
        getToolHandler: vi.fn(),
        executeTool: vi.fn(),
    })),
}));

// // Reset mocks before each test
// beforeEach(() => {
//   vi.resetAllMocks();
// });