import type {ClientInfo} from "@cloudflare/workers-oauth-provider";
import type {Context} from "hono";
import {html} from "hono/html";
import {getAuthRoute} from "@shared/api/app-routes";
import {base} from "@/worker/infrastructure/presentation/templates/base";

/** Authorised login providers */
export enum LoginProvider {
    GITHUB = "github",
    GOOGLE = "google",
    MAGIC_LINK = "magic-link",
}

/** Common outline-variant classes */
const outlineBtn =
    "w-full py-3 px-4 cursor-pointer bg-muted text-muted-foreground hover:text-foreground " +
    "border border-border rounded-md font-medium hover:bg-muted/90 transition-colors " +
    "flex items-center justify-center gap-2 " +
    "disabled:hover:text-muted-foreground disabled:bg-muted disabled:cursor-not-allowed ";

/** Provider metadata used to build the buttons */
const OAUTH_PROVIDERS: { id: LoginProvider; label: string; icon: string }[] = [
    {id: LoginProvider.GITHUB, label: "Login with GitHub", icon: "ph-github-logo"},
    {id: LoginProvider.GOOGLE, label: "Login with Google", icon: "ph-google-logo"},
];

export const loginScreen = (clientInfo: ClientInfo, tx: string) => {
    /* Helper for OAuth buttons */
    const renderOAuthButton = ({id, label, icon}: (typeof OAUTH_PROVIDERS)[number]) => html`
        <form method="POST" action="${getAuthRoute('login')}?tx=${tx}" onsubmit="
        this.querySelectorAll('button[type=submit]')
            .forEach(btn => {
              btn.disabled = true;
              btn.classList.add('bg-muted/90', 'cursor-not-allowed' ,'hover:text-muted-foreground/90');
            });
      ">
            <input type="hidden" name="provider" value="${id}"/>
            <button type="submit" name="button" value="${id}" class="${outlineBtn}">
                <i class="ph ${icon} text-lg"></i>
                ${label}
            </button>
        </form>
    `;

    return html`
        <div class="flex w-full justify-center p-8">
            <div
                    class="max-w-lg w-full rounded-lg border border-border bg-card p-6 text-center flex flex-col gap-4 items-center"
            >
                <i class="ph ph-sign-in text-5xl text-primary mt-4"></i>
                <h1 class="text-2xl text-center text-foreground">
                    Login to authorize <strong>${clientInfo?.clientName}</strong>
                </h1>

                <p class="text-base text-center text-foreground/80 mb-2">
                    You’re connecting your Kollektiv account so that
                    <strong>${clientInfo?.clientName || "your IDE/client"}</strong> can securely use
                    Kollektiv MCP on your
                    behalf.
                    Choose any sign-in method below.
                </p>

                <!-- OAuth providers -->
                <div class="w-full space-y-4">
                    ${OAUTH_PROVIDERS.map(renderOAuthButton)}
                </div>

                <!-- divider -->
                <div class="flex items-center w-full my-4">
                    <div class="flex-grow border-t border-border"></div>
                    <span class="px-3 text-sm text-muted-foreground">OR CONTINUE WITH</span>
                    <div class="flex-grow border-t border-border"></div>
                </div>

                <!-- Magic-link form -->
                <form method="POST" action="${getAuthRoute('login')}?tx=${tx}" onsubmit="
        this.querySelectorAll('button[type=submit]')
            .forEach(btn => {
              btn.disabled = true;
              btn.classList.add('bg-muted/90', 'cursor-not-allowed', 'hover:text-muted-foreground/90');

            });
      " class="w-full space-y-4">
                    <input type="hidden" name="provider" value="${LoginProvider.MAGIC_LINK}"/>
                    <div>
                        <label
                                for="email"
                                class="block text-sm font-medium text-foreground mb-1 text-left"
                        >Email</label
                        >
                        <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                class="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-card text-foreground"
                        />
                    </div>
                    <button
                            type="submit"
                            name="button"
                            value="${LoginProvider.MAGIC_LINK}"
                            class="${outlineBtn}"
                    >
                        <i class="ph ph-paper-plane text-lg"></i>
                        Send Magic Link
                    </button>
                </form>
            </div>
        </div>
    `;
};

export async function renderLoginScreen(c: Context, client: ClientInfo, tx: string) {
    const content = await loginScreen(client, tx);
    const pageTitle = `Log in to authorize ${client?.clientName || "Application"}`;
    return c.html(base(content, pageTitle));
}