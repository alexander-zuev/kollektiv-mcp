import type {DrizzleD1Database} from 'drizzle-orm/d1';
import type * as schema from '@/worker/infrastructure/database/schema';

export type DrizzleDb = DrizzleD1Database<typeof schema>;