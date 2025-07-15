import {type DrizzleConfig, sql} from 'drizzle-orm';
import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {DatabaseConnectionError} from '@/worker/common/errors';
import {
    AdminDb,
    DbConnection,
    DbTransaction,
    DrizzleDb,
    JwtPayload,
    UserDb,
} from '@/worker/common/types';
import {infrastructureLogger} from '@/worker/infrastructure/logger';
import * as schema from './schema.ts';

export interface DatabaseConfig {
    adminDb: AdminDb;
    userDb: UserDb;
    dbConnection: DbConnection;
    close: () => Promise<void>;
}

// Configuration setup
const config = {
    casing: 'snake_case',
    logger: false,
    schema,
} satisfies DrizzleConfig<typeof schema>;

function createDrizzle(
    {admin, client}: { admin: DrizzleDb; client: DrizzleDb },
    token?: JwtPayload // Handle undefined token
): { admin: AdminDb; rls: UserDb['rls'] } {
    // Default to anonymous if no token provided (like Supabase getSession returning undefined)
    const effectiveToken = token || {sub: '', role: 'anon'};

    return {
        admin: {
            type: 'admin' as const,
            async query<T>(operation: (tx: DbTransaction) => Promise<T>): Promise<T> {
                try {
                    return await admin.transaction(async tx => {
                        await tx.execute(sql`
                            SET LOCAL ROLE service_role;
                            SET search_path TO public, extensions;
                        `);
                        return await operation(tx as DbTransaction);
                    });
                } finally {
                    // Cleanup OUTSIDE the transaction - use a separate connection/transaction
                    try {
                        await admin.execute(sql`RESET ROLE`);
                    } catch (cleanupError) {
                        infrastructureLogger.warn('Failed to reset admin role', {error: cleanupError});
                    }
                }
            },
        } as AdminDb,

        rls: (async <T>(transaction: (tx: DbTransaction) => Promise<T>, ...rest: any[]): Promise<T> => {
            try {
                return await client.transaction(
                    async tx => {
                        await tx.execute(sql`
                            SELECT set_config('request.jwt.claims', '${sql.raw(JSON.stringify(effectiveToken))}', TRUE);
                            SELECT set_config('request.jwt.claim.sub', '${sql.raw(effectiveToken.sub ?? '')}', TRUE);
                            SET LOCAL ROLE ${sql.raw(effectiveToken.role ?? 'anon')};
                            SET search_path TO public, extensions;
                        `);
                        return await transaction(tx as DbTransaction);
                    },
                    ...rest
                );
            } finally {
                // Cleanup OUTSIDE the transaction - use a separate connection/transaction
                try {
                    await client.execute(sql`
                        SELECT set_config('request.jwt.claims', NULL, TRUE);
                        SELECT set_config('request.jwt.claim.sub', NULL, TRUE);
                        RESET ROLE;
                    `);
                } catch (cleanupError) {
                    infrastructureLogger.warn('Failed to cleanup session state', {error: cleanupError});
                }
            }
        }) as UserDb['rls'],
    };
}

export async function createDbConnection(
    connectionString: string,
    token?: JwtPayload
): Promise<DatabaseConfig> {
    let dbConnection: ReturnType<typeof postgres> | undefined = undefined;

    try {
        dbConnection = postgres(connectionString, {
            max: 5,
        });

        const adminInstance = drizzle(dbConnection, config);
        const clientInstance = drizzle(dbConnection, config);

        infrastructureLogger.debug('Established connection to database');

        // Debug connection context
        // try {
        //   const contextResult = await dbConnection`
        //     SELECT
        //       current_user as current_user,
        //       current_database() as current_database,
        //       current_schema() as current_schema,
        //       current_setting('search_path') as search_path
        //   `;
        //   infrastructureLogger.debug('Initial connection context', {
        //     context: contextResult[0],
        //     connectionString: connectionString.replace(/:[^:@]*@/, ':***@') // Hide password
        //   });
        // } catch (contextError) {
        //   infrastructureLogger.error('Failed to get initial connection context', { error: contextError });
        // }

        const db = createDrizzle(
            {
                admin: adminInstance,
                client: clientInstance,
            },
            token
        );

        return {
            adminDb: db.admin,
            userDb: {
                type: 'user',
                rls: db.rls,
            },
            dbConnection,
            close: () => dbConnection!.end(),
        };
    } catch (e) {
        try {
            await dbConnection?.end();
        } catch (cleanupError) {
            infrastructureLogger.error('Failed to clean up database connection', {error: cleanupError});
        }

        infrastructureLogger.error('Failed to establish database connection', {
            error: e,
            timestamp: new Date().toISOString(),
        });

        throw new DatabaseConnectionError(
            'Failed to establish database connection',
            'createDbConnection'
        );
    }
}