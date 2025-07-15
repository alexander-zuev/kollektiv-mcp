import {authService} from '@/features/auth';
import {logger} from '@/shared/lib/logger';

/**
 * Responsible for handling auth-related errors by either refreshing session or logging user out.
 *
 * @param statusCode - HTTP status code
 * @param errorCode - Optional error code
 */
export async function authErrorHandler(statusCode: 401 | 403, errorCode?: string): Promise<void> {
    const {signOut, refreshSession} = authService();

    switch (statusCode) {
        case 401:
            // Refresh session
            logger.debug('Retrying authentication');
            const {success} = await refreshSession();

            if (success) {
                // do nothing on success -> this will be handled by the api-http-client http-client
            } else {
                logger.debug('Failed to refresh session, signing out');
                // sign user out
                await signOut();
            }
            break;
        case 403:
            if (errorCode === 'user_banned' || errorCode === 'user_not_found') {
                logger.debug('User banned or not found, signing out');
                // in this case sign user out
                await signOut();
            }
            break;
        default:
            // do nothing - we can't do much
            break;
    }
}