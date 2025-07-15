import { html } from "hono/html";

export const renderHomePage = () => {
	return html`
        <div class="flex w-full justify-center p-8">
            <div class="flex flex-col max-w-lg gap-4">
                <h1>Kollektiv Authorization Service</h1>
                <div class="space-y-4 text-sm leading-relaxed text-foreground/80">
                    <p>
                        You’re seeing this page because either:
                    </p>
                    <ol class="list-decimal list-inside text-left space-y-1">
                        <li>my app mis‑routed you here (bug 🪲), or</li>
                        <li>you are very curious (I applaud you 🥳) .</li>
                    </ol>
                    <p>
                        If you expected a login screen, head back and try again—or file an issue if
                        it keeps
                        happening.
                    </p>
                </div>

                <a
                        href="/authorize"
                        class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                    Start authorization
                </a>
            </div>
        </div>
    `;
};
