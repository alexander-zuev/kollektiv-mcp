import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

describe("Worker Entry Point Tests (index.ts)", () => {
	it("responds successfully to the root path", async () => {
		// SELF.fetch interacts with the default export of src/index.ts
		const response = await SELF.fetch("http://localhost:8787/");

		// Check that the response is successful
		expect(response.status).toBe(200);
	});
});
