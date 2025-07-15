import { LoadingSpinner } from '@/components';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Logo } from '@/components/ui/atoms';
import { Button } from '@/components/ui/atoms/buttons';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/atoms/inputs/input-otp';
import { config } from '@/config/config';
import { authService } from '@/features/auth/services/authService';
import { useAuthStore } from '@/features/auth/store/AuthStore';
import { getAuthErrorMsg } from '@/features/auth/utils/authErrorHelper';
import { toast } from 'sonner';
import { logger } from '@/shared/lib/logger';
import { ROUTES } from '@/routing/config';
import { Turnstile } from '@marsidev/react-turnstile';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

export const OneTimePassPage = (): JSX.Element => {
  const [otp, setOtp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resendCountdown, setResendCountdown] = useState<number>(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { verifyOtp, signInWithOtp } = authService();
  const submittingRef = useRef(false);
  const [turnstileToken, setTurnstileToken] = useState('');

  // Use shallow selector for better performance
  const { User, Session } = useAuthStore(
    useShallow(state => ({
      User: state.user,
      Session: state.session,
    }))
  );
  const TurnstileWidget = useCallback(() => {
    return (
      <Turnstile
        siteKey={config.turnstile.siteKey}
        onSuccess={token => {
          console.log('Turnstile token:', token);
          setTurnstileToken(token);
        }}
        options={{
          theme: 'dark',
        }}
        className="mt-4"
      />
    );
  }, []);

  // Check if user is already authenticated
  useEffect(() => {
    if (User && Session) {
      logger.info('User already authenticated, redirecting to dashboard');
      navigate(ROUTES.APP.ROOT);
    }
  }, [User, Session, navigate]);

  // Rate limiting state
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [cooldownActive, setCooldownActive] = useState<boolean>(false);
  const [cooldownTimer, setCooldownTimer] = useState<number>(0);
  const MAX_ATTEMPTS = 5;
  const COOLDOWN_PERIOD = 60; // seconds

  const submitOtp = useCallback(
    async (otpValue = otp) => {
      // Prevent multiple submissions
      if (otpValue.length !== 6 || !email || isLoading || submittingRef.current) return;

      // Check rate limiting
      if (cooldownActive) {
        toast(`Please wait ${cooldownTimer} seconds before trying again`);
        return;
      }

      try {
        if (attemptCount >= MAX_ATTEMPTS) {
          setCooldownActive(true);
          setCooldownTimer(COOLDOWN_PERIOD);
          toast(
            `You've reached the maximum number of attempts. Please wait ${COOLDOWN_PERIOD} seconds.`
          );
          return;
        }

        submittingRef.current = true;
        setIsLoading(true);

        logger.info('Verifying OTP');
        const result = await verifyOtp(email, otp, turnstileToken);

        // Increment attempt counter regardless of success/failure
        setAttemptCount(prev => prev + 1);

        if (!result.success) {
          logger.error('OTP verification failed:', result.message);
          toast(result.message);
          setOtp(''); // Reset on failure
        }
      } catch (error) {
        // Increment attempt counter on error too
        setAttemptCount(prev => prev + 1);

        logger.error('Error during OTP verification:', error);
        toast('Please try again or request a new code');
        setOtp(''); // Reset on error
      } finally {
        setIsLoading(false);
        submittingRef.current = false;
      }
    },
    [otp, email, verifyOtp, isLoading, attemptCount, cooldownActive, cooldownTimer, turnstileToken]
  );

  // Extract params from email if available
  useEffect(() => {
    const emailParam = searchParams.get('email');
    const tokenParam = searchParams.get('token');

    if (emailParam) {
      setEmail(emailParam);
    }

    if (tokenParam) {
      setOtp(tokenParam);
      // Auto-submit if we have both email and token from URL
      if (emailParam && tokenParam.length === 6 && !submittingRef.current) {
        // Increased delay to 500ms to ensure state is updated
        const timer = setTimeout(() => {
          submitOtp();
        }, 1000);
        return () => clearTimeout(timer);
      }
    }

    // Clear URL params after extraction to prevent infinite submissions
    if (emailParam || tokenParam) {
      navigate('/otp', { replace: true });
    }
  }, [searchParams, submitOtp, navigate]);

  // Handle countdown timer for resend button
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (resendCountdown > 0) {
      timerId = setTimeout(() => {
        setResendCountdown(prev => prev - 1);
      }, 1000);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [resendCountdown]);

  // Handle cooldown timer
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (cooldownActive && cooldownTimer > 0) {
      timerId = setTimeout(() => {
        setCooldownTimer(prev => prev - 1);
      }, 1000);
    } else if (cooldownActive && cooldownTimer === 0) {
      setCooldownActive(false);
      setAttemptCount(0);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [cooldownActive, cooldownTimer]);

  // Handle Enter key press
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && otp.length === 6) {
        submitOtp();
      }
    },
    [otp, submitOtp]
  );

  // Memoize the change handler to prevent unnecessary re-renders
  const handleChange = useCallback(
    (value: string) => {
      setOtp(value);

      // Only proceed if the new value has exactly 6 characters
      if (value.length === 6) {
        submitOtp(value);
      }
    },
    [submitOtp]
  );

  const handleResendCode = useCallback(async () => {
    if (!email) {
      toast.error('No email provided to resend the verification code.');
      return;
    }

    if (resendCountdown > 0 || isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      logger.info('Resending OTP');
      const result = await signInWithOtp(email);

      if (result.success) {
        toast.success('A new verification code has been sent to your email');
        // Start the 60-second countdown
        setResendCountdown(60);
      } else {
        toast.error(result.message || 'Failed to send a new verification code.');
      }
    } catch (error) {
      const errorMessage = getAuthErrorMsg(error, 'resend_otp');
      logger.error('Failed to resend OTP:', error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [email, signInWithOtp, isLoading, resendCountdown, setResendCountdown]);

  return (
    <AuthLayout>
      <Link to={ROUTES.HOME}>
        <Button
          variant="ghost"
          className="max-md:w-auto max-md:left-1/2 max-md:-translate-x-1/2 absolute md:left-4 top-4"
        >
          Back home
        </Button>
      </Link>
      <Link to={ROUTES.HOME}>
        <Logo variant="icon" size="xl" className="mb-6" />
      </Link>

      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="">Verify Your Email</h2>
          <p className="text-muted-foreground">
            Enter the 6-digit code sent to {email ? email : 'your email'}
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <div className="flex flex-col items-center space-y-4 w-full">
            <>
              <p className="text-sm text-muted-foreground">
                Didn't receive a code?{' '}
                <Button
                  variant="link"
                  onClick={handleResendCode}
                  className={`${
                    resendCountdown > 0
                      ? 'text-gray-8 cursor-not-allowed'
                      : 'hover:underline focus:outline-none'
                  }`}
                  disabled={resendCountdown > 0 || isLoading}
                >
                  <span className="inline-flex items-center">
                    {isLoading ? <LoadingSpinner size="sm" text="" className="mr-2" /> : null}
                    {resendCountdown > 0 ? `Resend code (${resendCountdown}s)` : 'Resend code'}
                  </span>
                </Button>
              </p>
              <p className="text-sm text-muted-foreground">
                Or{' '}
                <Link
                  to={ROUTES.AUTH.SIGNIN}
                  className="text-sm text-primary hover:underline focus:outline-none"
                >
                  try another method
                </Link>
              </p>
              <TurnstileWidget />
            </>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default OneTimePassPage;