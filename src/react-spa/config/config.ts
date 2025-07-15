// Define zod schema based on env
import { env } from './env';

// Derived configuration values
const isDevelopment = env.MODE === 'development';
const isStaging = env.MODE === 'staging';
const isProduction = env.MODE === 'production';

// Export configuration object
export const config = {
  // Environment
  mode: env.MODE,
  isDevelopment,
  isProduction,

  // Logging configuration
  logging: {
    level: isDevelopment ? 0 : 3,
    enableConsole: true,
  },

  // Sentry configuration
  sentry: {
    dsn: env.VITE_SENTRY_DSN,
    environment: env.MODE,
    sampleRate: 1.0, // 100% of errors must be sent (at least at the start)
    tracesSampleRate: 0.25, // 25% of traces will be sent
    profilesSampleRate: 0.8, // relative to tracesSampleRate so only 25% * 80% == 20% of transactions will be sampled
  },

  // Supabase configuration
  supabase: {
    url: env.VITE_SUPABASE_URL,
    anonKey: env.VITE_SUPABASE_KEY,
  },

  // Site configuration
  site: {
    // Base URL for the site (used for auth redirects and absolute URLs)
    url: isDevelopment
      ? 'http://127.0.0.1:5173'
      : isStaging
        ? 'https://staging.thekollektiv.ai'
        : 'https://thekollektivai.ai',
  },

  // API configuration
  api: {
    baseUrl: env.VITE_API_BASE_URL,
  },

  // Stripe configuration
  stripe: {
    // publishableKey: env.VITE_STRIPE_PUBLISHABLE_KEY,
  },

  //PostHog configuration
  posthog: {
    apiKey: env.VITE_PUBLIC_POSTHOG_KEY,
    apiHost: env.VITE_PUBLIC_POSTHOG_HOST,
  },

  // Cloudflare turnstile
  turnstile: {
    // siteKey: env.VITE_TURNSTILE_SITE_KEY,
  },

  // Cloudflare Images configuration
  cloudflareImages: {
    accountHash: 'hFXFgrXHjrW-8sAV01LzZw',
    accountId: '9c02a0ea65440e5ee7d5b62990934324',
    defaultVariant: 'public',
  },
};
