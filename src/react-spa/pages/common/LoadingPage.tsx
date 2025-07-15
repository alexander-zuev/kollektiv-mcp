import { LoadingSpinner } from '@/components';
import { JSX } from 'react';

export const LoadingFallbackPage = (): JSX.Element => {
  return (
    <div className="flex-center  min-h-screen p-4 bg-background">
      <LoadingSpinner size="md" text="Loading..." />
    </div>
  );
};