import type { WebClient } from '@slack/web-api';
import type { SlackOAuthV2Response } from '@/shared/types';
import { domainLogger } from '@/infrastructure/logger/logger';
import { SlackOAuthTokenExchangeError } from '@/shared/errors/domain.errors';

export class SlackOAuthService {
  constructor(
    private readonly webClient: WebClient,
    private readonly clientId: string,
    private readonly clientSecret: string
  ) {}

  /**
   * Exchange OAuth code for access tokens
   */
  async getAccessResponse(code: string): Promise<SlackOAuthV2Response> {
    try {
      domainLogger.info('Exchanging OAuth code for tokens', {
        hasCode: !!code,
        hasClientId: !!this.clientId,
        hasClientSecret: !!this.clientSecret,
      });

      const result = await this.webClient.oauth.v2.access({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
      });

      if (!result.ok) {
        domainLogger.error('OAuth token exchange failed', {
          error: result.error,
          code: `${code?.substring(0, 10)  }...`,
        });
        throw new SlackOAuthTokenExchangeError(
          `OAuth exchange failed: ${result.error}`,
          result.error
        );
      }

      domainLogger.info('OAuth exchange successful', {
        teamId: result.team?.id,
        teamName: result.team?.name,
        botUserId: result.bot_user_id,
        scopes: result.scope,
        hasUserToken: !!result.authed_user?.access_token,
      });

      return result as SlackOAuthV2Response;
    } catch (error) {
      domainLogger.error('OAuth token exchange error', {
        error: error instanceof Error ? error.message : String(error),
        code: `${code?.substring(0, 10)  }...`,
      });

      if (error instanceof SlackOAuthTokenExchangeError) {
        throw error; // Re-throw domain-specific errors
      }

      throw new SlackOAuthTokenExchangeError(
        `OAuth token exchange failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}