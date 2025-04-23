// noinspection ExceptionCaughtLocallyJS

import type { Context } from "hono";
import type { ZodTypeAny, z } from "zod";

/**
 * Represents an error during form data validation.
 * Contains the Zod issues for detailed feedback.
 */

export class FormValidationError extends Error {
	public issues: z.ZodIssue[];

	constructor(issues: z.ZodIssue[]) {
		super(`Form validation failed: ${issues[0]?.message || "Invalid input"}`);
		this.name = "FormValidationError";
		this.issues = issues;
	}
}

/**
 * Parses the request body from the Hono context and validates it against the provided Zod schema.
 *
 * @param c - The Hono context object.
 * @param schema - The Zod schema to validate against.
 * @returns A promise that resolves with the validated data (typed according to the schema).
 * @throws {FormValidationError} If validation fails.
 * @throws {Error} If parsing the body fails for other reasons.
 */

export async function parseFormData<T extends ZodTypeAny>(
	c: Context,
	schema: T,
): Promise<z.infer<T>> {
	console.log("[parseAndValidateFormData] Attempting to parse and validate form data...");
	try {
		const rawFormData: unknown = await c.req.parseBody();
		console.log(
			"[parseAndValidateFormData] Raw form data parsed:",
			JSON.stringify(rawFormData, null, 2),
		);

		// Validate the data against the schema
		const validationResult = schema.safeParse(rawFormData);

		// Check validation errors
		if (!validationResult.success) {
			console.error(
				"[parseAndValidateFormData] Zod validation failed:",
				validationResult.error.flatten(),
			);
			throw new FormValidationError(validationResult.error.issues);
		}
		// return type safe validated data
		console.log("[parseAndValidateFormData] Validation successful.");
		return validationResult.data;
	} catch (error) {
		// Handle specific validation errors vs. other potential errors
		if (error instanceof FormValidationError) {
			// Just re-throw the validation error
			throw error;
		}
		// Log and throw a generic error for other issues (e.g., network problems during parsing)
		console.error("[parseAndValidateFormData] Error during form parsing/validation:", error);
		throw new Error("Failed to parse or validate form data.");
	}
}
