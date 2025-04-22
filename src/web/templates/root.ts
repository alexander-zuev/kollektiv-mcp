import { env } from "cloudflare:workers";
import { html, raw } from "hono/html";
import type { HtmlEscapedString } from "hono/utils/html";
import { marked } from "marked";

export const homeContent = async (req: Request): Promise<HtmlEscapedString> => {
	const origin = new URL(req.url).origin;
	const res = await env.ASSETS.fetch(`${origin}/README.md`);
	const markdown = await res.text();
	const content = await marked(markdown);
	return html`
        <div class="max-w-4xl mx-auto markdown">${raw(content)}</div>
    `;
};
