import { AppRoutes } from "@/web/routes";
import { base } from "@/web/templates/base";
import type { AuthRequest, ClientInfo } from "@cloudflare/workers-oauth-provider";
import type { User } from "@supabase/supabase-js";
import type { Context } from "hono";
import { html } from "hono/html";

/**
 * Props needed for rendering the consent screen template.
 */
export type ConsentScreenProps = {
	oauthReq: AuthRequest; // Use the central type
	client?: ClientInfo; // Use the central type
	user: User; // Use the Supabase User type
	tx: string; // transaction id
	csrfToken: string; // from cookie
};

export const consentScreen = (props: ConsentScreenProps) => {
	const clientName = props.client?.clientName || "Application";
	const userEmail = props.user?.email;

	return html`
        <div class="flex w-full justify-center p-8">
            <div class="max-w-lg w-full rounded-lg border border-border bg-card p-6 text-center flex flex-col gap-4 items-center">
                <i class="ph ph-handshake text-5xl text-primary mt-4"></i>
                <h1 class="text-2xl text-center text-foreground">Authorization Request</h1>

                <p class="text-center text-base text-foreground mb-2">
                    Authorize <strong>${clientName}</strong> to
                    connect to your Kollektiv <strong> ${userEmail}</strong> account.
                </p>

                <div class="w-full text-left space-y-3 my-2">
                    <p class="text-sm font-medium text-foreground">
                        <strong>${clientName}</strong> requests read-only access to
                        your
                        Kollektiv account:
                    </p>
                    <div class="flex items-start gap-2 text-sm text-foreground/80">
                        <i class="ph ph-check-circle text-success text-lg mt-0.5"></i>
                        <span>Search and read the documents you have uploaded</span>
                    </div>
                </div>

                <form method="POST" action='${AppRoutes.AUTHORIZE}?tx=${props.tx}' class="w-full">
                    <input type="hidden" name="csrf" value="${props.csrfToken}"/>
                    <input type="hidden" name="client_id" value="${props.oauthReq.clientId}"/>
                    <input type="hidden" name="state" value="${props.oauthReq.state}"/>
                    <input type="hidden" name="code_challenge"
                           value="${props.oauthReq.codeChallenge}"/>
                    <input type="hidden" name="code_challenge_method"
                           value="${props.oauthReq.codeChallengeMethod}"/>
                    <input type="hidden" name="scope" value="${props.oauthReq.scope}"/>
                    <input type="hidden" name="redirect_uri" value="${props.oauthReq.redirectUri}"/>

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
                    <span>Access is limited, revocable, and never includes write permissions.</span>
                </div>
            </div>
        </div>
    `;
};

export async function renderConsentScreen(
	c: Context,
	oauthReq: AuthRequest,
	client: ClientInfo,
	user: User,
	tx: string,
	csrfToken: string,
) {
	const content = await consentScreen({ oauthReq, client, user, tx, csrfToken });
	const pageTitle = `Authorization Request"}`;
	return c.html(base(content, pageTitle));
}
