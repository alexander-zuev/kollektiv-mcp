// Example successful return value for signInWithOAuth
import { AuthError, type Session, type User } from "@supabase/supabase-js";

export const mockSignInWithOAuthSuccess = {
	data: {
		provider: "github", // Or the provider you are testing
		url: "https://provider.com/auth?client_id=...", // A realistic-looking mock URL
	},
	error: null,
};

// Example error return value for signInWithOAuth
export const mockSignInWithOAuthError = {
	data: {
		provider: null,
		url: null,
	},
	error: new AuthError("Failed to initiate OAuth flow", 400), // Or specific error
};

export const testUser: User = {
	id: "11111111-1111-1111-1111-111111111111", // Use a consistent mock UUID
	aud: "authenticated",
	role: "authenticated",
	email: "test@example.com", // Use a consistent mock email
	email_confirmed_at: new Date().toISOString(),
	phone: "",
	confirmed_at: new Date().toISOString(),
	last_sign_in_at: new Date().toISOString(),
	app_metadata: {
		provider: "email", // Or 'github', 'google' depending on test case
		providers: ["email"], // Or ['github'], ['google']
	},
	user_metadata: {
		// Add any custom user metadata you expect
		full_name: "Test User",
	},
	identities: [
		{
			identity_id: "22222222-2222-2222-2222-222222222222",
			id: "11111111-1111-1111-1111-111111111111", // Match user id
			user_id: "11111111-1111-1111-1111-111111111111", // Match user id
			identity_data: {
				// Keep structure, adjust content as needed
				email: "test@example.com",
				sub: "11111111-1111-1111-1111-111111111111", // Match user id
			},
			provider: "email", // Match app_metadata.provider
			last_sign_in_at: new Date().toISOString(),
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		},
	],
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
	is_anonymous: false,
};

export const testSession: Session = {
	access_token: "mock-access-token",
	refresh_token: "mock-refresh-token",
	token_type: "bearer",
	expires_in: 3600, // Example: 1 hour
	expires_at: Math.floor(Date.now() / 1000) + 3600, // Example: 1 hour from now
	user: testUser, // Embed the testUser object
};

// Example successful return value for getUser
export const mockGetUserSuccess = {
	data: { user: testUser },
	error: null,
};

// Example "no session" return value for getUser
export const mockGetUserNoSession = {
	data: { user: null },
	// Use a specific error class if available and relevant, otherwise a generic AuthError
	// Assuming AuthSessionMissingError might not be directly exportable or easily mockable,
	// using a generic AuthError with a specific message might be more practical for mocks.
	error: new AuthError("Auth session missing", 401, "AuthSessionMissingError"), // Mock the typical "no session" error
};
