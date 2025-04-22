import snakecaseKeys from "snakecase-keys";
import camelcaseKeys from "camelcase-keys";

/**
 * Converts a value to snake_case if it's a plain object.
 * Returns {} for null/undefined.
 * Returns all other types unchanged.
 */
export function convertToSnakeCase<T>(body: T): T {
    if (body == null) return {} as T;
    if (typeof body === "object" && !Array.isArray(body)) {
        return snakecaseKeys(body as Record<string, unknown>, {deep: true}) as T;
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
    if (typeof body === "object" && !Array.isArray(body)) {
        // Plain object: convert
        return camelcaseKeys(body as Record<string, unknown>, {deep: true}) as T;
    }
    // Array, string, number, boolean, etc.: return as-is
    return body;
}