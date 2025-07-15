import type { WebClient } from '@slack/web-api';
import { createLogger } from '@/infrastructure/logger/logger';
import { buildUserConfigModal } from '@/infrastructure/slack/modals/UserConfigModal';

/**
 * Application service for Slack messaging operations
 * Handles modal display, error messages, and user communication
 */
export class SlackMessagingService {
  private readonly logger = createLogger('SlackMessagingService', 'Application');

  constructor(
    private readonly webClient: WebClient,
    private readonly workspaceToken: string
  ) {}

  /**
   * Sends a setup message with button to open configuration modal
   * Used when user needs to set up their Claude Code configuration
   */
  async sendSetupMessage(userId: string, channel: string, threadTs?: string): Promise<void> {
    try {
      this.logger.info('Sending setup message', { userId, channel, threadTs });

      await this.webClient.chat.postMessage({
        channel,
        thread_ts: threadTs,
        text:
          '👋 Welcome to Claude Code Portable bot! You need to configure your settings to get' +
          ' started.',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text:
                '👋 *Welcome to Claude Code Portable bot!*\n\nTo get started, you need to' +
                ' configure your GitHub repository, API keys, and access tokens. This setup only takes a minute.',
            },
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: '⚙️ Setup Configuration',
                },
                style: 'primary',
                action_id: 'open_config_modal',
                value: JSON.stringify({ userId }),
              },
            ],
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: '🔒 All credentials are encrypted and stored securely.',
              },
            ],
          },
        ],
      });

      this.logger.debug('Setup message sent successfully', { userId });
    } catch (error) {
      this.logger.error('Failed to send setup message', {
        userId,
        error: String(error),
      });

      // Fallback: send simple text message
      await this.sendErrorMessage(
        channel,
        'Welcome to Claude Code! Please set up your configuration to get started. Contact support if you need help.',
        threadTs
      );
    }
  }

  /**
   * Opens the user configuration modal in response to button click
   * This method should be called from the interactions handler with a valid trigger_id
   */
  async openUserConfigModal(triggerId: string, userId: string, channel?: string): Promise<void> {
    try {
      this.logger.info('Opening config modal', { userId, channel });

      const modal = buildUserConfigModal(userId, channel);

      await this.webClient.views.open({
        trigger_id: triggerId,
        view: modal,
      });

      this.logger.debug('Config modal opened successfully', { userId, channel });
    } catch (error) {
      this.logger.error('Failed to open config modal', {
        userId,
        channel,
        error: String(error),
      });
      throw error; // Re-throw so the interaction handler can respond appropriately
    }
  }

  /**
   * Sends a simple configuration success message
   * Called after user successfully submits configuration modal
   * Follows the same pattern as other messages in the codebase
   */
  async sendConfigSuccessMessage(channel: string, threadTs?: string): Promise<void> {
    try {
      this.logger.info('Sending config success message', { channel, threadTs });

      await this.webClient.chat.postMessage({
        channel,
        text: '✅ Configuration saved! Send any message to start your Claude Code instance.',
        thread_ts: threadTs,
      });

      this.logger.debug('Config success message sent successfully', { channel, threadTs });
    } catch (error) {
      this.logger.error('Failed to send config success message', {
        channel,
        threadTs,
        error: String(error),
      });
      // Don't throw - this is a non-critical notification
    }
  }

  /**
   * Sends a simple message to the user in the thread
   */
  async sendMessage(channel: string, message: string, threadTs?: string): Promise<void> {
    try {
      await this.webClient.chat.postMessage({
        channel,
        text: message,
        thread_ts: threadTs,
      });

      this.logger.debug('Message sent', { channel, threadTs });
    } catch (error) {
      this.logger.error('Failed to send message', {
        channel,
        threadTs,
        error: String(error),
      });
    }
  }

  /**
   * Sends an error message to the user in the thread
   */
  async sendErrorMessage(channel: string, errorMessage: string, threadTs?: string): Promise<void> {
    try {
      const message = `❌ ${errorMessage}`;

      await this.webClient.chat.postMessage({
        channel,
        text: message,
        thread_ts: threadTs,
      });

      this.logger.debug('Error message sent', { channel, threadTs });
    } catch (error) {
      this.logger.error('Failed to send error message', {
        channel,
        threadTs,
        error: String(error),
      });
    }
  }

  /**
   * Sends a container startup failure message with restart button
   */
  async sendContainerStartupFailureMessage(channel: string, threadTs?: string): Promise<void> {
    try {
      await this.webClient.chat.postMessage({
        channel,
        text: '❌ Your Claude Code container failed to start.',
        thread_ts: threadTs,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '❌ Your Claude Code container failed to start.',
            },
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: '🔄 Restart Instance',
                },
                action_id: 'restart_instance',
                style: 'primary',
              },
            ],
          },
        ],
      });

      this.logger.debug('Container startup failure message sent', { channel, threadTs });
    } catch (error) {
      this.logger.error('Failed to send container startup failure message', {
        channel,
        threadTs,
        error: String(error),
      });
    }
  }

  /**
   * Sends container startup message to user
   */
  async sendStartupMessage(channel: string, threadTs?: string): Promise<void> {
    try {
      await this.webClient.chat.postMessage({
        channel,
        text:
          ':gear: Starting your Claude Code instance... This may take 10-30 seconds. The' +
          ' container will auto-sleep after 60 minutes of inactivity.',
        thread_ts: threadTs,
      });

      this.logger.debug('Startup message sent', { channel, threadTs });
    } catch (error) {
      this.logger.error('Failed to send startup message', {
        channel,
        threadTs,
        error: String(error),
      });
    }
  }

  /**
   * Sends a processing message that can be updated later
   * Returns the message timestamp for future updates
   */
  async sendProcessingMessage(channel: string, threadTs?: string): Promise<string | null> {
    try {
      const response = await this.webClient.chat.postMessage({
        channel,
        text: '⏳ Claude Code is processing your request, it might take some time depending on your task...',
        thread_ts: threadTs,
      });

      this.logger.debug('Processing message sent', { channel, threadTs });
      return response.ts || null;
    } catch (error) {
      this.logger.error('Failed to send processing message', {
        channel,
        threadTs,
        error: String(error),
      });
      return null;
    }
  }

  /**
   * Updates an existing message with new content
   */
  async updateMessage(channel: string, messageTs: string, newText: string): Promise<void> {
    try {
      await this.webClient.chat.update({
        channel,
        ts: messageTs,
        text: newText,
      });

      this.logger.debug('Message updated', { channel, messageTs });
    } catch (error) {
      this.logger.error('Failed to update message', {
        channel,
        messageTs,
        error: String(error),
      });
    }
  }

  /**
   * Set AI assistant thread status (e.g., "is thinking...", "is processing...")
   * Status automatically clears when app sends a reply
   */
  async setThreadStatus(channel: string, threadTs: string, status: string): Promise<void> {
    try {
      await this.webClient.assistant.threads.setStatus({
        channel_id: channel,
        thread_ts: threadTs,
        status,
      });

      this.logger.debug('Thread status set', { channel, threadTs, status });
    } catch (error) {
      this.logger.error('Failed to set thread status', {
        channel,
        threadTs,
        status,
        error: String(error),
      });
    }
  }

  /**
   * Clear AI assistant thread status
   */
  async clearThreadStatus(channel: string, threadTs: string): Promise<void> {
    try {
      await this.webClient.assistant.threads.setStatus({
        channel_id: channel,
        thread_ts: threadTs,
        status: '', // Empty string clears the status
      });

      this.logger.debug('Thread status cleared', { channel, threadTs });
    } catch (error) {
      this.logger.error('Failed to clear thread status', {
        channel,
        threadTs,
        error: String(error),
      });
    }
  }

  /**
   * Publish app home view for a user
   * Used to display the app home interface with status and quick actions
   */
  async publishAppHomeView(userId: string, blocks: any[]): Promise<void> {
    try {
      this.logger.info('Publishing app home view', { userId });

      await this.webClient.views.publish({
        user_id: userId,
        view: {
          type: 'home',
          blocks,
        },
      });

      this.logger.debug('App home view published successfully', { userId });
    } catch (error) {
      this.logger.error('Failed to publish app home view', {
        userId,
        error: String(error),
      });
      throw error; // Re-throw so caller can handle appropriately
    }
  }

  /**
   * Starts an assistant thread by opening a DM with the user
   * Sends contextual ready message with repo info and reconfigure instructions
   */
  async startAssistantThread(userId: string): Promise<void> {
    try {
      this.logger.info('Starting assistant thread', { userId });

      // Open DM conversation with the user
      const dmResponse = await this.webClient.conversations.open({
        users: userId,
      });

      if (!dmResponse.ok || !dmResponse.channel?.id) {
        throw new Error('Failed to open DM conversation');
      }

      const channelId = dmResponse.channel.id;

      // Send generic ready message
      await this.webClient.chat.postMessage({
        channel: channelId,
        text: `🎉 Your Claude Code is ready!\n\nAsk me anything about your code. To reconfigure, visit the App Home.`,
      });

      this.logger.debug('Assistant thread started successfully', {
        userId,
        channel: channelId,
      });
    } catch (error) {
      this.logger.error('Failed to start assistant thread', {
        userId,
        error: String(error),
      });
      throw error;
    }
  }
}