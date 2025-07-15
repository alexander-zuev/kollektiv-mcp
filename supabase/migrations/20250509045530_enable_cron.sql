-- Uncomment when resetting db locally
-- On prod the extension already exists
-- Conditionally create pg_cron extension and grant usage
DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
            CREATE EXTENSION pg_cron;
        END IF;
    END
$$;