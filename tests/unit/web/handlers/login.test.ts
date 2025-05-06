/**
 * Unit-tests for the login handler.
 *
 * Behaviour covered
 * ─────────────────
 * • Form-data parsing
 * • Happy paths for GitHub / Google / Magic-link
 * • Basic error handling
 * • Misc helpers (single parseBody call, redirectTo computation)
 */

import { loginHandler } from "@/web/handlers/login";
import { AppRoutes } from "@/web/routes";
import { LoginProvider } from "@/web/templates";
import type { Context } from "hono";
import { beforeEach, describe, expect, it, vi } from "vitest";

const TEST_EMAIL = "test@user.com";
const TEST_TX = "unit-test-tx";

vi.mock("@/web/templates", async () => {
	// We still want all the real exports except the ones we override
	const actual = await vi.importActual<object>("@/web/templates");

	return {
		...actual,
		// Stub the render helper so we can assert against it
		renderMagicLinkSentScreen: vi
			.fn()
			.mockResolvedValue("<div id='magic-link-sent'>Email sent 🚀</div>"),

		// A tiny base() impl so the handler can wrap the HTML
		base: (content: string, _title: string) => `<html><body>${content}</body></html>`,
	};
});

describe("Login Handler tests covering all major flows", () => {
	// Provided by the unit.setup.ts
	let c!: Context;

	beforeEach((ctx) => {
		c = ctx.c as Context;

		/* Inject the tx query parameter for every test */
		vi.spyOn(c.req, "query").mockImplementation((key?: string) =>
			key === "tx" ? TEST_TX : undefined,
		);
	});

	it("Redirects to Github provider URL on success", async () => {
		const supabaseModule = await import("@/web/middleware/supabase");
		// @ts-ignore
		const { __mocks } = supabaseModule;

		__mocks.mockSignInWithOAuth.mockResolvedValue({
			data: { url: "https://github.com/oauth" },
			error: null,
		});

		c.req.parseBody = vi.fn().mockResolvedValueOnce({ provider: LoginProvider.GITHUB });

		const res = await loginHandler(c);

		expect(__mocks.mockSignInWithOAuth).toHaveBeenCalledWith({
			provider: LoginProvider.GITHUB,
			options: expect.objectContaining({
				redirectTo: `${c.env.SITE_URL}${AppRoutes.AUTH_CALLBACK}?tx=${TEST_TX}`,
			}),
		});
		expect(res.status).toBe(302);
		expect(res.headers.get("location")).toBe("https://github.com/oauth");
	});
	it("Redirects to Google provider URL on success", async () => {
		const supabaseModule = await import("@/web/middleware/supabase");
		// @ts-ignore
		const { __mocks } = supabaseModule;

		__mocks.mockSignInWithOAuth.mockResolvedValue({
			data: { url: "https://google.com/oauth" },
			error: null,
		});

		c.req.parseBody = vi.fn().mockResolvedValueOnce({
			provider: LoginProvider.GOOGLE,
		});

		const res = await loginHandler(c);

		expect(__mocks.mockSignInWithOAuth).toHaveBeenCalledWith({
			provider: LoginProvider.GOOGLE,
			options: expect.objectContaining({
				redirectTo: `${c.env.SITE_URL}${AppRoutes.AUTH_CALLBACK}?tx=${TEST_TX}`,
			}),
		});
		expect(res.status).toBe(302);
		expect(res.headers.get("location")).toBe("https://google.com/oauth");
	});
	it("Renders check your email screen on success", async () => {
		const supabaseModule = await import("@/web/middleware/supabase");
		// @ts-ignore
		const { __mocks } = supabaseModule;

		__mocks.mockSignInWithOtp.mockResolvedValue({
			data: {
				user: null,
				session: null,
			},
			error: null,
		});

		c.req.parseBody = vi.fn().mockResolvedValueOnce({
			provider: LoginProvider.MAGIC_LINK,
			email: TEST_EMAIL,
		});

		const res = await loginHandler(c);

		expect(__mocks.mockSignInWithOtp).toHaveBeenCalledWith({
			email: TEST_EMAIL,
			options: expect.objectContaining({
				shouldCreateUser: true,
				emailRedirectTo: `${c.env.SITE_URL}${AppRoutes.AUTH_CALLBACK}?tx=${TEST_TX}`,
			}),
		});

		/* ---------- HTML rendering ---------- */
		const templates = await import("@/web/templates");
		expect(templates.renderMagicLinkSentScreen).toHaveBeenCalledWith({
			email: TEST_EMAIL,
		});

		expect(res.headers.get("content-type")).toMatch(/text\/html/);
		const html = await res.text();
		expect(html).toContain("magic-link-sent");
	});

	describe.each([
		["GitHub", LoginProvider.GITHUB, "Kaboom!"],
		["Google", LoginProvider.GOOGLE, "Kaboom!"],
	])("Test error handling for provider - %s", (providerName, provider, errMsg) => {
		let c!: Context;

		beforeEach((ctx) => {
			c = ctx.c as Context;
		});
		it(`Returns 500 text response when ${providerName} auth fails`, async () => {
			const supabaseModule = await import("@/web/middleware/supabase");
			// @ts-ignore
			const { __mocks } = supabaseModule;

			__mocks.mockSignInWithOAuth.mockResolvedValue({
				data: null,
				error: { message: `${errMsg}` },
			});

			c.req.parseBody = vi.fn().mockResolvedValueOnce({ provider: `${provider}` });

			const res = (await loginHandler(c)) as any;

			expect(res.status).toBe(500);
			expect(await res.text()).toContain(`Error logging in with ${providerName}: ${errMsg}`);
		});
	});

	describe("misc", () => {
		it("parses formData exactly once", async () => {
			// Arrange
			c.req.parseBody = vi.fn().mockResolvedValueOnce({ provider: "github" });
			const supabaseModule = await import("@/web/middleware/supabase");
			// @ts-ignore
			const { __mocks } = supabaseModule;

			__mocks.mockSignInWithOAuth.mockResolvedValue({
				data: { url: "https://github.com/oauth" },
				error: null,
			});

			// Act
			await loginHandler(c);

			// Assert
			expect(c.req.parseBody).toHaveBeenCalledTimes(1);

			// extra sanity-check: the provider that was read is the one we passed on
			expect(__mocks.mockSignInWithOAuth).toHaveBeenCalledWith(
				expect.objectContaining({ provider: "github" }),
			);
		});
	});
});
