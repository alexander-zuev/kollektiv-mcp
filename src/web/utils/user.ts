import { getSupabase } from "@/web/middleware/supabase";
import type { User } from "@/web/types";
import { AuthError, isAuthApiError } from "@supabase/supabase-js";
import type { Context } from "hono";

const NO_VALID_SESSION_ERRORS = new Set([
	"user_not_found",
	"refresh_token_not_found",
	"session_not_found",
	"session_expired",
]);

/**
 * Retrieves the current Supabase user.
 * Handles the specific AuthSessionMissingError by returning null.
 * Throws any other unexpected AuthErrors.
 *
 * @param c Hono Context
 * @returns The Supabase User object or null if no session exists.
 * @throws {AuthError} Throws unexpected errors encountered during user retrieval.
 * @throws {Error} Throws a generic Error wrapping other runtime exceptions caught during execution.
 */
export async function getCurrentUser(c: Context): Promise<User | null> {
	const supabase = getSupabase(c);

	// Key piece of logic
	// It returns user is user.data
	// It returns null if !user.data
	// It throws an error IF the error != AuthSessionError

	try {
		console.log("[getCurrentUser] Attempting to get user...");
		const { data, error } = await supabase.auth.getUser();

		if (error) {
			// Check name first for the specific non-AuthApiError case
			if (error.name === "AuthSessionMissingError") {
				console.log(
					`[getCurrentUser] Handled expected auth condition: name - ${error.name} code - ${error.code}. Returning null.`,
				);
				return null;
			}

			// Then check if it's an AuthApiError with a code in our set
			if (isAuthApiError(error) && error.code && NO_VALID_SESSION_ERRORS.has(error.code)) {
				// We now know error.code is a string and it's in the set
				console.log(
					`[getCurrentUser] Handled expected auth condition: ${error.code}. Returning null.`,
				);
				return null;
			}

			// Not a session error, throw it
			console.error("[getCurrentUser] Error during authentication occurred:", error);
			throw error;
		}
		// we have a user
		console.log("[getCurrentUserOrNull] User retrieved successfully:", data?.user?.id);
		return data?.user ?? null;
	} catch (err) {
		// If it's already an AuthError that was re-thrown, just throw it again
		if (isAuthApiError(err) || err instanceof Error) {
			console.error("[getCurrentUser] Unexpected runtime error:", err);
			throw err;
		}

		// If it's something else entirely (unlikely in JS/TS), wrap that too
		throw new Error(`[getCurrentUser] Unexpected non-Error thrown: ${err}`);
	}
}
