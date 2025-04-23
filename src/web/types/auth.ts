// src/web/types/auth.ts
import type { User } from "@supabase/supabase-js";

/**
 * Represents the core OAuth2 authorization request parameters.
 */
export type OAuthRequest = {
	clientId: string;
	redirectUri: string; // Usually required
	state?: string; // Recommended for security
	scope: string[]; // Standardized as an array of strings
	responseType: string; // e.g., "code"
	codeChallenge?: string; // For PKCE
	codeChallengeMethod?: "S256" | string; // For PKCE, S256 is common
	// Allow other potential parameters from the provider
	[key: string]: any;
};

/**
 * Information about the client application requesting authorization.
 * Extend this if c.env.OAUTH_PROVIDER.lookupClient returns more useful info.
 */
export type ClientInfo = {
	clientName: string;
	// Add other properties like clientUri, logoUri, etc., if available and needed
};

/**
 * Structure of the data persisted in the 'authFlow' cookie.
 */
export type AuthFlowCookieData = {
	oauthReq: OAuthRequest;
	clientInfo: ClientInfo;
};

// Re-export User type for convenience if needed elsewhere, though direct import is fine too
export type { User };
