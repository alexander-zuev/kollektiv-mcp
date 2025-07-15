import * as Sentry from "https://deno.land/x/sentry/index.mjs";

export default function initializeSentry() {
    const disabled = (Deno.env.get("SENTRY_DSN") ?? "");
    if (!disabled) return;

    try {
        Sentry.init({
            dsn: Deno.env.get("SENTRY_DSN") ?? "",
            tracesSampleRate: 1.0,
            defaultIntegrations: false,
        });
        Sentry.setTag("region", Deno.env.get("SB_REGION"));
        Sentry.setTag("execution_id", Deno.env.get("SB_EXECUTION_ID"));
        console.log("Sentry initialized");
    } catch (err) {
        console.warn("Sentry initialization skipped:", err);
    }
}

export {Sentry};