import type { SlackOAuthV2Response } from '@/shared/types';
import { WorkspaceInstallationValidationError } from '@/shared/errors/domain.errors';
import { domainLogger } from '@/infrastructure/logger/logger';
import type { BaseDomainEntity } from './BaseDomainEntity';

export class WorkspaceInstallation implements BaseDomainEntity {
  constructor(
    public readonly teamId: string,
    public readonly teamName: string,
    public readonly slackAccessToken: string,
    public readonly botUserId: string,
    public readonly appId: string,
    public readonly scopes: string[],
    public readonly enterpriseId?: string,
    public readonly enterpriseName?: string,
    public readonly authedUserId?: string,
    public readonly authedUserToken?: string,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}

  // From Slack OAuth response with validation
  static fromSlackResponse(response: SlackOAuthV2Response): WorkspaceInstallation {
    // Critical field validation
    const requiredFields = [
      { value: response.ok, field: 'ok', message: 'OAuth response not ok' },
      { value: response.team?.id, field: 'team.id', message: 'Missing team ID' },
      {
        value: response.access_token,
        field: 'access_token',
        message: 'Missing bot access token',
      },
      { value: response.bot_user_id, field: 'bot_user_id', message: 'Missing bot user ID' },
    ];

    for (const { value, field, message } of requiredFields) {
      if (!value) {
        domainLogger.error('OAuth validation failed', { field });
        throw new WorkspaceInstallationValidationError(message, field);
      }
    }

    domainLogger.info('Workspace installation created from OAuth', {
      teamId: response.team.id,
      teamName: response.team.name,
      enterpriseId: response.enterprise?.id,
    });

    return new WorkspaceInstallation(
      response.team.id,
      response.team.name,
      response.access_token,
      response.bot_user_id,
      response.app_id,
      response.scope?.split(',') || [],
      response.enterprise?.id,
      response.enterprise?.name,
      response.authed_user?.id,
      response.authed_user?.access_token
    );
  }

  // Convert to plain object representation (storage-agnostic)
  toPlainObject(): Record<string, any> {
    return {
      teamId: this.teamId,
      teamName: this.teamName,
      slackAccessToken: this.slackAccessToken,
      botUserId: this.botUserId,
      appId: this.appId,
      scopes: this.scopes,
      enterpriseId: this.enterpriseId,
      enterpriseName: this.enterpriseName,
      authedUserId: this.authedUserId,
      authedUserToken: this.authedUserToken,
      installedAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Create from plain object representation (storage-agnostic)
  static fromPlainObject(data: Record<string, any>): WorkspaceInstallation {
    return new WorkspaceInstallation(
      data.teamId,
      data.teamName,
      data.slackAccessToken,
      data.botUserId,
      data.appId,
      data.scopes,
      data.enterpriseId,
      data.enterpriseName,
      data.authedUserId,
      data.authedUserToken,
      new Date(data.installedAt),
      new Date(data.updatedAt)
    );
  }
}