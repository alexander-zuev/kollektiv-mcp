import { AppRoutes } from "@/web/routes";
import type { AuthRequest, ClientInfo } from "@cloudflare/workers-oauth-provider";
import type { User } from "@supabase/supabase-js";
import { html } from "hono/html";

/**
 * Props needed for rendering the consent screen template.
 */
export type ConsentScreenProps = {
	oauthReq: AuthRequest; // Use the central type
	clientInfo?: ClientInfo; // Use the central type
	user: User; // Use the Supabase User type
};

export const renderConsentScreen = ({ oauthReq, clientInfo, user }: ConsentScreenProps) => {
	const userIdentifier = user.email || `User ${user.id.substring(0, 8)}`;

	return html`
        <div class="flex w-full justify-center p-8">
            <div class="max-w-lg w-full rounded-lg border border-border bg-card p-6 text-center flex flex-col gap-4 items-center">
                <i class="ph ph-handshake text-5xl text-primary mt-4"></i>
                <h1 class="text-2xl text-center text-foreground">Authorization Request</h1>

                <p class="text-center text-base text-foreground mb-2">
                    Hi, ${userIdentifier}! Authorize
                    <strong>${clientInfo?.clientName}</strong> to
                    connect to <strong>Kollektiv MCP</strong>.
                </p>

                <div class="w-full text-left space-y-3 my-2">
                    <p class="text-sm font-medium text-foreground">
                        Kollektiv MCP will have access to:
                    </p>
                    <div class="flex items-start gap-2 text-sm text-foreground/80">
                        <i class="ph ph-check-circle text-success text-lg mt-0.5"></i>
                        <span>Query the documents you uploaded to Kollektiv app</span>
                    </div>
                </div>

                <form method="POST" action='${AppRoutes.AUTHORIZE}' class="w-full">
                    <input type="hidden" name="client_id" value="${oauthReq.clientId}"/>
                    <input type="hidden" name="state" value="${oauthReq.state}"/>
                    <input type="hidden" name="code_challenge" value="${oauthReq.codeChallenge}"/>
                    <input type="hidden" name="code_challenge_method"
                           value="${oauthReq.codeChallengeMethod}"/>
                    <input type="hidden" name="scope" value="${oauthReq.scope}"/>
                    <input type="hidden" name="redirect_uri" value="${oauthReq.redirectUri}"/>

                    <!-- Add Approve and Deny buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 mt-4 w-full">
                        <button
                                type="submit"
                                name="action"
                                value="allow"
                                class="w-full sm:w-1/2 py-3 px-4 bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover rounded-md font-medium transition-colors cursor-pointer"
                        >
                            Allow
                        </button>
                        <button
                                type="submit"
                                name="action"
                                value="deny"
                                class="w-full sm:w-1/2 py-3 px-4 border border-border shadow-xs hover:bg-surface-hover text-foreground transition-colors cursor-pointer"
                        >
                            Deny
                        </button>
                    </div>
                </form>

                <div class="flex flex-row items-center gap-2 mt-4 text-sm text-muted-foreground border-t border-border pt-4 w-full justify-start">
                    <i class="ph ph-shield text-success"></i>
                    <span>Your data is secure and will only be used for the specified purposes.</span>
                </div>
            </div>
        </div>
    `;
};
