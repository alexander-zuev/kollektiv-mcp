import type {Context, Next} from 'hono';
import {HTTPException} from 'hono/http-exception';
import type {AppContext} from '@/worker/common//types';

export const withDatabase = async (c: Context<AppContext>, next: Next): Promise<void> => {
    if (!c.env.D1) {
        throw new HTTPException(500, {
            message: 'Database (D1) is not configured in environment'
        });
    }

    // TODO: Switch to drizzle when ready
    // const db = drizzle(c.env.DB);
    // c.set('db', db);

    c.set('d1Database', c.env.D1);
    await next();
};