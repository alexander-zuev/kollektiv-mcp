import { base, consentScreen } from "@/web/templates";
import type { ClientInfo, OAuthRequest, User } from "@/web/types";
import type { Meta, StoryObj } from "@storybook/html";

const mockUser: User = {
	id: "user-123456789",
	email: "user@example.com",
	app_metadata: {},
	user_metadata: {},
	aud: "authenticated",
	created_at: "",
} as User;

const mockClientInfo: ClientInfo = {
	clientId: "demo-client",
	clientName: "Demo Application",
	redirectUris: ["https://example.com/callback"],
} as ClientInfo;

// @ts-ignore
const mockOAuthRequest: OAuthRequest = {
	clientId: "demo-client",
	redirectUri: "https://example.com/callback",
	state: "random-state-string",
	codeChallenge: "code-challenge-string",
	codeChallengeMethod: "S256",
	scope: "openid profile email",
} as OAuthRequest;

const meta: Meta = {
	title: "Templates/Consent",
};

export default meta;

/* ----------------------- story ----------------------- */

export const Default: StoryObj = {
	// @ts-ignore
	render: () => {
		return base(
			consentScreen({
				user: mockUser,
				clientInfo: mockClientInfo,
				oauthReq: mockOAuthRequest,
			}),
			"Consent",
		).toString(); // unwrap
	},
};
