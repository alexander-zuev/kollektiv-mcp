create extension if not exists "pgcrypto"; -- for gen_random_uuid()

CREATE TABLE IF NOT EXISTS user_feedback_queue
(
    id         uuid PRIMARY KEY     default gen_random_uuid(),
    user_id    uuid        NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    email_type text        NOT NULL check (email_type IN ('no_upload', 'no_query')),
    status     text        NOT NULL check (status IN ('queued', 'sent', 'failed', 'cancelled')),
    created_at timestamptz NOT NULL DEFAULT now(),
    sent_at    timestamptz
);

-- Only one row per user no matter the type or status
create unique index if not exists uq_user_feedback_email_user_id on public.user_feedback_queue (user_id);

-- Fast lookup for cron job
create index if not exists ix_feedback_email_status_created on public.user_feedback_queue (status, created_at);


-- Function to upsert into the queue
create or replace function public.queue_user_feedback_email(p_user_id uuid, p_email_type text)
    returns void
    language plpgsql
    SECURITY DEFINER
as
$$
begin
    insert into public.user_feedback_queue (user_id, email_type, status)
    values (p_user_id, p_email_type, 'queued')
    on conflict (user_id) do nothing;
end;
$$;


create or replace function public.trg_after_user_signup()
    returns trigger
    language plpgsql
as
$$
begin
    -- do not touch existing users
    perform public.queue_user_feedback_email(new.id, 'no_upload');
    return new;

end;
$$;

drop trigger if exists trg_after_user_signup on auth.users;

create trigger trg_after_user_signup
    after insert
    on auth.users
    for each row
execute function public.trg_after_user_signup();

-- create a trigger function
-- it should change the status from no_query to no_documents or insert a new row
create or replace function public.trg_after_documents_upload()
    returns trigger
    language plpgsql
as
$$
declare
    v_updated_rows integer;
begin
    -- only run on first document for this user
    if (exists(select 1 from documents where user_id = new.user_id and id != new.id)) then
        return new; -- this is not the first doc
    end if;
    -- update existing user
    update public.user_feedback_queue
    set email_type = 'no_query',
        status     = 'queued',
        created_at = now(),
        sent_at    = null
    where user_id = new.user_id
      and status = 'queued'
      and email_type = 'no_upload';


    GET DIAGNOSTICS v_updated_rows = ROW_COUNT;

    IF v_updated_rows = 0 THEN
        RAISE NOTICE 'trg_after_documents_upload: For user_id %, no user_feedback_queue record with email_type="no_upload" was found to update upon first document upload. Check signup trigger or data consistency.', new.user_id;
    END IF;

    return new;
end;
$$;