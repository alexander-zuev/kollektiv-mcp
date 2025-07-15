import {WebClient} from '@slack/web-api';
import {ContainerService} from '@/domain/integrations/ContainerService';
import {SlackMessagingService} from '@/domain/integrations/SlackMessagingService';
import type {UserClaudeConfig} from '@/domain/models/UserClaudeConfig';
import {type SessionState, UserSession} from '@/domain/models/UserSession';
import type {UserSessionRepository} from '@/domain/repositories/UserSessionRepository';
import {createLogger} from '@/infrastructure/logger/logger';
import {UserSessionRepositoryImpl} from '@/infrastructure/repositories/UserSessionRepositoryImpl';

/**
 * Application service for managing user session lifecycle
 * Orchestrates between Slack events, user sessions, and container management
 */
export class UserSessionService {
    private readonly logger = createLogger('UserSessionService', 'Application');

    constructor(
        private readonly userSessionRepository: UserSessionRepository,
        private readonly messagingService: SlackMessagingService,
        private readonly env: Env,
        private readonly userId: string
    ) {
    }

    /**
     * Factory method to create UserSessionService instance for a given userId
     * Requires workspace-specific token instead of hardcoded bot token
     */
    static createUserSessionService(
        env: Env,
        userId: string,
        workspaceToken: string
    ): UserSessionService {
        const sessionId = env.USER_SESSIONS.idFromName(userId);
        const doStub = env.USER_SESSIONS.get(sessionId);
        const userSessionRepository = new UserSessionRepositoryImpl(doStub);

        // Create SlackMessagingService with workspace-specific token
        const webClient = new WebClient(workspaceToken);
        const messagingService = new SlackMessagingService(webClient, workspaceToken);

        return new UserSessionService(userSessionRepository, messagingService, env, userId);
    }

    /**
     * Factory function to create UserSessionService with workspace token lookup
     * Simplifies creation when you have installationService available
     */
    static async createWithWorkspaceToken(
        env: Env,
        userId: string,
        teamId: string,
        installationService: any
    ): Promise<UserSessionService> {
        const installation = await installationService.getInstallation(teamId);
        if (!installation || !installation.slackAccessToken) {
            throw new Error(`No installation found for workspace ${teamId}`);
        }
        return UserSessionService.createUserSessionService(env, userId, installation.slackAccessToken);
    }

    /**
     * Get session with fresh container state verification
     * Use this at user interaction entry points to ensure accurate state
     */
    private async getFreshSession(userId: string): Promise<UserSession> {
        let session = await this.userSessionRepository.findByUserId(userId);

        if (!session) {
            session = UserSession.createNew(userId);
            this.logger.warn('Creating new user session', {userId});
            await this.userSessionRepository.save(session);
        }

        const storedState = session.getState();

        // If stored state is 'ready', verify container is actually healthy
        if (storedState === 'ready' && session.config) {
            const containerService = ContainerService.createForUser(this.env, userId, session.config);
            const isHealthy = await containerService.checkContainerHealth();

            if (!isHealthy) {
                this.logger.info('Container state mismatch detected, updating session', {
                    userId,
                    storedState: 'ready',
                    actualState: 'not healthy',
                });

                // Update session to reflect reality
                const updatedSession = new UserSession(
                    session.userId,
                    session.config,
                    null, // Reset container state
                    session.createdAt,
                    new Date()
                );
                await this.userSessionRepository.save(updatedSession);

                return updatedSession;
            }
        }

        return session;
    }

    /**
     * Central method to ensure user session is ready for interaction
     * Handles all state transitions and messaging in one place
     */
    private async ensureSessionReady(
        userId: string,
        channel: string,
        threadTs: string
    ): Promise<SessionState> {
        const session = await this.getFreshSession(userId);

        const state = session.getState();
        this.logger.debug('Ensuring session ready', {userId, state, channel, threadTs});

        switch (state) {
            case 'needs_setup':
                this.logger.info('User needs setup', {userId});
                await this.messagingService.sendSetupMessage(userId, channel, threadTs);
                break;

            case 'needs_container_start':
                this.logger.info('User needs container start', {userId});
                // Send startup message
                await this.messagingService.sendStartupMessage(channel, threadTs);
                // Only initialize if container hasn't been started yet
                if (session.containerState === null) {
                    await this.initializeUserContainer(session, channel, threadTs);
                } else {
                    this.logger.info('Container already starting, skipping initialization', {
                        userId,
                        containerState: session.containerState,
                    });
                }
                break;

            case 'ready':
                this.logger.debug('User session ready, verifying container health', {userId});
                // Send greeting if not already sent
                if (!session.greetingSent) {
                    this.logger.info('Sending greeting for ready container', {userId});

                    await this.messagingService.sendMessage(
                        channel,
                        `🎉 Your Claude Code container is ready!\n\n*Repository connected:* ${session.config?.repoUrl}`,
                        threadTs
                    );

                    // Mark greeting as sent
                    const greetedSession = session.markGreetingSent();
                    await this.userSessionRepository.save(greetedSession);
                }
                break;

            case 'failed':
                this.logger.warn('User session in failed state, resetting for retry', {userId});

                // Reset container state to allow retry on next message
                const resetSession = new UserSession(
                    session.userId,
                    session.config,
                    null, // Reset container state
                    session.createdAt,
                    new Date()
                );
                await this.userSessionRepository.save(resetSession);

                await this.messagingService.sendErrorMessage(
                    channel,
                    'Your Claude Code container failed to start. Please send another message to retry.',
                    threadTs
                );
                break;

            default:
                this.logger.error('Unknown session state', {userId, state});
                break;
        }

        return state;
    }

    /**
     * Handle when a user starts a new assistant thread
     * Creates session if needed, shows config modal or starts container
     */
    async handleThreadStarted(userId: string, channel: string, threadTs: string): Promise<void> {
        this.logger.info('Handling thread started', {userId, channel, threadTs});
        await this.ensureSessionReady(userId, channel, threadTs);
    }

    /**
     * Handle when thread context changes (user switches threads)
     * Checks session state and container readiness
     */
    async handleThreadContextChanged(
        userId: string,
        channel: string,
        threadTs: string
    ): Promise<void> {
        this.logger.info('Handling thread context changed', {userId, channel, threadTs});
        await this.ensureSessionReady(userId, channel, threadTs);
        // TODO: Check container health, restart if needed
    }

    /**
     * Handle incoming user message
     * Routes based on session state: show config modal, start container, or process message
     */
    async handleUserMessage(
        userId: string,
        message: string,
        channel: string,
        threadTs: string
    ): Promise<void> {
        this.logger.info('Handling user message', {
            userId,
            channel,
            threadTs,
            messagePreview: message.substring(0, 50),
        });

        // Ensure session is ready (handles setup/container start messaging)
        const state = await this.ensureSessionReady(userId, channel, threadTs);

        // Only process message if session is ready
        // TODO: if not ready? we should handle it right?
        // If container != ready -> offer to restart via App Home
        // If config is missing -> offer to set it via App Home
        if (state === 'ready') {
            this.logger.info('Forwarding message to Claude', {userId});

            // Set thread status to show we're processing
            await this.messagingService.setThreadStatus(
                channel,
                threadTs,
                'is processing your message...'
            );

            try {
                // Get fresh session to access config
                const session = await this.getFreshSession(userId);
                if (!session?.config) {
                    this.logger.error('Session ready but no config found', {userId});
                    await this.messagingService.clearThreadStatus(channel, threadTs);
                    return;
                }

                // Create container service and forward message
                const containerService = ContainerService.createForUser(this.env, userId, session.config);

                const response = await containerService.processUserMessage(message);

                // Send Claude's response back to Slack (this automatically clears status)
                await this.messagingService.sendMessage(channel, response, threadTs);

                this.logger.info('Message processed successfully', {userId});
            } catch (error) {
                this.logger.error('Failed to process message', {
                    userId,
                    error: String(error),
                });

                // Send appropriate error message based on error type
                const userMessage = this.getErrorMessageForUser(error);
                await this.messagingService.sendErrorMessage(channel, userMessage, threadTs);

                // Clear status explicitly after error
                await this.messagingService.clearThreadStatus(channel, threadTs);
            }
        } else {
            this.logger.warn('Message not processed, session not ready', {userId, state});
            // ensureSessionReady already handled the appropriate messaging
        }
    }

    /**
     * Handle app home opened event
     * Updates app home view with current user status and actions
     */
    async handleAppHomeOpened(userId: string): Promise<void> {
        this.logger.info('Handling app home opened', {userId});

        try {
            // Get fresh session with verified container state
            const session = await this.getFreshSession(userId);

            // Create app home view blocks based on current state
            // TODO? Does this belong here?
            const appHomeBlocks = this.createAppHomeBlocks(session);

            // Update app home view
            await this.messagingService.publishAppHomeView(userId, appHomeBlocks);

            this.logger.info('App home view updated successfully', {userId});
        } catch (error) {
            this.logger.error('Failed to handle app home opened', {
                userId,
                error: String(error),
            });
        }
    }

    /**
     * Create app home blocks based on user session state
     */
    private createAppHomeBlocks(session: UserSession | null): any[] {
        const statusEmoji = session
            ? this.getStatusEmoji(session.getState(), session.containerState)
            : '⚠️';
        const statusText = session
            ? this.getStatusText(session.getState(), session.containerState)
            : 'Not configured';
        const repoText = session?.config?.repoUrl
            ? `💻 *Repository:* ${session.config.repoUrl}`
            : '💻 *Repository:* No repository configured';

        return [
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: '🏠 Claude Code Portable',
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `${statusEmoji} *Status:* ${statusText}\n ${repoText}`,
                },
            },
            {
                type: 'divider',
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '*Quick Actions*',
                },
            },
            {
                type: 'actions',
                elements: [
                    {
                        type: 'button',
                        text: {
                            type: 'plain_text',
                            text: '💬 Start New Chat',
                        },
                        action_id: 'start_new_chat',
                        style: 'primary',
                    },
                    {
                        type: 'button',
                        text: {
                            type: 'plain_text',
                            text: '🔄 Restart Instance',
                        },
                        action_id: 'restart_instance',
                    },
                ],
            },
            {
                type: 'actions',
                elements: [
                    {
                        type: 'button',
                        text: {
                            type: 'plain_text',
                            text: '⚙️ Reset Configuration',
                        },
                        action_id: 'reset_configuration',
                    },
                    {
                        type: 'button',
                        text: {
                            type: 'plain_text',
                            text: '📖 Help & Documentation',
                        },
                        action_id: 'show_help',
                        url: 'https://github.com/alexander-zuev/claude-code-portable',
                    },
                ],
            },
        ];
    }

    /**
     * Get status emoji based on session state
     */
    private getStatusEmoji(state: string, containerState: string | null): string {
        if (state === 'ready') return '✅';
        if (state === 'needs_container_start' && containerState === 'starting') return '🔄';
        if (state === 'failed') return '❌';
        if (state === 'needs_setup') return '⚙️';
        return '⚠️';
    }

    /**
     * Get status text based on session state
     */
    private getStatusText(state: string, containerState: string | null): string {
        if (state === 'ready') return 'Ready';
        if (state === 'needs_container_start' && containerState === 'starting') return 'Starting...';
        if (state === 'needs_container_start' && containerState === null) return 'Ready to start';
        if (state === 'failed') return 'Failed (needs restart)';
        if (state === 'needs_setup') return 'Needs configuration';
        this.logger.error('Unknown session state', {state, containerState});
        return 'Unknown';
    }

    /**
     * Handle user configuration modal submission
     * Saves config, restarts container with new settings, and handles success/errors
     */
    async handleUserConfigModalSubmission(userId: string, config: UserClaudeConfig): Promise<void> {
        this.logger.info('Handling user config modal submission', {
            userId,
            repoUrl: config.repoUrl,
        });

        try {
            // 1. First ensure we have the right config (as we can recover)
            let session = await this.getFreshSession(userId);

            // Update session with new config (resets container state)
            session = session.updateConfig(config);
            await this.userSessionRepository.save(session);

            this.logger.info('User config saved successfully', {
                userId,
                state: session.getState(),
                repoUrl: config.repoUrl,
            });

            // 2. Then restart container with new configuration
            await this.restartUserContainer(userId);

            // 3. Handle success - send success message to DM
            await this.messagingService.sendConfigSuccessMessage(userId);

            this.logger.info('User config modal submission completed successfully', {userId});
        } catch (error) {
            this.logger.error('Failed to handle user config modal submission', {
                userId,
                error: String(error),
            });

            // 4. Handle errors - ensure session is marked as failed
            try {
                const session = await this.userSessionRepository.findByUserId(userId);
                if (session) {
                    const failedSession = session.markContainerFailed();
                    await this.userSessionRepository.save(failedSession);
                }
            } catch (sessionError) {
                this.logger.error('Failed to mark session as failed after config error', {
                    userId,
                    error: String(sessionError),
                });
            }

            // Re-throw to let the caller handle user-facing error response
            throw error;
        }
    }

    /**
     * Initialize user's container with their configuration
     * Handles container start, session state updates, and user messaging
     */
    private async initializeUserContainer(
        session: UserSession,
        channel: string,
        threadTs: string
    ): Promise<void> {
        const userId = session.userId;
        this.logger.info('Initializing user container', {userId});

        if (!session.config) {
            this.logger.error('Cannot initialize container without user config', {userId});
            return;
        }

        try {
            this.logger.info('Step 1: Marking session as starting', {
                userId,
                currentState: session.getState(),
                currentContainerState: session.containerState,
            });

            // 1. Mark session as starting
            let updatedSession = session.markContainerStarting();
            this.logger.info('Session marked as starting, saving to repository', {
                userId,
                newState: updatedSession.getState(),
                newContainerState: updatedSession.containerState,
            });

            await this.userSessionRepository.save(updatedSession);
            this.logger.info('Session saved to repository', {userId});

            this.logger.info('Step 2: Creating container service', {
                userId,
                repoUrl: session.config.repoUrl,
                hasAnthropicKey: !!session.config.anthropicKey,
                hasGithubToken: !!session.config.githubToken,
            });

            // 2. Create ContainerService and start container
            const containerService = ContainerService.createForUser(this.env, userId, session.config);

            this.logger.info('Step 3: Starting container', {userId});
            await containerService.startContainer();

            this.logger.info('Step 4: Marking session as ready', {userId});
            // 3. Mark session as ready
            updatedSession = updatedSession.markContainerReady();
            await this.userSessionRepository.save(updatedSession);

            this.logger.info('Step 5: Sending success message', {userId});

            // 4. Send success message to user
            await this.messagingService.sendMessage(
                channel,
                `🎉 Your Claude Code container is ready!\n\n*Repository connected:* ${session.config.repoUrl}`,
                threadTs
            );

            // 5. Mark greeting as sent
            updatedSession = updatedSession.markGreetingSent();
            await this.userSessionRepository.save(updatedSession);

            this.logger.info('User container initialized successfully', {userId});
        } catch (error) {
            this.logger.error('Failed to initialize user container', {
                userId,
                error: String(error),
                stack: error instanceof Error ? error.stack : undefined,
            });

            // Mark session as failed
            const failedSession = session.markContainerFailed();
            await this.userSessionRepository.save(failedSession);

            // Send error message with restart button
            await this.messagingService.sendContainerStartupFailureMessage(channel, threadTs);
        }
    }

    /**
     * Convert container errors to user-friendly messages
     * Handles both structured APIException and generic HTTPException errors
     */
    private getErrorMessageForUser(error: any): string {
        const errorType = error.errorType;
        const statusCode = error.statusCode;

        // Handle structured APIException errors (payment, rate limit, auth)
        switch (errorType) {
            case 'CREDIT_TOO_LOW':
                return 'Your Anthropic API credits are too low. Please add credits to your account and try again.';
            case 'RATE_LIMITED':
                return "You've hit the API rate limit. Please wait a moment and try again.";
            case 'INVALID_API_KEY':
                return 'Your Anthropic API key is invalid. Please check your configuration and update your API key.';
            default:
                // Handle unstructured errors by status code
                if (statusCode) {
                    switch (statusCode) {
                        case 402:
                            return 'Payment required. Please check your Anthropic account billing.';
                        case 429:
                            return 'Too many requests. Please wait a moment and try again.';
                        case 401:
                            return 'Authentication failed. Please check your API credentials.';
                        case 500:
                        case 502:
                        case 503:
                        case 504:
                            return 'Claude Code service is temporarily unavailable. Please try again in a moment.';
                        default:
                            return 'Sorry, I encountered an error processing your message. Please try again.';
                    }
                }

                // Default fallback for unknown errors
                return 'Sorry, I encountered an error processing your message. Please try again.';
        }
    }

    /**
     * Restarts user's container instance
     * Improved flow: check state → take action → update state → handle errors
     */
    async restartUserContainer(userId: string): Promise<void> {
        this.logger.info('Restarting user container', {userId});

        // 1. Retrieve current state with fresh container verification
        const session = await this.getFreshSession(userId);
        if (!session || !session.config) {
            this.logger.warn(
                'Cannot restart container - no session or config found, sending setup message',
                {userId}
            );

            // Get configuration first, if we don't have it
            // We can not start without config
            try {
                await this.messagingService.sendSetupMessage(userId, userId);
                this.logger.info('Setup message sent to user DM', {userId});
            } catch (error) {
                this.logger.error('Failed to send setup message to user DM', {
                    userId,
                    error: String(error),
                });
            }
            return;
        }

        // 2. Prevent duplicate calls - check if already starting
        if (session.containerState === 'starting') {
            this.logger.warn('Container restart already in progress, skipping', {userId});
            return;
        }

        let updatedSession = session;
        const containerService = ContainerService.createForUser(this.env, userId, session.config);

        try {
            // 3. Mark as starting to prevent duplicate calls
            updatedSession = session.markContainerStarting();
            await this.userSessionRepository.save(updatedSession);
            this.logger.info('Marked session as starting restart', {userId});

            // 4. Restart container
            await containerService.restartContainer();

            // 6. Update session state to ready
            updatedSession = updatedSession.markContainerReady();
            await this.userSessionRepository.save(updatedSession);
            this.logger.info('User container restarted successfully', {userId});

            // 7. Update App Home UI
            const blocks = this.createAppHomeBlocks(updatedSession);
            await this.messagingService.publishAppHomeView(userId, blocks);
        } catch (error) {
            this.logger.error('Failed to restart user container', {
                userId,
                error: String(error),
            });

            // 8. Handle errors by updating state
            const failedSession = updatedSession.markContainerFailed();
            await this.userSessionRepository.save(failedSession);

            // Update App Home to show failed state
            const blocks = this.createAppHomeBlocks(failedSession);
            await this.messagingService.publishAppHomeView(userId, blocks);
        }
    }

    /**
     * Resets user's configuration by clearing their config and container state
     * Used when user wants to reconfigure their settings
     */
    async resetUserConfiguration(userId: string): Promise<void> {
        try {
            this.logger.info('Resetting user configuration', {userId});

            // Create new session with no config (forces setup flow)
            const resetSession = UserSession.createNew(userId);
            await this.userSessionRepository.save(resetSession);

            this.logger.info('User configuration reset successfully', {userId});

            // Update App Home to show needs setup state
            const blocks = this.createAppHomeBlocks(resetSession);
            await this.messagingService.publishAppHomeView(userId, blocks);
        } catch (error) {
            this.logger.error('Failed to reset user configuration', {
                userId,
                error: String(error),
            });
            throw error;
        }
    }
}