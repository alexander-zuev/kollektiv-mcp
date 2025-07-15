import { usePostHog } from 'posthog-js/react';
import { useAuthStore } from '@/features/auth';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { logger } from '@/shared/lib';

export const usePosthogUser = () => {
  const posthog = usePostHog();
  const { userId, email } = useAuthStore(
    useShallow(state => ({
      userId: state.user?.id,
      email: state.user?.email,
    }))
  );

  useEffect(() => {
    if (userId) {
      logger.debug(`Posthog user changed, calling posthog.identify`);
      posthog.identify(userId, {
        email: email,
      });
    } else {
      logger.debug(`Posthog user reset`);
      posthog.reset();
    }
  }, [userId, email, posthog]);
};