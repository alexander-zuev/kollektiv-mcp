import * as Sentry from '@sentry/react';
import { config } from '@/config';
import type { Router } from '@tanstack/react-router';

// Initialize Sentry with TanStack Router integration
export function initSentry(router: Router) {
  Sentry.init({
    dsn: config.sentry.dsn,
    environment: config.sentry.environment,
    integrations: [Sentry.tanstackRouterBrowserTracingIntegration(router)],
    sampleRate: config.sentry.sampleRate,
    tracesSampleRate: config.sentry.tracesSampleRate,
    tracePropagationTargets: [
      'localhost',
      '127.0.0.1:5173',
      /^https:\/\/sensr\.dev$/,
      /^https:\/\/.*\.sensr\.dev$/,
    ],
    profilesSampleRate: config.sentry.profilesSampleRate,
    sendDefaultPii: false,
  });
}

// Export the Sentry Error Boundary component for use in your app
export const ErrorBoundary = Sentry.ErrorBoundary;

// Export Sentry for manual error reporting
export { Sentry };