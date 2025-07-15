import { z } from 'zod';
import { domainLogger } from '@/infrastructure/logger/logger';
import type { BaseDomainEntity } from './BaseDomainEntity';
import { UserConfigValidationError } from '@/shared/errors/domain.errors';

// Validation schema - all fields required for complete config
const UserClaudeConfigSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  githubToken: z.string().min(1, 'GitHub token is required'),
  repoUrl: z.string().url('Must be a valid URL').startsWith('https://', 'Must use HTTPS'),
  anthropicKey: z.string().min(1, 'Anthropic API key is required'),
});

type UserClaudeConfigUpdate = Partial<Pick<UserClaudeConfig, 'githubToken' | 'repoUrl' | 'anthropicKey'>>;

export class UserClaudeConfig implements BaseDomainEntity {
  constructor(
    public readonly userId: string,
    public readonly githubToken: string,
    public readonly repoUrl: string,
    public readonly anthropicKey: string,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}

  // Create new config with validation
  static create(data: {
    userId: string;
    githubToken: string;
    repoUrl: string;
    anthropicKey: string;
  }): UserClaudeConfig {
    try {
      const validated = UserClaudeConfigSchema.parse(data);
      domainLogger.info('User Claude config created', { 
        userId: validated.userId,
        repoUrl: validated.repoUrl 
      });
      
      return new UserClaudeConfig(
        validated.userId,
        validated.githubToken,
        validated.repoUrl,
        validated.anthropicKey
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
        const allFields = error.errors.map(err => err.path.join('.')).join(', ');
        const combinedMessage = errorMessages.join('; ');
        
        domainLogger.error('User config validation failed', { 
          fields: allFields, 
          errors: errorMessages 
        });
        throw new UserConfigValidationError(combinedMessage, allFields);
      }
      throw error;
    }
  }

  // Update config with partial data
  update(updates: UserClaudeConfigUpdate): UserClaudeConfig {
    try {
      // Validate only the fields being updated
      const validatedUpdates = UserClaudeConfigSchema.partial().parse(updates);
      
      domainLogger.info('User Claude config updated', { 
        userId: this.userId,
        updatedFields: Object.keys(updates)
      });
      
      return new UserClaudeConfig(
        this.userId,
        validatedUpdates.githubToken ?? this.githubToken,
        validatedUpdates.repoUrl ?? this.repoUrl,
        validatedUpdates.anthropicKey ?? this.anthropicKey,
        this.createdAt,
        new Date() // Updated timestamp
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
        const allFields = error.errors.map(err => err.path.join('.')).join(', ');
        const combinedMessage = errorMessages.join('; ');
        
        domainLogger.error('User config update validation failed', { 
          fields: allFields, 
          errors: errorMessages 
        });
        throw new UserConfigValidationError(combinedMessage, allFields);
      }
      throw error;
    }
  }

  // Convert to plain object representation (storage-agnostic)
  toPlainObject(): Record<string, any> {
    return {
      userId: this.userId,
      githubToken: this.githubToken,
      repoUrl: this.repoUrl,
      anthropicKey: this.anthropicKey,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Create from plain object representation (storage-agnostic)
  static fromPlainObject(data: Record<string, any>): UserClaudeConfig {
    return new UserClaudeConfig(
      data.userId,
      data.githubToken,
      data.repoUrl,
      data.anthropicKey,
      new Date(data.createdAt),
      new Date(data.updatedAt)
    );
  }

}