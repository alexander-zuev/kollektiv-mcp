import { FormValidationError, parseFormData } from "@/web/utils/form";
// form.test.ts
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

describe("parseFormData", () => {
	it("should parse and validate form data successfully", async () => {
		const mockContext = {
			req: {
				parseBody: vi.fn().mockResolvedValue({ name: "John", age: 30 }),
			},
		} as any;

		const schema = z.object({
			name: z.string(),
			age: z.number(),
		});

		const result = await parseFormData(mockContext, schema);

		expect(result).toEqual({ name: "John", age: 30 });
		expect(mockContext.req.parseBody).toHaveBeenCalledOnce();
	});

	it("should throw FormValidationError for invalid data", async () => {
		const mockContext = {
			req: {
				parseBody: vi.fn().mockResolvedValue({ name: "John", age: "not-a-number" }),
			},
		} as any;

		const schema = z.object({
			name: z.string(),
			age: z.number(),
		});

		await expect(parseFormData(mockContext, schema)).rejects.toThrowError(FormValidationError);
		expect(mockContext.req.parseBody).toHaveBeenCalledOnce();
	});

	it("should throw an error if parsing the body fails", async () => {
		const mockContext = {
			req: {
				parseBody: vi.fn().mockRejectedValue(new Error("Parsing failed")),
			},
		} as any;

		const schema = z.object({
			name: z.string(),
			age: z.number(),
		});

		await expect(parseFormData(mockContext, schema)).rejects.toThrowError(
			"Failed to parse or validate form data.",
		);
		expect(mockContext.req.parseBody).toHaveBeenCalledOnce();
	});
});
