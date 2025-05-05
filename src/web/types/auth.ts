import type { AuthRequest, ClientInfo } from "@cloudflare/workers-oauth-provider";

/**
 * Structure of the data persisted in the 'authFlow' cookie.
 */
export type AuthFlowCookieData = {
	oauthReq: AuthRequest;
	clientInfo?: ClientInfo;
};
