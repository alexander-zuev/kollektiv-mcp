// src/components/ui/security/turnstile-widget.tsx
import { config } from '@/config/config';
import { logger } from '@/shared/lib/logger';
import { Turnstile as TurnstileOriginal } from '@marsidev/react-turnstile';
import React, { useState } from 'react';

interface TurnstileWidgetProps {
  onTokenChange: (token: string) => void;
  className?: string;
}

export const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  onTokenChange,
  className = '',
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`${className} mt-4`}>
      <TurnstileOriginal
        siteKey={config.turnstile.siteKey}
        onSuccess={token => {
          logger.info('Turnstile verification successful', { tokenLength: token.length });
          setIsLoading(false);
          onTokenChange(token);
        }}
        onError={errorCode => {
          logger.error('Turnstile verification failed', { errorCode });
          setError(`Failed to load (${errorCode})`);
          setIsLoading(false);
          // Don't update the token on error - this will keep it as an empty string
          // which won't be sent to the API
        }}
        onExpire={() => {
          logger.warn('Turnstile token expired');
          setError('CAPTCHA expired');
          // Don't update the token on expire
        }}
        onLoad={() => {
          setIsLoading(false);
        }}
        options={{
          theme: 'dark',
        }}
      />
    </div>
  );
};