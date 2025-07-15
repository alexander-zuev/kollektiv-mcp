import {getAuthRoute} from "@shared/api/app-routes";
import {html} from "hono/html";

export const renderNotFound = () => {
    return html`
        <div class="flex w-full justify-center p-8">
            <div class="max-w-lg w-full rounded-lg border border-border bg-card p-6 text-center flex flex-col gap-4 items-center">
                <i class="ph ph-warning-circle text-5xl text-destructive mt-4"></i>
                <h1 class="text-2xl text-center text-destructive">Page Not Found</h1>

                <p class="text-center text-base text-foreground mb-2">
                    The page you're looking for doesn't exist.
                </p>

                <div class="space-y-4 text-sm leading-relaxed text-foreground/80 mt-2">
                    <p>
                        You're seeing this page because:
                    </p>
                    <ol class="list-decimal list-inside text-left space-y-1">
                        <li>There might be a bug in the authorization flow 🪲</li>
                        <li>You may have followed an incorrect or outdated link</li>
                    </ol>
                    <p>
                        If you were trying to log in, please restart the authorization process from
                        your client application.
                    </p>
                </div>

                <a
                        href="${getAuthRoute('authorize')}"
                        class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover mt-2"
                >
                    Restart Authorization
                </a>
            </div>
        </div>
    `;
};