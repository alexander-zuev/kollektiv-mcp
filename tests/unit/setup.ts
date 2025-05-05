import { beforeEach, vi } from "vitest";
import { mockSignInWithOAuthSuccess, testSession, testUser } from "../mocks";
import { mockContext } from "../mocks/hono-mocks";

// Extend Vitest's TestContext so TypeScript knows there is a `c`
declare module "vitest" {
	interface TestContext {
		c: ReturnType<typeof mockContext>;
	}
}

vi.mock("@/web/middleware/supabase", () => {
	console.log("Mocking @/web/middleware/supabase globally..."); // Optional: Log to confirm it runs
	// Create mock functions for the methods we know we'll need
	const mockSignInWithOAuth = vi.fn();
	const mockSignInWithOtp = vi.fn();
	const mockExchangeCodeForSession = vi.fn();
	const mockGetUser = vi.fn();

	// Return the structure expected by the getSupabase function
	return {
		getSupabase: vi.fn().mockImplementation(() => ({
			auth: {
				// Assign the specific mock functions
				signInWithOAuth: mockSignInWithOAuth,
				signInWithOtp: mockSignInWithOtp,
				exchangeCodeForSession: mockExchangeCodeForSession,
				getUser: mockGetUser,
				// Add any other auth methods you might call globally here
				// signOut: vi.fn(),
			},
			// Add other Supabase client parts if needed (e.g., functions, storage)
			// functions: { ... },
		})),
		// Export the individual mock functions if you want to control them in tests
		// (This makes it easier to change their return values per test)
		__mocks: {
			mockSignInWithOAuth,
			mockSignInWithOtp,
			mockExchangeCodeForSession,
			mockGetUser,
		},
	};
});

beforeEach(async (ctx) => {
	// Prepare fresh hono context before ach test
	ctx.c = mockContext();

	// Retrieve the nested mocks if you exported them
	const supabaseModule = await import("@/web/middleware/supabase");
	// Now access __mocks directly from the correctly typed module
	// @ts-ignore
	const supabaseMocks = supabaseModule.__mocks;

	// Reset call history and any specific implementations set in tests
	if (supabaseMocks) {
		supabaseMocks.mockSignInWithOAuth.mockReset();
		supabaseMocks.mockSignInWithOtp.mockReset();
		supabaseMocks.mockExchangeCodeForSession.mockReset();
		supabaseMocks.mockGetUser.mockReset();

		// Set default "happy path" implementations here if desired
		supabaseMocks.mockSignInWithOAuth.mockResolvedValue(mockSignInWithOAuthSuccess);
		supabaseMocks.mockSignInWithOtp.mockResolvedValue({
			data: { user: null, session: null },
			error: null,
		});
		supabaseMocks.mockExchangeCodeForSession.mockResolvedValue({
			// Use the actual testSession and testUser defined above
			data: {
				session: testSession,
				user: testUser,
			},
			error: null,
		});

		supabaseMocks.mockGetUser.mockResolvedValue({
			data: { user: testUser },
			error: null,
		});
	} else {
		// Fallback if __mocks isn't defined (shouldn't happen with the above structure)
		vi.resetAllMocks();
	}

	console.log("Unit test setup file executed.");
});
