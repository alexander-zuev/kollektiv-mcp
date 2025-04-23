import { AppRoutes } from "@/web/routes";
import type { ClientInfo, OAuthRequest, User } from "@/web/types";
import { html } from "hono/html";

/**
 * Props needed for rendering the consent screen template.
 */
export type ConsentScreenProps = {
	oauthReq: OAuthRequest; // Use the central type
	clientInfo: ClientInfo; // Use the central type
	user: User; // Use the Supabase User type
};

export const renderConsentScreen = ({ oauthReq, clientInfo, user }: ConsentScreenProps) => {
	const userIdentifier = user.email || `User ${user.id.substring(0, 8)}`;

	return html`
        <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
            <h2 class="text-2xl font-heading font-semibold mb-4 text-gray-900">
                Hi, ${userIdentifier}!
            </h2>
            <p class="text-lg text-gray-700 mb-6">
                <span class="font-semibold">${clientInfo.clientName}</span> wants to access your
                account.
            </p>

            <form method="POST" action='${AppRoutes.AUTHORIZE}'>
                <input type="hidden" name="client_id" value="${oauthReq.clientId}"/>
                <input type="hidden" name="state" value="${oauthReq.state}"/>
                <input type="hidden" name="code_challenge" value="${oauthReq.codeChallenge}"/>
                <input type="hidden" name="code_challenge_method"
                       value="${oauthReq.codeChallengeMethod}"/>
                <input type="hidden" name="scope" value="${oauthReq.scope}"/>
                <input type="hidden" name="redirect_uri" value="${oauthReq.redirectUri}"/>

                <!-- Add Approve and Deny buttons -->
                <div class="flex flex-col sm:flex-row gap-4 mt-6">
                    <button
                            type="submit"
                            name="action"
                            value="allow"
                            class="w-full sm:w-1/2 py-3 px-4 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                    >
                        Allow
                    </button>
                    <button
                            type="submit"
                            name="action"
                            value="deny"
                            class="w-full sm:w-1/2 py-3 px-4 bg-gray-300 text-gray-800 rounded-md font-medium hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:ring-offset-2"
                    >
                        Deny
                    </button>
                </div>
            </form>
        </div>
    `;
};
