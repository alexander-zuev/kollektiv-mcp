import {UserClaudeConfig} from '@/domain/models';
import type {UserClaudeConfigRepository} from '@/domain/repositories/UserClaudeConfigRepository';
import type {EncryptionService} from '@/infrastructure/integrations/EncryptionService';
import {infrastructureLogger} from '@/infrastructure/logger/logger';
import {StorageError, StorageSerializationError} from '@/shared/errors/infrastructure.errors';

export class CfUserClaudeConfigRepository implements UserClaudeConfigRepository {
    constructor(
        private readonly kv: KVNamespace, // CLAUDE_PORTABLE_KV
        private readonly d1: D1Database, // DB
        private readonly encryptionService: EncryptionService
    ) {
    }

    private getKvKey(userId: string): string {
        return `user_config:${userId}`;
    }

    async save(config: UserClaudeConfig): Promise<UserClaudeConfig> {
        try {
            const encryptedData = await this.encryptForStorage(config);
            const serialized = JSON.stringify(encryptedData);

            // Save to both KV and D1 for redundancy
            await Promise.all([
                this.saveToKv(config.userId, serialized),
                this.saveToD1(encryptedData),
            ]);

            infrastructureLogger.info('User Claude config saved', {userId: config.userId});
            return config;
        } catch (error) {
            infrastructureLogger.error('Failed to save user Claude config', {
                userId: config.userId,
                error: error instanceof Error ? error.message : String(error),
            });
            throw new StorageError(
                `Failed to save user Claude config for user ${config.userId}`,
                'write',
                undefined,
                error instanceof Error ? error : new Error(String(error))
            );
        }
    }

    async findByUserId(userId: string): Promise<UserClaudeConfig | null> {
        try {
            // Try KV first (fast)
            const kvResult = await this.findFromKv(userId);
            if (kvResult) {
                infrastructureLogger.info('Found user Claude config in KV', {userId});
                return kvResult;
            }

            // Fallback to D1 (reliable)
            const d1Result = await this.findFromD1(userId);
            if (d1Result) {
                infrastructureLogger.info('Found user Claude config in D1, backfilling KV', {userId});
                const encryptedData = await this.encryptForStorage(d1Result);
                await this.saveToKv(userId, JSON.stringify(encryptedData));
                return d1Result;
            }

            infrastructureLogger.info('User Claude config not found', {userId});
            return null;
        } catch (error) {
            infrastructureLogger.error('Failed to find user Claude config', {
                userId,
                error: error instanceof Error ? error.message : String(error),
            });
            throw new StorageError(
                `Failed to find user Claude config for user ${userId}`,
                'read',
                undefined,
                error instanceof Error ? error : new Error(String(error))
            );
        }
    }

    async delete(userId: string): Promise<void> {
        try {
            // Delete from both KV and D1
            await Promise.all([this.deleteFromKv(userId), this.deleteFromD1(userId)]);
            infrastructureLogger.info('User Claude config deleted', {userId});
        } catch (error) {
            infrastructureLogger.error('Failed to delete user Claude config', {
                userId,
                error: error instanceof Error ? error.message : String(error),
            });
            throw new StorageError(
                `Failed to delete user Claude config for user ${userId}`,
                'delete',
                undefined,
                error instanceof Error ? error : new Error(String(error))
            );
        }
    }

    async exists(userId: string): Promise<boolean> {
        try {
            // Check KV first (fast)
            const kvExists = (await this.kv.get(this.getKvKey(userId))) !== null;
            if (kvExists) return true;

            // Check D1 as fallback
            const stmt = this.d1.prepare(
                'SELECT 1 FROM user_claude_configs WHERE user_id = ? LIMIT 1'
            );
            const result = await stmt.bind(userId).first();
            return result !== null;
        } catch (error) {
            infrastructureLogger.error('Failed to check user Claude config existence', {
                userId,
                error: error instanceof Error ? error.message : String(error),
            });
            throw new StorageError(
                `Failed to check existence of user Claude config for user ${userId}`,
                'read',
                undefined,
                error instanceof Error ? error : new Error(String(error))
            );
        }
    }

    private async saveToKv(userId: string, serialized: string): Promise<void> {
        try {
            await this.kv.put(this.getKvKey(userId), serialized);
        } catch (error) {
            infrastructureLogger.error('KV save failed', {
                userId,
                error: error instanceof Error ? error.message : String(error),
            });
            throw new StorageError(
                `KV save failed for user ${userId}`,
                'write',
                'KV',
                error instanceof Error ? error : new Error(String(error))
            );
        }
    }

    private async saveToD1(encryptedData: Record<string, any>): Promise<void> {
        try {
            const stmt = this.d1.prepare(`
        INSERT OR REPLACE
        INTO user_claude_configs (user_id, github_token, repo_url, anthropic_key, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

            await stmt
                .bind(
                    encryptedData.userId,
                    encryptedData.githubToken, // Already encrypted
                    encryptedData.repoUrl,
                    encryptedData.anthropicKey, // Already encrypted
                    Math.floor(new Date(encryptedData.createdAt).getTime() / 1000),
                    Math.floor(new Date(encryptedData.updatedAt).getTime() / 1000)
                )
                .run();
        } catch (error) {
            infrastructureLogger.error('D1 save failed', {
                userId: encryptedData.userId,
                error: error instanceof Error ? error.message : String(error),
            });
            throw new StorageError(
                `D1 save failed for user ${encryptedData.userId}`,
                'write',
                'D1',
                error instanceof Error ? error : new Error(String(error))
            );
        }
    }

    private async findFromKv(userId: string): Promise<UserClaudeConfig | null> {
        try {
            const result = await this.kv.get(this.getKvKey(userId));
            if (!result) return null;

            const encryptedData = JSON.parse(result);
            return await this.decryptFromStorage(encryptedData);
        } catch (error) {
            if (error instanceof SyntaxError) {
                infrastructureLogger.error('Invalid JSON in KV', {userId});
                throw new StorageSerializationError(`Invalid JSON in KV for user ${userId}`);
            }
            infrastructureLogger.error('KV read failed', {
                userId,
                error: error instanceof Error ? error.message : String(error),
            });
            throw new StorageError(
                `KV read failed for user ${userId}`,
                'read',
                'KV',
                error instanceof Error ? error : new Error(String(error))
            );
        }
    }

    private async findFromD1(userId: string): Promise<UserClaudeConfig | null> {
        try {
            const stmt = this.d1.prepare('SELECT * FROM user_claude_configs WHERE user_id = ?');
            const result = await stmt.bind(userId).first();

            if (!result) return null;

            // Convert D1 row to encrypted data format
            const encryptedData = {
                userId: result.user_id,
                githubToken: result.github_token, // Encrypted
                repoUrl: result.repo_url,
                anthropicKey: result.anthropic_key, // Encrypted
                createdAt: new Date((result.created_at as number) * 1000),
                updatedAt: new Date((result.updated_at as number) * 1000),
            };

            return await this.decryptFromStorage(encryptedData);
        } catch (error) {
            infrastructureLogger.error('D1 read failed', {
                userId,
                error: error instanceof Error ? error.message : String(error),
            });
            throw new StorageError(
                `D1 read failed for user ${userId}`,
                'read',
                'D1',
                error instanceof Error ? error : new Error(String(error))
            );
        }
    }

    private async deleteFromKv(userId: string): Promise<void> {
        try {
            await this.kv.delete(this.getKvKey(userId));
        } catch (error) {
            infrastructureLogger.error('KV delete failed', {
                userId,
                error: error instanceof Error ? error.message : String(error),
            });
            throw new StorageError(
                `KV delete failed for user ${userId}`,
                'delete',
                'KV',
                error instanceof Error ? error : new Error(String(error))
            );
        }
    }

    private async deleteFromD1(userId: string): Promise<void> {
        try {
            const stmt = this.d1.prepare('DELETE FROM user_claude_configs WHERE user_id = ?');
            await stmt.bind(userId).run();
        } catch (error) {
            infrastructureLogger.error('D1 delete failed', {
                userId,
                error: error instanceof Error ? error.message : String(error),
            });
            throw new StorageError(
                `D1 delete failed for user ${userId}`,
                'delete',
                'D1',
                error instanceof Error ? error : new Error(String(error))
            );
        }
    }

    private async encryptForStorage(config: UserClaudeConfig): Promise<Record<string, any>> {
        const plainData = config.toPlainObject();
        return {
            ...plainData,
            githubToken: await this.encryptionService.encrypt(plainData.githubToken),
            anthropicKey: await this.encryptionService.encrypt(plainData.anthropicKey),
        };
    }

    private async decryptFromStorage(encryptedData: Record<string, any>): Promise<UserClaudeConfig> {
        const decryptedData = {
            ...encryptedData,
            githubToken: await this.encryptionService.decrypt(encryptedData.githubToken),
            anthropicKey: await this.encryptionService.decrypt(encryptedData.anthropicKey),
        };
        return UserClaudeConfig.fromPlainObject(decryptedData);
    }
}