import { WorkspaceInstallation } from '@/domain/models';
import type { WorkspaceInstallationRepository } from '@/domain/repositories/WorkspaceInstallationRepository';
import { StorageError, StorageSerializationError } from '@/shared/errors/infrastructure.errors';
import { infrastructureLogger } from '@/infrastructure/logger/logger';

// TODO: create schemas
// TODO: replace d1 with drizzled1 connection
export class CfWorkspaceInstallationRepository implements WorkspaceInstallationRepository {
  constructor(
    private readonly kv: KVNamespace, // CLAUDE_PORTABLE_KV
    private readonly d1: D1Database // DB
  ) {}

  private getKvKey(teamId: string): string {
    return `workspace:${teamId}`;
  }

  async save(installation: WorkspaceInstallation): Promise<WorkspaceInstallation> {
    try {
      const data = installation.toPlainObject();
      const serialized = JSON.stringify(data);

      // Save to both KV and D1 for redundancy
      await Promise.all([
        this.saveToKv(installation.teamId, serialized),
        this.saveToD1(installation),
      ]);

      infrastructureLogger.info('Workspace installation saved', { teamId: installation.teamId });
      return installation;
    } catch (error) {
      infrastructureLogger.error('Failed to save workspace installation', {
        teamId: installation.teamId,
        error: error instanceof Error ? error.message : String(error),
      });
      throw new StorageError(
        `Failed to save workspace installation for team ${installation.teamId}`,
        'write',
        undefined,
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  async findByTeamId(teamId: string): Promise<WorkspaceInstallation | null> {
    try {
      // Try KV first (fast)
      const kvResult = await this.findFromKv(teamId);
      if (kvResult) {
        infrastructureLogger.info('Found workspace installation in KV', { teamId });
        return kvResult;
      }

      // Fallback to D1 (reliable)
      const d1Result = await this.findFromD1(teamId);
      if (d1Result) {
        infrastructureLogger.info('Found workspace installation in D1, backfilling KV', { teamId });
        await this.saveToKv(teamId, JSON.stringify(d1Result.toPlainObject()));
        return d1Result;
      }

      infrastructureLogger.info('Workspace installation not found', { teamId });
      return null;
    } catch (error) {
      infrastructureLogger.error('Failed to find workspace installation', {
        teamId,
        error: error instanceof Error ? error.message : String(error),
      });
      throw new StorageError(
        `Failed to find workspace installation for team ${teamId}`,
        'read',
        undefined,
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  async delete(teamId: string): Promise<void> {
    try {
      // Delete from both KV and D1
      await Promise.all([this.deleteFromKv(teamId), this.deleteFromD1(teamId)]);
      infrastructureLogger.info('Workspace installation deleted', { teamId });
    } catch (error) {
      infrastructureLogger.error('Failed to delete workspace installation', {
        teamId,
        error: error instanceof Error ? error.message : String(error),
      });
      throw new StorageError(
        `Failed to delete workspace installation for team ${teamId}`,
        'delete',
        undefined,
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  async exists(teamId: string): Promise<boolean> {
    try {
      // Check KV first (fast)
      const kvExists = (await this.kv.get(this.getKvKey(teamId))) !== null;
      if (kvExists) return true;

      // Check D1 as fallback
      const stmt = this.d1.prepare(
        'SELECT 1 FROM workspace_installations WHERE team_id = ? LIMIT 1'
      );
      const result = await stmt.bind(teamId).first();
      return result !== null;
    } catch (error) {
      infrastructureLogger.error('Failed to check workspace installation existence', {
        teamId,
        error: error instanceof Error ? error.message : String(error),
      });
      throw new StorageError(
        `Failed to check existence of workspace installation for team ${teamId}`,
        'read',
        undefined,
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  private async saveToKv(teamId: string, serialized: string): Promise<void> {
    try {
      await this.kv.put(this.getKvKey(teamId), serialized);
    } catch (error) {
      infrastructureLogger.error('KV save failed', {
        teamId,
        error: error instanceof Error ? error.message : String(error),
      });
      throw new StorageError(
        `KV save failed for team ${teamId}`,
        'write',
        'KV',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  private async saveToD1(installation: WorkspaceInstallation): Promise<void> {
    try {
      const stmt = this.d1.prepare(`
                INSERT OR
                REPLACE
                INTO workspace_installations (team_id, team_name, slack_access_token,
                                              bot_user_id, app_id, scopes, enterprise_id,
                                              enterprise_name,
                                              authed_user_id, authed_user_token,
                                              created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

      await stmt
        .bind(
          installation.teamId,
          installation.teamName,
          installation.slackAccessToken,
          installation.botUserId,
          installation.appId,
          JSON.stringify(installation.scopes),
          installation.enterpriseId ?? null,
          installation.enterpriseName ?? null,
          installation.authedUserId ?? null,
          installation.authedUserToken ?? null,
          Math.floor(installation.createdAt.getTime() / 1000),
          Math.floor(installation.updatedAt.getTime() / 1000)
        )
        .run();
    } catch (error) {
      infrastructureLogger.error('D1 save failed', {
        teamId: installation.teamId,
        error: error instanceof Error ? error.message : String(error),
      });
      throw new StorageError(
        `D1 save failed for team ${installation.teamId}`,
        'write',
        'D1',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  private async findFromKv(teamId: string): Promise<WorkspaceInstallation | null> {
    try {
      const result = await this.kv.get(this.getKvKey(teamId));
      if (!result) return null;

      const data = JSON.parse(result);
      return WorkspaceInstallation.fromPlainObject(data);
    } catch (error) {
      if (error instanceof SyntaxError) {
        infrastructureLogger.error('Invalid JSON in KV', { teamId });
        throw new StorageSerializationError(`Invalid JSON in KV for team ${teamId}`);
      }
      infrastructureLogger.error('KV read failed', {
        teamId,
        error: error instanceof Error ? error.message : String(error),
      });
      throw new StorageError(
        `KV read failed for team ${teamId}`,
        'read',
        'KV',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  private async findFromD1(teamId: string): Promise<WorkspaceInstallation | null> {
    try {
      const stmt = this.d1.prepare('SELECT * FROM workspace_installations WHERE team_id = ?');
      const result = await stmt.bind(teamId).first();

      if (!result) return null;

      // Convert D1 row to WorkspaceInstallation
      return WorkspaceInstallation.fromPlainObject({
        teamId: result.team_id,
        teamName: result.team_name,
        slackAccessToken: result.slack_access_token,
        botUserId: result.bot_user_id,
        appId: result.app_id,
        scopes: JSON.parse(result.scopes as string),
        enterpriseId: result.enterprise_id,
        enterpriseName: result.enterprise_name,
        authedUserId: result.authed_user_id,
        authedUserToken: result.authed_user_token,
        createdAt: new Date((result.created_at as number) * 1000),
        updatedAt: new Date((result.updated_at as number) * 1000),
      });
    } catch (error) {
      infrastructureLogger.error('D1 read failed', {
        teamId,
        error: error instanceof Error ? error.message : String(error),
      });
      throw new StorageError(
        `D1 read failed for team ${teamId}`,
        'read',
        'D1',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  private async deleteFromKv(teamId: string): Promise<void> {
    try {
      await this.kv.delete(this.getKvKey(teamId));
    } catch (error) {
      infrastructureLogger.error('KV delete failed', {
        teamId,
        error: error instanceof Error ? error.message : String(error),
      });
      throw new StorageError(
        `KV delete failed for team ${teamId}`,
        'delete',
        'KV',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  private async deleteFromD1(teamId: string): Promise<void> {
    try {
      const stmt = this.d1.prepare('DELETE FROM workspace_installations WHERE team_id = ?');
      await stmt.bind(teamId).run();
    } catch (error) {
      infrastructureLogger.error('D1 delete failed', {
        teamId,
        error: error instanceof Error ? error.message : String(error),
      });
      throw new StorageError(
        `D1 delete failed for team ${teamId}`,
        'delete',
        'D1',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }
}