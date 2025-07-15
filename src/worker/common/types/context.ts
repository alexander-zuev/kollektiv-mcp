import type {OAuthHelpers} from "@cloudflare/workers-oauth-provider";
import type {SupabaseClient} from "@supabase/supabase-js";
import type {DrizzleDb} from '@/worker/common/types';

export type AppContext = {
    Variables: {
        // Auth context
        userId?: string;

        // Database context
        db?: DrizzleDb;
        d1Database?: D1Database;

        // Supabase
        supabaseClient?: SupabaseClient

    };
    Bindings: Env & {
        OAUTH_PROVIDER: OAuthHelpers
    };
};