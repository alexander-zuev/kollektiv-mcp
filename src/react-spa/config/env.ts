import {z} from 'zod';
import {fromError} from 'zod-validation-error';

// Define schema for environment variables
const envSchema = z.object({
    // App
    MODE: z.enum(['development', 'production', 'staging', 'test']).default('development'),

    // Sentry
    VITE_SENTRY_DSN: z.string().optional(),

    // Supabase
    VITE_SUPABASE_URL: z.string(),
    VITE_SUPABASE_KEY: z.string(),

    // Posthog
    VITE_PUBLIC_POSTHOG_KEY: z.string(),
    VITE_PUBLIC_POSTHOG_HOST: z.string(),


    // Cloudflare
    VITE_TURNSTILE_SITE_KEY: z.string(),
});

// Extract env variables from import.meta.env
const envVars = {
    MODE: import.meta.env.MODE,

    // Sentry
    VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,

    // Supabase
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_KEY: import.meta.env.VITE_SUPABASE_KEY,

    // Posthog
    VITE_PUBLIC_POSTHOG_KEY: import.meta.env.VITE_PUBLIC_POSTHOG_KEY,
    VITE_PUBLIC_POSTHOG_HOST: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,


    // Cloudflare
    VITE_TURNSTILE_SITE_KEY: import.meta.env.VITE_TURNSTILE_SITE_KEY,
};

// Function to validate environment variables
export function validateEnv(): z.infer<typeof envSchema> {
    try {
        return envSchema.parse(envVars);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const validationError = fromError(error);
            console.error('Configuration Error:');
            console.error(validationError.message);
            throw new Error(`Configuration Error: ${validationError.message}`);
        }
        throw error;
    }
}

// Export validated environment variables
export const env = validateEnv();