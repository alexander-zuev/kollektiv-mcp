import type { UserClaudeConfig } from '@/domain/models/UserClaudeConfig';

export interface UserClaudeConfigRepository {
  save(config: UserClaudeConfig): Promise<UserClaudeConfig>;

  findByUserId(userId: string): Promise<UserClaudeConfig | null>;

  delete(userId: string): Promise<void>;

  exists(userId: string): Promise<boolean>;
}