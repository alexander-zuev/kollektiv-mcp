import { html } from "hono/html";

export type ErrorScreenProps = {
	title?: string; // heading
	message: string; // required error message
	hint?: string; // optional user-facing note
	details?: Record<string, unknown>; // structured object dumped prettily
};

export const renderErrorScreen = ({
	title = "Authorization Error",
	message,
	hint,
	details,
}: ErrorScreenProps) => {
	return html`
        <div class="flex w-full justify-center p-8">
            <div class="max-w-lg w-full rounded-lg border border-border bg-card p-6 text-center flex flex-col gap-4 items-center">
                <i
                        class="ph ph-smiley-x-eyes text-5xl text-destructive mt-4"></i>
                <h1 class="text-2xl text-center text-destructive">${title}</h1>

                <p class="text-center text-base text-foreground mb-2">Error:
                    ${message}
                </p>
                ${
									hint
										? html`<p class="mb-4 text-sm text-muted-foreground">
                    ${hint}</p>`
										: ""
								}
                ${
									details
										? html`
                            <pre class="text-sm w-full bg-muted text-muted-foreground p-4 rounded-lg overflow-auto">
${JSON.stringify(details, null, 2)}</pre>`
										: ""
								}
            </div>
        </div>
        </div>
    `;
};
