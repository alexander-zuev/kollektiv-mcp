CREATE TABLE IF NOT EXISTS query_stats
(
    id         UUID PRIMARY KEY     DEFAULT uuid_generate_v4(),
    user_id    UUID REFERENCES auth.users (id),
    query      TEXT        NOT NULL,
    response   TEXT        NOT NULL,
    success    BOOLEAN     NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add comment to explain table purpose
COMMENT ON TABLE public.query_stats IS
    'Captures basic metadata for analysis of user queries/responses';

CREATE INDEX IF NOT EXISTS query_stats_user_id_idx ON query_stats (user_id); -- renamed


ALTER TABLE query_stats
    ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "No access for anonymous users" ON query_stats
    FOR ALL
    TO anon
    USING (false)
    WITH CHECK (false);


-- Allow users to see only their stats
CREATE POLICY users_view_own_stats ON query_stats
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- UPDATE
CREATE POLICY users_update_stats ON query_stats
    FOR UPDATE
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- INSERT
CREATE POLICY users_insert_stats ON query_stats
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE MATERIALIZED VIEW IF NOT EXISTS query_stats_view AS
SELECT user_id,
       COUNT(*)                               AS total_queries,
       COUNT(*) FILTER (where SUCCESS = true) AS successful_queries
FROM query_stats
GROUP BY user_id;

ALTER MATERIALIZED VIEW query_stats_view OWNER TO postgres;


CREATE UNIQUE INDEX IF NOT EXISTS query_stats_view_user_id_idx
    ON query_stats_view (user_id);


CREATE OR REPLACE FUNCTION refresh_query_stats()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    SECURITY DEFINER
AS
$$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY query_stats_view;
    RETURN NULL;
END;
$$;
ALTER FUNCTION refresh_query_stats() OWNER TO postgres;


CREATE TRIGGER query_stats_refresh_mv
    AFTER INSERT OR UPDATE OR DELETE
    ON query_stats
    FOR EACH STATEMENT
EXECUTE FUNCTION refresh_query_stats();