import type { UserSession } from '@/domain/models/UserSession';

/**
 * Abstract repository interface for UserSession persistence
 * Follows repository pattern to abstract storage implementation
 */
export interface UserSessionRepository {
  /**
   * Retrieve user session by userId
   * @param userId - Unique user identifier
   * @returns UserSession if found, null if not found
   */
  findByUserId(userId: string): Promise<UserSession | null>;

  /**
   * Save or update user session
   * @param session - UserSession to persist
   */
  save(session: UserSession): Promise<void>;

  /**
   * Check if user session exists
   * @param userId - Unique user identifier
   * @returns true if session exists, false otherwise
   */
  exists(userId: string): Promise<boolean>;

  /**
   * Delete user session
   * @param userId - Unique user identifier
   */
  delete(userId: string): Promise<void>;
}