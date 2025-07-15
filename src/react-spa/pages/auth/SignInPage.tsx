import AuthLayout from '@/components/layouts/AuthLayout';
import { Logo } from '@/components/ui/atoms';
import { Button } from '@/components/ui/atoms/buttons';
import { TurnstileWidget } from '@/components/ui/security/turnstile-widget';
import { config } from '@/config/config';
import { SignInCard } from '@/features/auth/components/SignInCard';
import { EmailFormValues, SignInForm } from '@/features/auth/components/SignInForm';
import { authService } from '@/features/auth/services/authService';
import { getAuthErrorMsg } from '@/features/auth/utils/authErrorHelper';
import { toast } from 'sonner';
import { logger } from '@/shared/lib/logger';
import { ROUTES } from '@/routing/config';
import React, { JSX, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * SignInPage - Container component that handles authentication logic
 *
 * This component:
 * 1. Manages authentication state
 * 2. Handles form submissions and OAuth requests
 * 3. Composes the UI components (AuthCard, OAuthButtons, EmailForm)
 */
export const SignInPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { signInWithOtp, signInWithOAuth } = authService();
  const [turnstileToken, setTurnstileToken] = useState('');

  const handleEmailSubmit = useCallback(
    async (data: EmailFormValues): Promise<void> => {
      setIsLoading(true);
      try {
        const result = await signInWithOtp(
          data.email,
          `${config.site.url}${ROUTES.HOME}`,
          turnstileToken
        );
        if (result.success) {
          toast("We've sent you a login link. If you don't see it, please check your spam folder.");
        } else {
          toast(result.message || 'Failed to send login link');
        }
      } catch (error) {
        const errorMessage = getAuthErrorMsg(error, 'email_sign_in');
        logger.error('Email sign in failed:', error);
        toast(errorMessage);
      } finally {
        setIsLoading(false); // Always reset loading state
      }
    },
    [signInWithOtp, turnstileToken]
  );

  const handleGitHubSignIn = useCallback((): void => {
    setIsLoading(true);
    try {
      logger.info('GitHub sign in');
      signInWithOAuth('github', `${config.site.url}${ROUTES.HOME}`);
    } catch (error) {
      const errorMessage = getAuthErrorMsg(error, 'github_sign_in');
      logger.error('GitHub sign in failed:', error);
      toast(errorMessage);
    } finally {
      setIsLoading(false); // Always reset loading state
    }
  }, [signInWithOAuth]);

  const handleGoogleSignIn = useCallback((): void => {
    setIsLoading(true);
    try {
      logger.info('Google sign in');
      signInWithOAuth('google', `${config.site.url}${ROUTES.HOME}`);
    } catch (error) {
      const errorMessage = getAuthErrorMsg(error, 'google_sign_in');
      logger.error('Google sign in failed:', error);
      toast(errorMessage);
    } finally {
      setIsLoading(false); // Always reset loading state
    }
  }, [signInWithOAuth]);

  // Memoize the Logo component since it never changes
  const MemoizedLogo = useMemo(
    () => (
      <Link to={ROUTES.HOME}>
        <Logo variant="icon" size="xl" className="mb-6" />
      </Link>
    ),
    []
  );

  // Memoize the SignInForm to prevent re-renders when turnstileToken changes
  const MemoizedSignInForm = useMemo(
    () => <SignInForm onSubmit={handleEmailSubmit} isLoading={isLoading} />,
    [handleEmailSubmit, isLoading]
  );

  // Memoize the SignInCard to prevent re-renders when turnstileToken changes
  const MemoizedSignInCard = useMemo(
    () => (
      <SignInCard
        title="Welcome to Query"
        description="Manage your database through natural language"
        onGitHubSignIn={handleGitHubSignIn}
        onGoogleSignIn={handleGoogleSignIn}
        isLoading={isLoading}
        className="animate-fade-in"
      >
        {MemoizedSignInForm}
      </SignInCard>
    ),
    [handleGitHubSignIn, handleGoogleSignIn, isLoading, MemoizedSignInForm]
  );

  // Memoize the TurnstileWidget to isolate its re-renders
  const MemoizedTurnstileWidget = useMemo(
    () => <TurnstileWidget onTokenChange={setTurnstileToken} />,
    []
  );

  return (
    <AuthLayout>
      {MemoizedLogo}
      {MemoizedSignInCard}
      {MemoizedTurnstileWidget}
    </AuthLayout>
  );
};

export default SignInPage;