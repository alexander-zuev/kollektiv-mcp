import { UserClaudeConfig } from './UserClaudeConfig';
import type { BaseDomainEntity } from './BaseDomainEntity';

export type ContainerState = 'starting' | 'ready' | 'failed';
export type SessionState = 'needs_setup' | 'needs_container_start' | 'ready' | 'failed';

export class UserSession implements BaseDomainEntity {
  constructor(
    public readonly userId: string,
    public readonly config: UserClaudeConfig | null,
    public readonly containerState: ContainerState | null, // null = not started yet
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
    public readonly greetingSent = false
  ) {}

  /**
   * Determines the current state of the session based on config and container state
   */
  getState(): SessionState {
    if (this.containerState === 'failed') return 'failed';
    if (this.config === null) return 'needs_setup';
    if (this.containerState !== 'ready') return 'needs_container_start';
    return 'ready';
  }

  /**
   * Creates a new session with container marked as starting
   */
  markContainerStarting(): UserSession {
    return new UserSession(
      this.userId,
      this.config,
      'starting',
      this.createdAt,
      new Date(),
      this.greetingSent
    );
  }

  /**
   * Creates a new session with container marked as ready
   */
  markContainerReady(): UserSession {
    return new UserSession(
      this.userId,
      this.config,
      'ready',
      this.createdAt,
      new Date(),
      this.greetingSent
    );
  }

  /**
   * Creates a new session with container marked as failed
   */
  markContainerFailed(): UserSession {
    return new UserSession(
      this.userId,
      this.config,
      'failed',
      this.createdAt,
      new Date(),
      this.greetingSent
    );
  }

  /**
   * Creates a new session with greeting marked as sent
   */
  markGreetingSent(): UserSession {
    return new UserSession(
      this.userId,
      this.config,
      this.containerState,
      this.createdAt,
      new Date(),
      true
    );
  }

  /**
   * Creates a new session with updated configuration
   */
  updateConfig(config: UserClaudeConfig): UserSession {
    return new UserSession(
      this.userId,
      config,
      null, // Reset container state when config changes
      this.createdAt,
      new Date(),
      false // Reset greeting when config changes
    );
  }

  /**
   * Creates a new session for a user who needs setup
   */
  static createNew(userId: string): UserSession {
    return new UserSession(userId, null, null);
  }

  /**
   * Convert to plain object for serialization
   */
  toPlainObject(): Record<string, unknown> {
    return {
      userId: this.userId,
      config: this.config?.toPlainObject() || null,
      containerState: this.containerState,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      greetingSent: this.greetingSent,
    };
  }

  /**
   * Create from plain object representation
   */
  static fromPlainObject(data: Record<string, unknown>): UserSession {
    return new UserSession(
      data.userId as string,
      data.config ? UserClaudeConfig.fromPlainObject(data.config as Record<string, unknown>) : null,
      data.containerState as ContainerState | null,
      new Date(data.createdAt as string),
      new Date(data.updatedAt as string),
      (data.greetingSent as boolean) ?? false
    );
  }
}