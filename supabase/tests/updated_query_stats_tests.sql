begin;
select plan(4);

-- 1. Happy path: Insert two rows, one old and one recent, then run cleanup

-- Insert a row older than 30 days (should be deleted)
insert into query_stats (original_query, query_context, rewritten_queries, response_chunks,
                         number_of_chunks, duration_ms, avg_relevance_score, max_relevance_score,
                         created_at, success)
values ('old', 'ctx', '[]', '[]', 1, 100, 0.5, 0.5, now() - interval '31 days', true);

-- Insert a recent row (should remain)
insert into query_stats (original_query, query_context, rewritten_queries, response_chunks,
                         number_of_chunks, duration_ms, avg_relevance_score, max_relevance_score,
                         created_at, success)
values ('recent', 'ctx', '[]', '[]', 1, 100, 0.5, 0.5, now(), true);

-- Run the cleanup function
select cleanup_30days_old_query_stats();

-- Assert: Old row is gone
select is(
               (select count(*)::integer from query_stats where original_query = 'old'),
               0,
               'Old rows deleted'
       );

select is(
               (select count(*)::integer from query_stats where original_query = 'recent'),
               1,
               'Recent row remains'
       );

-- 2. Error handling: Revoke DELETE permission, function should not crash the transaction

-- Temporarily revoke DELETE permission
revoke delete on query_stats from current_user;

-- The function should not crash, just log a warning
select lives_ok(
               $$ select cleanup_30days_old_query_stats(); $$,
               'Function handles error gracefully (no crash)'
       );

-- Restore DELETE permission for further tests/cleanup
grant delete on query_stats to current_user;
-- 3. Function is callable (smoke test)
select lives_ok(
               $$ select cleanup_30days_old_query_stats(); $$,
               'Function can be called repeatedly'
       );

select *
from finish();
rollback;