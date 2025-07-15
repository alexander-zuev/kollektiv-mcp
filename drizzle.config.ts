import {defineConfig} from 'drizzle-kit';

export default defineConfig({
    schema: './src/worker/infrastructure/database/schema.ts',
    out: './src/worker/infrastructure/database/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://postgres:postgres@127.0.0.1:54322/postgres',
        ssl: true,
    },
    schemaFilter: ['public', 'auth'],

    // list of extensions to ignore tables of
    extensionsFilters: [],
    strict: true,
    verbose: true,
});