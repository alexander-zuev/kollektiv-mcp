-- 1. Drop the response column. Deprecated as of 20.05.2025
ALTER TABLE query_stats
    DROP COLUMN IF EXISTS response;


-- 2. Rename for clarity (new as of 2025-05-21)
ALTER TABLE query_stats
    RENAME COLUMN query TO original_query;

-- 3. Add new fields (all new as of 2025-05-21)
ALTER TABLE query_stats
    ADD COLUMN query_context       TEXT    NOT NULL DEFAULT 'Unknown', -- New: stores query context
    ADD COLUMN rewritten_queries   JSONB   NOT NULL DEFAULT '[]', -- New: stores rewritten queries as array
    ADD COLUMN response_chunks     JSONB   NOT NULL DEFAULT '[]', -- New: stores retrieved chunks as array
    ADD COLUMN number_of_chunks    integer NOT NULL DEFAULT 0, -- New: count of chunks returned
    ADD COLUMN duration_ms         integer NOT NULL DEFAULT 0, -- New: query duration in ms
    ADD COLUMN avg_relevance_score float   NOT NULL DEFAULT 0, -- New: mean relevance
    ADD COLUMN max_relevance_score float   NOT NULL DEFAULT 0, -- New: max relevance
    ADD COLUMN error_type          TEXT, -- New: error type, nullable
    ADD COLUMN error_message       TEXT;


-- 4. Cleanup function

CREATE OR REPLACE FUNCTION cleanup_30days_old_query_stats()
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
AS
$$
DECLARE
    deleted_count integer := 0;
BEGIN
    DELETE
    FROM query_stats
    WHERE created_at < now() - interval '30 days';
    GET DIAGNOSTICS deleted_count = ROW_COUNT;

    RAISE NOTICE 'Deleted % rows', deleted_count;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Failed to delete % rows: %', deleted_count, SQLERRM;
END;
$$;

-- 5. Schedule to run daily
SELECT cron.schedule(
               'daily_query_stats_cleanup',
               '0 2 * * *',
               $$CALL cleanup_30days_old_query_stats();$$
       )