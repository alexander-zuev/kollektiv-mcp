// import { TurnstileWidget } from '@/components/ui/security/turnstile-widget';

import React, {useCallback, useMemo, useState} from 'react';
import {toast} from 'sonner';
import {Dialog, DialogContent, DialogDescription, DialogTitle} from '@/components/ui'; // shadcn alias
import {config} from '@/config/config';
import {SignInCard} from '@/features/auth/components/SignInCard';
import {type EmailFormValues, SignInForm} from '@/features/auth/components/SignInForm';
import {authService} from '@/features/auth/services/authService';
import {getAuthErrorMsg} from '@/features/auth/utils/authErrorHelper';
import {logger} from '@/shared/lib/logger';
import {cn} from '@/shared/utils';

/**
 * LoginModal - Container component that handles authentication logic
 *
 * This component:
 * 1. Manages authentication state
 * 2. Handles form submissions and OAuth requests
 * 3. Composes the UI components (AuthCard, OAuthButtons, EmailForm)
 */
export const LoginModal = ({
                               open,
                               onOpenChange,
                           }: {
    open: boolean;
    onOpenChange: (v: boolean) => void;
}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const {signInWithOtp, signInWithOAuth} = authService();
    const [turnstileToken, setTurnstileToken] = useState('');

    const handleEmailSubmit = useCallback(
        async (data: EmailFormValues): Promise<void> => {
            setIsLoading(true);
            try {
                const result = await signInWithOtp(
                    data.email,
                    `${config.site.url}/`,
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
            signInWithOAuth('github', `${config.site.url}/`);
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
            signInWithOAuth('google', `${config.site.url}/`);
        } catch (error) {
            const errorMessage = getAuthErrorMsg(error, 'google_sign_in');
            logger.error('Google sign in failed:', error);
            toast(errorMessage);
        } finally {
            setIsLoading(false); // Always reset loading state
        }
    }, [signInWithOAuth]);

    // Memoize the SignInForm to prevent re-renders when turnstileToken changes
    const MemoizedSignInForm = useMemo(
        () => <SignInForm onSubmit={handleEmailSubmit} isLoading={isLoading}/>,
        [handleEmailSubmit, isLoading]
    );

    // Memoize the TurnstileWidget to isolate its re-renders
    // const MemoizedTurnstileWidget = useMemo(
    //   () => <TurnstileWidget onTokenChange={setTurnstileToken} />,
    //   []
    // );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                hideCloseButton={true}
                className={cn(
                    'p-0 align-middle bg-transparent border-none shadow-none component-width-card' // Use card width here
                )}
            >
                <DialogTitle className="sr-only">Login to Kollektiv</DialogTitle>
                <DialogDescription className="sr-only">Login to be able to upload
                    files</DialogDescription>

                <SignInCard
                    title="Kollektiv"
                    description="Login to be able to upload files"
                    onGitHubSignIn={handleGitHubSignIn}
                    onGoogleSignIn={handleGoogleSignIn}
                    isLoading={isLoading}
                    onClose={() => onOpenChange(false)}
                >
                    {MemoizedSignInForm}
                </SignInCard>
                {/*{MemoizedTurnstileWidget}*/}
            </DialogContent>
        </Dialog>
    );
};