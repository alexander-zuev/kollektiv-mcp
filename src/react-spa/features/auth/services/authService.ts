import { logger } from '@/shared/lib/logger';
import { supabase } from '@/shared/services/supabaseClient';
import { Provider } from '@supabase/supabase-js';
import { getAuthErrorMsg } from '@/features/auth';

// TODO: why the fuck does this NOT raise? We are inventing our own control flow

/**
 * Service provides authentication methods
 *
 * This service:
 * - Exposes methods for authentication (sign in, sign out, OAuth)
 * - Handles errors with the handleAuthError utility
 * - Logs actions with the logger
 * - Does NOT manage auth state (that's handled by AuthStore and listeners)
 * - Does NOT manage loading state (that's handled by the component using this service)
 */
export const authService = () => {
  /**
   * Sign in with magic link (passwordless email)
   * @param email User's email address
   * @param redirectTo Optional URL to redirect to after authentication. Defaults to dashboard.
   * @param captchaToken Optional Turnstile token for verification
   */
  const signInWithOtp = async (email: string, redirectTo?: string, captchaToken?: string) => {
    try {
      logger.info(`Attempting to sign in with OTP: ${email}`, { hasCaptchaToken: !!captchaToken });

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
          captchaToken,
          shouldCreateUser: true,
        },
      });

      if (error) throw error;

      logger.info('OTP sign-in email sent successfully');
      return { success: true, message: 'Check your email for the login link' };
    } catch (error) {
      const errorMessage = getAuthErrorMsg(error, 'signInWithOtp');
      return { success: false, message: errorMessage };
    }
  };

  /**
   * Resend OTP code to user's email
   * @param email User's email address
   * @param redirectTo Optional URL to redirect to after authentication. Defaults to dashboard.
   * @param captchaToken Optional Turnstile token for verification
   */
  const resendOtp = async (email: string, redirectTo?: string, captchaToken?: string) => {
    try {
      logger.info(`Resending OTP for ${email}`, { hasCaptchaToken: !!captchaToken });

      // Use signInWithOtp to resend the code
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
          captchaToken,
        },
      });

      if (error) throw error;

      logger.info('OTP resent successfully');
      return { success: true, message: 'Verification code resent successfully' };
    } catch (error) {
      const errorMessage = getAuthErrorMsg(error, 'resendOtp');
      return { success: false, message: errorMessage };
    }
  };

  /**
   * Sign in with OAuth provider (GitHub, Google, etc.)
   * @param provider OAuth provider (github, google, etc.)
   * @param redirectTo Optional URL to redirect to after authentication. Defaults to dashboard.
   */
  const signInWithOAuth = async (provider: Provider, redirectTo?: string) => {
    try {
      logger.info(`Attempting to sign in with OAuth: ${provider}`);

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectTo,
        },
      });

      if (error) throw error;

      logger.info(`OAuth sign-in with ${provider} initiated`);
      return { success: true };
    } catch (error) {
      const errorMessage = getAuthErrorMsg(error, 'signInWithOAuth');
      return { success: false, message: errorMessage };
    }
  };

  /**
   * Verify OTP token for email authentication
   * @param email User's email address
   * @param token OTP token from email
   * @param captchaToken Optional Turnstile token for verification
   */
  const verifyOtp = async (email: string, token: string, captchaToken?: string) => {
    try {
      logger.info('Verifying OTP', { hasCaptchaToken: !!captchaToken });

      const { error, data } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
        options: {
          captchaToken,
        },
      });

      if (error) throw error;

      logger.info('OTP verified successfully');
      return {
        success: true,
        message: 'Successfully verified',
        session: data.session,
      };
    } catch (error) {
      const errorMessage = getAuthErrorMsg(error, 'verifyOtp');
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  /**
   * Sign out the current user and redirect to home page
   */
  const signOut = async () => {
    try {
      logger.info('Signing out user');

      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      logger.info('User signed out successfully');

      return { success: true };
    } catch (error) {
      const errorMessage = getAuthErrorMsg(error, 'signOut');
      logger.error('Sign out failed', { error: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  const refreshSession = async () => {
    try {
      logger.debug('Refreshing session');

      const { error } = await supabase.auth.refreshSession();
      if (error) throw error;

      logger.info('Session refreshed successfully');
      return { success: true };
    } catch (error) {
      const errorMessage = getAuthErrorMsg(error, 'refreshSession');
      logger.error('Refresh session failed', { error: errorMessage });
      return { success: false, message: errorMessage };
    }
  };

  return {
    signInWithOtp,
    verifyOtp,
    resendOtp,
    signInWithOAuth,
    signOut,
    refreshSession,
  };
};