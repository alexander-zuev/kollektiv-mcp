import type {AuthError} from '@supabase/supabase-js';
import {logger} from '@/shared/lib/logger';

/**
 * Comprehensive error handler for Supabase Auth errors
 * Based on https://supabase.com/docs/guides/auth/debugging/error-codes
 */
export function getAuthErrorMsg(error: unknown, context: string = 'auth'): string {
    // If it's a Supabase AuthError with a code
    if (error && typeof error === 'object' && 'code' in error) {
        const authError = error as AuthError;
        const errorCode = authError.code || '';

        // Log the error with context
        logger.error(`${context} error [${errorCode}]:`, authError);

        // Authentication API errors (401)
        if (errorCode === 'auth/invalid-email') {
            return 'The email address format is invalid.';
        }
        if (errorCode === 'auth/invalid-password') {
            return 'The password must be at least 6 characters.';
        }
        if (errorCode === 'auth/email-already-in-use') {
            return 'This email address is already in use.';
        }
        if (errorCode === 'auth/weak-password') {
            return 'The password is too weak. Please use a stronger password.';
        }
        if (errorCode === 'auth/user-not-found') {
            return 'No account found with this email address.';
        }
        if (errorCode === 'auth/wrong-password') {
            return 'Incorrect password. Please try again.';
        }

        // User API errors (400)
        if (errorCode === 'user_already_exists') {
            return 'A user with this email already exists.';
        }
        if (errorCode === 'user_not_found') {
            return 'User not found.';
        }

        // OAuth errors
        if (errorCode === 'auth/popup-closed-by-user') {
            return 'The sign-in popup was closed before completing authentication.';
        }
        if (errorCode === 'auth/popup-blocked') {
            return 'The sign-in popup was blocked by your browser. Please allow popups for this site.';
        }
        if (errorCode === 'auth/account-exists-with-different-credential') {
            return 'An account already exists with the same email but different sign-in credentials.';
        }

        // Rate limiting errors
        if (errorCode === 'auth/too-many-requests') {
            return 'Too many requests. Please try again later.';
        }

        // Session errors
        if (errorCode === 'auth/invalid-credential') {
            return 'Invalid credentials. Please sign in again.';
        }
        if (errorCode === 'auth/invalid-session') {
            return 'Your session has expired. Please sign in again.';
        }
        if (errorCode === 'auth/session-expired') {
            return 'Your session has expired. Please sign in again.';
        }

        // Network errors
        if (errorCode === 'auth/network-request-failed') {
            return 'Network error. Please check your internet connection and try again.';
        }

        // Server errors (500)
        if (errorCode === 'auth/internal-error') {
            return 'An internal error occurred. Please try again later.';
        }

        // Default case for other auth errors
        if (authError.message) {
            return authError.message;
        }
    }

    // For network errors
    if (error instanceof Error && error.message.includes('network')) {
        logger.error(`${context} network error:`, error);
        return 'Network error. Please check your internet connection and try again.';
    }

    // For general errors
    logger.error(`${context} unknown error:`, error);
    return error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
}