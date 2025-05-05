import type { Context } from "hono";
import { vi } from "vitest";

/**
 * Produce a realistic Hono `Context` stub for unit tests.
 *
 *  – `text`, `html`, `json`, and `redirect` return genuine `Response`
 *    instances, mirroring Hono’s internal helpers.
 *  – A tiny `req` shim exposes `.parseBody()` and `.url`.
 *  – Everything is override-able via the `overrides` argument.
 */
export function mockContext(overrides: Partial<Context> = {}): Context {
	/* ---------- request shim ---------- */
	const req = {
		parseBody: vi.fn().mockResolvedValue({}),
		url: "https://example.com",
		header: (_name: string) => undefined,
		...overrides.req,
	};

	/* ---------- response helpers ---------- */
	const text = (body: string, status = 200, headers?: HeadersInit) =>
		new Response(body, {
			status,
			headers: { "Content-Type": "text/plain; charset=utf-8", ...headers },
		});

	const html = (body: string, status = 200, headers?: HeadersInit) =>
		new Response(body, {
			status,
			headers: { "Content-Type": "text/html; charset=utf-8", ...headers },
		});

	const json = (data: unknown, status = 200, headers?: HeadersInit) =>
		new Response(JSON.stringify(data), {
			status,
			headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
		});

	const redirect = (url: string, status = 302) =>
		new Response(null, {
			status,
			headers: { Location: url },
		});

	/* ---------- context skeleton ---------- */
	const contextImpl: Partial<Context> = {
		req,
		env: { SITE_URL: "https://test.thekollektiv.ai", ...(overrides.env as any) },
		text,
		html,
		json,
		redirect,
		...overrides,
	};

	return contextImpl as Context;
}
