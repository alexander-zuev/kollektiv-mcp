import { type ErrorScreenProps, base, errorScreenPage } from "@/web/templates";
import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
	title: "Templates/Error Page",
};

export default meta;

/* ----------------------- story ----------------------- */
const hint = `
Try the following:

1. Clear your browser cookies
2. Run: rm -rf ~/.mcp-auth (Mac/Linux)
3. Restart your editor (Cursor, Windsurf, etc.)

Full steps: 
https://github.com/alexander-zuev/kollektiv-mcp#connection-troubleshooting
`;

const details = {
	user: {
		id: "bd42fd8e-f003-41be-8747-e978e4771452",
		email: "user@example.com",
		name: "Example User",
		roles: ["admin", "editor", "viewer"],
		settings: {
			theme: "dark",
			notifications: {
				email: true,
				sms: false,
				push: true,
			},
		},
		projects: Array.from({ length: 15 }).map((_, i) => ({
			id: `project-${i + 1}`,
			name: `Project ${i + 1}`,
			status: "active",
			lastUpdated: new Date().toISOString(),
			metadata: {
				createdBy: "system",
				region: "us-west-2",
				quota: {
					used: `${Math.floor(Math.random() * 500)}MB`,
					limit: "1GB",
				},
			},
		})),
	},
	request: {
		id: `req_${crypto.randomUUID()}`,
		method: "POST",
		path: "/authorize",
		query: {
			client_id: "example-client-id",
			redirect_uri: "https://example.com/callback",
		},
		headers: {
			"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_2_1) AppleWebKit/537.36",
			accept: "*/*",
			referer: "https://mcp.thekollektiv.ai",
		},
	},
	error: {
		type: "InvalidAuthorization",
		message: "Missing or malformed token",
		stack: "Trace: \n  at AuthHandler (/auth.js:34:12)\n  at main (/index.js:8:1)".repeat(5),
	},
};

const errorDetails: ErrorScreenProps = {
	title: "Authorization error",
	message: "You are not authorized to access this page.",
	hint: hint,
	// details: details,
};

export const Default: StoryObj = {
	render: () =>
		// unwrap both snippets to plain strings
		// @ts-ignore
		base(errorScreenPage(errorDetails), "Error").toString(),
};
