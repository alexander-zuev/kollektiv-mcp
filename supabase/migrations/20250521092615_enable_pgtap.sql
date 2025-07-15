DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pgtap') THEN
            CREATE EXTENSION pgtap;
        END IF;
    END
$$;