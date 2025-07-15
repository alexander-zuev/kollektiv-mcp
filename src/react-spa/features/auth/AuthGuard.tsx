// AuthGuard component that protects routes requiring authentication
// Redirects unauthenticated users to the sign-in page
import { LoadingSpinner } from '@/components';
import { logger } from '@/shared/lib/logger';
import { ROUTES } from 'src/routing';
import React, { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/AuthStore';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard component that protects routes requiring authentication
 *
 * This component:
 * 1. Checks if auth is initialized (prevents premature redirects)
 * 2. Verifies user authentication status
 * 3. Redirects to sign-in if not authenticated
 * 4. Renders children if authenticated
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({ children }): JSX.Element => {
  const Session = useAuthStore(state => state.session);
  const isInitialized = useAuthStore(state => state.isInitialized);

  const location = useLocation();

  // Show loading state while auth is initializing
  if (!isInitialized) {
    logger.info('Auth is not initialized, showing loading state');
    return (
      <div className="flex-center min-h-screen">
        <LoadingSpinner size="lg" text="Authenticating..." />
      </div>
    );
  }

  // Check for authenticated user
  // Session is preferred as it contains the actual auth token
  if (!Session) {
    logger.info('User is not authenticated, redirecting to sign-in');
    // Redirect to sign-in page, but remember where they were trying to go
    return <Navigate to={ROUTES.AUTH.SIGNIN} state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected content
  logger.info('User is authenticated, rendering protected content');
  return <>{children}</>;
};