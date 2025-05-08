import { base } from "@/web/templates/base";
import type { Context } from "hono";
import { html } from "hono/html";

export type ErrorScreenProps = {
	title?: string; // heading
	message: string; // required error message
	hint?: string; // optional user-facing note
	details?: Record<string, unknown>; // structured object dumped prettily
};

export const errorScreenPage = ({
	title = "Authorization Error",
	message,
	hint,
	details,
}: ErrorScreenProps) => {
	const errorHint = (hint ?? "").trim();
	const errorDetails = details || {};

	return html`
        <div class="flex w-full justify-center p-8">
            <div class="max-w-lg w-full rounded-lg border border-border bg-card p-6 text-center flex flex-col gap-4 items-center">
                <i
                        class="ph ph-smiley-x-eyes text-5xl text-destructive mt-4"></i>
                <h1 class="text-2xl text-center text-destructive">${title}</h1>

                <p class="text-center text-base text-foreground mb-2">Error:
                    ${message}
                </p>
                <pre class="mb-4 text-sm text-muted-foreground text-left w-full">${errorHint}
                </pre>

                ${
									Object.keys(errorDetails).length
										? html`
                            <pre class="text-sm text-left w-full bg-muted text-muted-foreground p-4 rounded-lg overflow-auto">
${JSON.stringify(errorDetails, null, 2)}</pre>`
										: ""
								}
            </div>
        </div>
        </div>
    `;
};

export async function renderErrorPage(
	title: string,
	errMsg: string,
	c: Context,
	hint: string,
	pageTitle: string,
	details?: Record<string, unknown>,
) {
	const content = await errorScreenPage({
		title,
		message: errMsg,
		hint,
		details,
	});
	return c.html(base(content, pageTitle), 401);
}
