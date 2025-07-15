/**
 * Base interface for all domain entities
 * Ensures consistent serialization patterns across domain models
 */
export interface BaseDomainEntity {
  /**
   * Convert domain entity to plain object representation (storage-agnostic)
   * Used by repositories to transform data for persistence layers
   */
  toPlainObject(): Record<string, any>;

  /**
   * Timestamp when entity was created
   */
  readonly createdAt: Date;

  /**
   * Timestamp when entity was last updated
   */
  readonly updatedAt: Date;
}