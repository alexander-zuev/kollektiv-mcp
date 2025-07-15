import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

// Define schema for environment variables
const envSchema = z.object({
  // App
  MODE: z.enum(['development', 'production', 'staging', 'test']).default('development'),

  // Internal infrastructure
  VITE_API_BASE_URL: z.string(),

  // Sentry
  VITE_SENTRY_DSN: z.string().optional(),

  // Supabase
  VITE_SUPABASE_URL: z.string(),
  VITE_SUPABASE_KEY: z.string(),

  // Posthog
  VITE_PUBLIC_POSTHOG_KEY: z.string(),
  VITE_PUBLIC_POSTHOG_HOST: z.string(),

  // Payments
  // VITE_STRIPE_PUBLISHABLE_KEY: z.string(),

  // Cloudflare
  // VITE_TURNSTILE_SITE_KEY: z.string(),
});

// Extract env variables from import.meta.env
const envVars = {
  MODE: import.meta.env.MODE,

  // Sentry
  VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,

  // Supabase
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_KEY: import.meta.env.VITE_SUPABASE_KEY,

  // API
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,

  // Posthog
  VITE_PUBLIC_POSTHOG_KEY: import.meta.env.VITE_PUBLIC_POSTHOG_KEY,
  VITE_PUBLIC_POSTHOG_HOST: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,

  // Stripe
  // VITE_STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,

  // Cloudflare
  // VITE_TURNSTILE_SITE_KEY: import.meta.env.VITE_TURNSTILE_SITE_KEY,
};

// Function to validate environment variables
export function validateEnv(): z.infer<typeof envSchema> {
  try {
    return envSchema.parse(envVars);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error);
      console.error('Configuration Error:');
      console.error(validationError.message);
      throw new Error(`Configuration Error: ${validationError.message}`);
    }
    throw error;
  }
}

// Export validated environment variables
export const env = validateEnv();
