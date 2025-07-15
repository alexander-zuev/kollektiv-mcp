import { WorkspaceInstallation } from '@/domain/models';
import type { WorkspaceInstallationRepository } from '@/domain/repositories/WorkspaceInstallationRepository';
import type { SlackOAuthV2Response } from '@/shared/types';
import { domainLogger } from '@/infrastructure/logger/logger';
import { WorkspaceInstallationValidationError } from '@/shared/errors/domain.errors';

export class WorkspaceInstallationService {
  constructor(private readonly repository: WorkspaceInstallationRepository) {}

  /**
   * Process OAuth installation - validates response and saves workspace
   */
  async processInstallation(oauthResponse: SlackOAuthV2Response): Promise<WorkspaceInstallation> {
    try {
      domainLogger.info('Processing workspace installation', {
        teamId: oauthResponse.team?.id,
        teamName: oauthResponse.team?.name,
        hasEnterpriseId: !!oauthResponse.enterprise?.id,
      });

      // Create domain entity from OAuth response (includes validation)
      const installation = WorkspaceInstallation.fromSlackResponse(oauthResponse);

      // Check if workspace already exists (for upgrade scenarios)
      const existingInstallation = await this.repository.findByTeamId(installation.teamId);
      if (existingInstallation) {
        domainLogger.info('Updating existing workspace installation', {
          teamId: installation.teamId,
          previouslyInstalledAt: existingInstallation.createdAt,
        });
      }

      // Save installation (upsert behavior)
      const savedInstallation = await this.repository.save(installation);

      domainLogger.info('Workspace installation completed successfully', {
        teamId: savedInstallation.teamId,
        teamName: savedInstallation.teamName,
        scopes: savedInstallation.scopes.length,
        isEnterpriseGrid: !!savedInstallation.enterpriseId,
      });

      return savedInstallation;
    } catch (error) {
      domainLogger.error('Failed to process workspace installation', {
        teamId: oauthResponse.team?.id,
        error: error instanceof Error ? error.message : String(error),
      });

      if (error instanceof WorkspaceInstallationValidationError) {
        throw error; // Re-throw domain validation errors
      }

      // Wrap infrastructure errors in domain context
      throw new Error(
        `Installation processing failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Get workspace installation by team ID
   */
  async getInstallation(teamId: string): Promise<WorkspaceInstallation | null> {
    try {
      domainLogger.info('Retrieving workspace installation', { teamId });

      const installation = await this.repository.findByTeamId(teamId);

      if (!installation) {
        domainLogger.info('Workspace installation not found', { teamId });
        return null;
      }

      domainLogger.info('Workspace installation retrieved', {
        teamId: installation.teamId,
        teamName: installation.teamName,
        installedAt: installation.createdAt,
      });

      return installation;
    } catch (error) {
      domainLogger.error('Failed to retrieve workspace installation', {
        teamId,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  /**
   * Check if workspace is installed
   */
  async isInstalled(teamId: string): Promise<boolean> {
    try {
      return await this.repository.exists(teamId);
    } catch (error) {
      domainLogger.error('Failed to check workspace installation status', {
        teamId,
        error: error instanceof Error ? error.message : String(error),
      });
      // In case of error, assume not installed for security
      return false;
    }
  }

  /**
   * Uninstall workspace (removes all data)
   */
  async uninstall(teamId: string): Promise<void> {
    try {
      domainLogger.info('Uninstalling workspace', { teamId });

      const existingInstallation = await this.repository.findByTeamId(teamId);
      if (!existingInstallation) {
        domainLogger.warn('Attempted to uninstall non-existent workspace', { teamId });
        return; // Idempotent operation
      }

      await this.repository.delete(teamId);

      domainLogger.info('Workspace uninstalled successfully', {
        teamId,
        teamName: existingInstallation.teamName,
      });
    } catch (error) {
      domainLogger.error('Failed to uninstall workspace', {
        teamId,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }
}