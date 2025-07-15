import { JSX, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import AuthLayout from '@/components/layouts/AuthLayout';
import { LoadingSpinner, Logo } from '@/components'; // adjust import paths if needed
import { Button } from '@/components/ui/atoms/buttons';
import { ROUTES } from '@/routing/config';
import { toast } from 'sonner';
import { logger } from '@/shared/lib/logger';
import { supabase } from '@/shared/services/supabaseClient.ts';
import { EmailOtpType } from '@supabase/supabase-js'; // ← your singleton Supabase client

type Status = 'loading' | 'success' | 'error';

const OTPConfirmation = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState<string>('Verifying your link…');
  const [hasShownSuccess, setHasShownSuccess] = useState(false);

  // Show success toast when status changes to success
  useEffect(() => {
    if (status === 'success' && !hasShownSuccess) {
      toast.success('Email confirmed! Taking you to the app…');
      setHasShownSuccess(true);
    }
  }, [status, hasShownSuccess]);

  useEffect(() => {
    const tokenHash = searchParams.get('token_hash') ?? searchParams.get('token');
    const type = searchParams.get('type') as EmailOtpType;

    if (!tokenHash || !type) {
      setStatus('error');
      setMessage('Missing or malformed verification link.');
      return;
    }

    (async () => {
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type,
      });

      if (error || !data.session) {
        logger.error('OTP verification failed', error);
        setStatus('error');
        setMessage(error?.message ?? 'Verification failed.');
        toast.error(error?.message ?? 'Verification failed. Please try signing in again.');

        // Give the user ~2 s to read, then bounce to sign-in
        setTimeout(() => navigate(ROUTES.HOME), 2000);
        return;
      }

      // Success 🎉
      setStatus('success');
      setMessage('You are now logged-in! Redirecting…');

      // Short delay so the user sees the success state
      setTimeout(() => navigate(ROUTES.HOME), 1500);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center">
        <Logo variant="icon" size="xl" />

        {status === 'loading' && (
          <>
            <LoadingSpinner size="lg" text="" />
            <p>{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <h2 className="text-2xl font-semibold">Success!</h2>
            <p>{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <h2 className="text-2xl font-semibold text-destructive">Whoops…</h2>
            <p className="max-w-xs">{message}</p>
            <Button onClick={() => navigate(ROUTES.HOME)}>Back to sign-in</Button>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default OTPConfirmation;