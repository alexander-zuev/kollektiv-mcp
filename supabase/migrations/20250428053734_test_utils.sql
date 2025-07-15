-- Run this in your SQL editor in Supabase
CREATE OR REPLACE FUNCTION delete_user_by_id(user_id UUID)
    RETURNS VOID AS
$$
BEGIN
    DELETE FROM auth.users WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;