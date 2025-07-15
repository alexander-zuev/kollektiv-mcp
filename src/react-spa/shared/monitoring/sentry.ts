import { config } from '@/config';
import * as Sentry from '@sentry/react';

const isProd = config.mode === 'production';

Sentry.init({
  // Use DSN from config
  dsn: config.sentry.dsn,

  enabled: isProd,

  // Environment setting
  environment: config.mode,

  // Sample rate
  sampleRate: config.sentry.sampleRate,

  integrations: [
    // Add browser profiling integration to the list of integrations
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
  ],

  // Set tracesSampleRate to capture performance data
  tracesSampleRate: config.sentry.tracesSampleRate,
  profilesSampleRate: 1.0,

  // Define which URLs should have tracing enabled
  tracePropagationTargets: [
    /^https:\/\/(api|mcp)\.thekollektiv\.ai/, // Allow trace header to be sent to API and MCP
    /^\//, // Keep relative URLs for internal routing
  ],
});

// Export a function to identify users after they log in
export const identifyUser = (user: { id: string; email?: string; username?: string }) => {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.username,
  });
};

// Export the Sentry Error Boundary component for use in your app
export const ErrorBoundary = Sentry.ErrorBoundary;

// Export Sentry itself for direct usage
export { Sentry };
