-- Supabase variables are stored as secrets in Supabase
-- SUPABASE_URL
-- SUPABASE_ANON_KEY

-- Create a Cron job to invoke the user-feedback Edge Function every 30 minutes
select cron.schedule(
               'invoke-user-feedback-function', -- name of the cron job
               '*/30 * * * *', -- every 30 minutes
               $$
       select net.http_post(
       url:='https://hodvxoijafqmxbnmqbzh.supabase.co/functions/v1/user-feedback',
       headers:=jsonb_build_object('Content-Type','application/json', 'Authorization', 'Bearer '
       || (select decrypted_secret from vault.decrypted_secrets where name = 'SUPABASE_ANON_KEY')),
       body:=concat('{"time": "', now(), '"}')::jsonb
       ) as request_id;
       $$
       )