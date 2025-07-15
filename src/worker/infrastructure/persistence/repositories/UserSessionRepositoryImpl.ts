import type { UserSessionRepository } from '@/domain/repositories/UserSessionRepository';
import type { UserSessionDO } from '@/infrastructure/durable-objects/UserSessionDO';
import { UserSession } from '@/domain/models/UserSession';

/**
 * Repository implementation that wraps UserSessionDO and handles conversion
 * between domain objects and RPC-safe plain objects
 */
export class UserSessionRepositoryImpl implements UserSessionRepository {
  constructor(private readonly doStub: DurableObjectStub<UserSessionDO>) {}

  async findByUserId(userId: string): Promise<UserSession | null> {
    const plainData = await this.doStub.findSessionData(userId);

    if (!plainData) {
      return null;
    }

    return this.plainToSession(plainData);
  }

  async save(session: UserSession): Promise<void> {
    const plainData = this.sessionToPlain(session);
    await this.doStub.saveSessionData(plainData);
  }

  async exists(userId: string): Promise<boolean> {
    return await this.doStub.sessionExists(userId);
  }

  async delete(userId: string): Promise<void> {
    await this.doStub.deleteSession(userId);
  }

  /**
   * Convert UserSession domain object to plain object for RPC
   */
  private sessionToPlain(session: UserSession): Record<string, unknown> {
    return session.toPlainObject();
  }

  /**
   * Convert plain object from RPC to UserSession domain object
   */
  private plainToSession(data: Record<string, unknown>): UserSession {
    return UserSession.fromPlainObject(data);
  }
}