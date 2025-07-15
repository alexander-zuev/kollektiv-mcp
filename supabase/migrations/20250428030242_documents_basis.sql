-- Create table
CREATE TABLE IF NOT EXISTS public.documents
(
    id                UUID PRIMARY KEY,
    user_id           UUID REFERENCES auth.users (id) ON DELETE CASCADE,
    original_filename VARCHAR(255) NOT NULL,
    storage_key       TEXT         NOT NULL UNIQUE,
    content_type      VARCHAR(100) NOT NULL,
    checksum          CHAR(64)     NOT NULL,
    filesize          BIGINT       NOT NULL,
    status            TEXT         NOT NULL CHECK (status IN ('processing', 'available', 'failed',
                                                              'deleted')),
    uploaded_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Add comment to explain table purpose
COMMENT ON TABLE public.documents IS 'Stores documents uploaded by users to Kollektiv application';


-- Create index
CREATE INDEX IF NOT EXISTS documents_user_id_idx ON public.documents (user_id);

-- Enable RLS
ALTER TABLE public.documents
    ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "No access for anonymous users" ON public.documents
    FOR ALL
    TO anon
    USING (false)
    WITH CHECK (false);

-- SELECT
CREATE POLICY documents_select_policy ON public.documents
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- UPDATE
CREATE POLICY documents_update_policy ON public.documents
    FOR UPDATE
    TO authenticated
    WITH CHECK (user_id = auth.uid());
-- INSERT
CREATE POLICY documents_insert_policy ON public.documents
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- DELETE
CREATE POLICY documents_delete_policy ON public.documents
    FOR DELETE
    TO authenticated
    USING (user_id = auth.uid());



-- Create trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_updated_at_column
    BEFORE UPDATE
    ON public.documents
    FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create a trigger to mark documents as deleted when the user is deleted
CREATE OR REPLACE FUNCTION public.mark_documents_deleted_on_user_delete()
    RETURNS TRIGGER AS
$$
BEGIN
    -- Update documents to mark them as deleted
    UPDATE public.documents
    SET status  = 'deleted',
        user_id = NULL
    WHERE user_id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_documents_on_user_delete
    BEFORE DELETE
    ON auth.users
    FOR EACH ROW
EXECUTE FUNCTION public.mark_documents_deleted_on_user_delete();

ALTER FUNCTION public.mark_documents_deleted_on_user_delete()
    SECURITY DEFINER;