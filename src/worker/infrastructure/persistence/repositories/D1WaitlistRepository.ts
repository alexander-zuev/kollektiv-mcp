import type { WaitlistRepository } from '@/domain/repositories/WaitlistRepository';
import { waitlistSignups } from '@/infrastructure/database/schema';
import { drizzle } from 'drizzle-orm/d1';
import { eq, count, gte, desc } from 'drizzle-orm';
import { infrastructureLogger } from '@/infrastructure/logger/logger';
import { DatabaseError, DatabaseIntegrityError } from '@/shared/errors/infrastructure.errors';

export class D1WaitlistRepository implements WaitlistRepository {
  private readonly db;

  constructor(d1Database: D1Database) {
    this.db = drizzle(d1Database);
  }

  async save(email: string): Promise<void> {
    try {
      await this.db.insert(waitlistSignups).values({
        id: crypto.randomUUID(),
        email,
        createdAt: new Date(),
      });

      infrastructureLogger.info('Waitlist signup saved', { email });
    } catch (error) {
      infrastructureLogger.error('Failed to save waitlist signup', {
        email,
        error: error instanceof Error ? error.message : String(error),
      });

      // Check if it's a unique constraint violation
      if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
        throw new DatabaseIntegrityError(
          `Email already exists in waitlist: ${email}`,
          'SQLITE_CONSTRAINT',
          'ERROR',
          error
        );
      }

      throw new DatabaseError(
        `Failed to save waitlist signup for ${email}`,
        'SQLITE_ERROR',
        'ERROR',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  async exists(email: string): Promise<boolean> {
    try {
      const result = await this.db
        .select({ id: waitlistSignups.id })
        .from(waitlistSignups)
        .where(eq(waitlistSignups.email, email))
        .limit(1);

      return result.length > 0;
    } catch (error) {
      infrastructureLogger.error('Failed to check if email exists', {
        email,
        error: error instanceof Error ? error.message : String(error),
      });

      throw new DatabaseError(
        `Failed to check if email exists: ${email}`,
        'SQLITE_ERROR',
        'ERROR',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  async getCount(): Promise<number> {
    try {
      const result = await this.db.select({ count: count() }).from(waitlistSignups);

      return result[0]?.count || 0;
    } catch (error) {
      infrastructureLogger.error('Failed to get waitlist count', {
        error: error instanceof Error ? error.message : String(error),
      });

      throw new DatabaseError(
        'Failed to get waitlist count',
        'SQLITE_ERROR',
        'ERROR',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  async getRecentSignups(since: Date): Promise<{ email: string; createdAt: Date }[]> {
    try {
      const result = await this.db
        .select({
          email: waitlistSignups.email,
          createdAt: waitlistSignups.createdAt,
        })
        .from(waitlistSignups)
        .where(gte(waitlistSignups.createdAt, since))
        .orderBy(desc(waitlistSignups.createdAt));

      return result;
    } catch (error) {
      infrastructureLogger.error('Failed to get recent waitlist signups', {
        since: since.toISOString(),
        error: error instanceof Error ? error.message : String(error),
      });

      throw new DatabaseError(
        'Failed to get recent waitlist signups',
        'SQLITE_ERROR',
        'ERROR',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }
}