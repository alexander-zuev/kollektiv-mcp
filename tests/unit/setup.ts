import {beforeEach, vi} from "vitest";
import {mockSignInWithOAuthSuccess, testSession, testUser} from "@tests/mocks";
import {createMockContext} from "@tests/mocks";

// Extend Vitest's TestContext so TypeScript knows there is a `c`
declare module "vitest" {
    interface TestContext {
        c: ReturnType<typeof createMockContext>;
    }
}

// Shared Supabase-like instance
const mockSupabase = {
    auth: {
        signInWithOAuth: vi.fn(),
        signInWithOtp: vi.fn(),
        exchangeCodeForSession: vi.fn(),
        getUser: vi.fn(),
        refreshSession: vi.fn(),
        getSession: vi.fn(),
        signOut: vi.fn(),
    }
}

vi.mock("@/web/middleware/supabase", () => {
    console.log("Mocking @/web/middleware/supabase globally...");
    return {
        getSupabase: vi.fn(() => mockSupabase),
        supabaseMiddleware: vi.fn(),
    };
})

vi.mock("agents/mcp", () => ({
    // A minimal base class KollektivMCP can extend
    McpAgent: class {
    },
}));

const mockMcpServer = vi.fn().mockImplementation((_opts) => ({
    tool: vi.fn(),
}));

vi.mock("@modelcontextprotocol/sdk/server/mcp.js", () => ({
    McpServer: mockMcpServer,
}));

// Ensure each test gets its own fresh mock Hono Context in `ctx.c`
beforeEach((ctx) => {
    ctx.c = createMockContext();
});