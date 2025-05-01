import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return (
		Object.prototype.toString.call(value) === "[object Object]" &&
		(value?.constructor === Object || value?.constructor == null)
	);
}

/**
 * Converts a value to snake_case if it's a plain object.
 * Returns {} for null/undefined.
 * Returns all other types unchanged.
 */
export function convertToSnakeCase<T>(body: T): T {
	if (body == null) return {} as T;

	if (Array.isArray(body)) {
		return body.map((item) => convertToSnakeCase(item)) as T;
	}
	if (isPlainObject(body)) {
		return snakecaseKeys(body as Record<string, unknown>, { deep: true }) as T;
	}
	return body;
}

/**
 * Converts a value to camelCase if it's a plain object.
 * Returns {} for null/undefined.
 * Returns all other types unchanged.
 */
export function convertToCamelCase<T>(body: T): T {
	if (body == null) return {} as T; // null or undefined → empty object
	// NEW: handle arrays first
	if (Array.isArray(body)) {
		return body.map((item) => convertToCamelCase(item)) as T;
	}

	if (isPlainObject(body)) {
		// Plain object: convert
		return camelcaseKeys(body as Record<string, unknown>, { deep: true }) as T;
	}
	// Array, string, number, boolean, etc.: return as-is
	return body;
}
