import {PgTransaction} from 'drizzle-orm/pg-core';
import {drizzle, PostgresJsQueryResultHKT} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/worker/infrastructure/persistence/database/schema';

export type DbRole = 'anon' | 'authenticated' | 'service_role';
export type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;
export type DbConnection = ReturnType<typeof postgres>;
export type DbTransaction = PgTransaction<PostgresJsQueryResultHKT, typeof schema>;

// Database operation interfaces
export interface AdminDb {
    readonly type: 'admin';

    query<T>(operation: (tx: DbTransaction) => Promise<T>): Promise<T>;
}

export interface UserDb {
    readonly type: 'user';

    rls<T>(transaction: (tx: DbTransaction) => Promise<T>, ...rest: any[]): Promise<T>;
}