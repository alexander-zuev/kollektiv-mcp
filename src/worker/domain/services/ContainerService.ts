import { createLogger } from '@/infrastructure/logger/logger';
import type { UserClaudeConfig } from '@/domain/models/UserClaudeConfig';
import type { ClaudeCodeContainerDO } from '@/infrastructure/durable-objects/ClaudeContainerDO';
import { ContainerStartupError } from '@/shared/errors';

/**
 * Domain service for managing Claude Code container lifecycle
 * Abstracts container DO operations and provides clean interface
 *
 * Handles per-instance environment variables using manualStart pattern
 */
export class ContainerService {
  private readonly logger = createLogger('ContainerService', 'Domain');

  constructor(
    private readonly containerDO: DurableObjectStub<ClaudeCodeContainerDO>,
    private readonly config: UserClaudeConfig
  ) {}

  /**
   * Factory method to create ContainerService for a user
   * Centralizes container DO creation logic
   */
  static createForUser(env: Env, userId: string, config: UserClaudeConfig): ContainerService {
    const containerId = env.CLAUDE_CODE_PORTABLE.idFromName(userId);
    const containerDO = env.CLAUDE_CODE_PORTABLE.get(containerId);
    return new ContainerService(containerDO, config);
  }

  /**
   * Check if error is retryable container provisioning error
   */
  private isRetryableContainerError(error: unknown): boolean {
    if (!(error instanceof Error)) return false;

    const message = error.message.toLowerCase();
    const retryableMessages = [
      'no container instance that can be provided',
      'there is no container instance that can be provided',
    ];

    return retryableMessages.some(msg => message.includes(msg));
  }

  /**
   * Start container with retry logic for infrastructure failures
   */
  private async startContainerWithRetry(maxRetries = 5): Promise<void> {
    const envVars = {
      ANTHROPIC_API_KEY: this.config.anthropicKey,
      GITHUB_TOKEN: this.config.githubToken,
      GITHUB_REPO_URL: this.config.repoUrl,
    };

    // Validate required environment variables
    if (!this.config.anthropicKey || !this.config.githubToken || !this.config.repoUrl) {
      const missing = [];
      if (!this.config.anthropicKey) missing.push('ANTHROPIC_API_KEY');
      if (!this.config.githubToken) missing.push('GITHUB_TOKEN');
      if (!this.config.repoUrl) missing.push('GITHUB_REPO_URL');

      this.logger.error('Cannot start container: missing required environment variables', {
        userId: this.config.userId,
        missingVars: missing,
      });
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        this.logger.info('Attempting container start', {
          userId: this.config.userId,
          attempt,
          maxRetries,
        });

        // TODO: Once PR is merged, pass envVars to startAndWaitForPorts() instead of start()
        // to fix port readiness checks failing when container starts but port isn't ready immediately
        const startResult = await this.containerDO.start({ envVars });

        this.logger.info('containerDO.start() completed successfully', {
          userId: this.config.userId,
          attempt,
          resultType: typeof startResult,
        });

        return; // Success - exit retry loop
      } catch (startError) {
        // Log detailed error structure for analysis
        this.logger.error('containerDO.start() failed - detailed error analysis', {
          userId: this.config.userId,
          attempt,
          maxRetries,
          errorType: startError?.constructor?.name,
          errorMessage:
            startError instanceof Error
              ? startError.message || 'Error message is undefined'
              : 'Unknown error type',
          errorString: String(startError) || 'Error string is undefined',
          errorProperties:
            startError instanceof Error ? Object.getOwnPropertyNames(startError) : [],
          isRetryable: this.isRetryableContainerError(startError),
        });

        // Check if error is retryable
        if (!this.isRetryableContainerError(startError)) {
          this.logger.error('Non-retryable error encountered, failing immediately', {
            userId: this.config.userId,
            error: String(startError),
          });
          throw startError;
        }

        // If this was the last attempt, throw the error
        if (attempt === maxRetries) {
          this.logger.error('All retry attempts exhausted', {
            userId: this.config.userId,
            finalAttempt: attempt,
            error: String(startError),
          });
          throw startError;
        }

        // Calculate delay with exponential backoff + jitter
        const baseDelay = 500 * Math.pow(2, attempt - 1); // 500ms, 1s, 2s
        const jitter = Math.random() * 200; // 0-200ms jitter
        const totalDelay = baseDelay + jitter;

        this.logger.warn('Retrying container start after delay', {
          userId: this.config.userId,
          attempt,
          nextAttempt: attempt + 1,
          delayMs: Math.round(totalDelay),
        });

        await new Promise(resolve => setTimeout(resolve, totalDelay));
      }
    }
  }

  /**
   * Start container with user configuration
   * Uses manualStart with per-instance environment variables
   */
  async startContainer(): Promise<void> {
    this.logger.info('Starting container', {
      userId: this.config.userId,
      repoUrl: this.config.repoUrl,
    });

    try {
      this.logger.info('Calling containerDO.start() with env vars', {
        userId: this.config.userId,
        hasAnthropicKey: !!this.config.anthropicKey,
        hasGithubToken: !!this.config.githubToken,
        repoUrl: this.config.repoUrl,
      });

      // Use retry logic for container start
      await this.startContainerWithRetry(5);

      this.logger.info('containerDO.start() completed, calling startup endpoint', {
        userId: this.config.userId,
      });

      const response = await this.containerDO.fetch(
        new Request('http://container/startup', {
          method: 'POST',
        })
      );

      this.logger.info('Startup endpoint response received', {
        userId: this.config.userId,
        status: response.status,
        ok: response.ok,
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error('Container startup failed, stopping container to avoid broken state', {
          userId: this.config.userId,
          status: response.status,
          errorText,
        });
        
        // CRITICAL: Stop the container if startup fails to ensure atomicity
        try {
          await this.stopContainer();
          this.logger.info('Container stopped after startup failure', {
            userId: this.config.userId,
          });
        } catch (stopError) {
          this.logger.error('Failed to stop container after startup failure', {
            userId: this.config.userId,
            stopError: String(stopError),
          });
        }
        
        throw new ContainerStartupError(
          `Container startup failed: ${response.status} - ${errorText}`,
          response.status
        );
      }

      const sessionState = (await response.json()) as {
        repo_url: string;
        repo_cloned: boolean;
        repo_path: string;
        has_claude_session: boolean;
        claude_session_id?: string;
      };

      // Mark repo as cloned in DO storage if it was cloned
      if (sessionState.repo_cloned) {
        await this.containerDO.setRepoCloned();
      }

      this.logger.info('Container started and ready', {
        userId: this.config.userId,
        repoUrl: sessionState.repo_url,
        repoCloned: sessionState.repo_cloned,
        hasClaudeSession: sessionState.has_claude_session,
      });
    } catch (error) {
      this.logger.error('Failed to start container', {
        userId: this.config.userId,
        error: String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      throw error;
    }
  }

  /**
   * Stop container and cleanup resources
   * Does not throw if container is already stopped
   */
  async stopContainer(): Promise<void> {
    this.logger.info('Stopping container', { userId: this.config.userId });

    // Check if container is actually running first
    const { isRunning } = await this.containerDO.getContainerHealth();
    if (!isRunning) {
      this.logger.debug('Container not running, no action needed', {
        userId: this.config.userId,
      });
      return;
    }

    try {
      await this.containerDO.stop();
      this.logger.info('Container stopped successfully', { userId: this.config.userId });
    } catch (error) {
      // Check if this is a "container not running" error (race condition fallback)
      const errorMessage = error instanceof Error ? error.message : String(error);

      if (errorMessage.includes('signal() cannot be called on a container that is not running')) {
        this.logger.debug('Container stopped between check and stop call', {
          userId: this.config.userId,
          error: String(error),
        });
        return; // Don't throw - race condition, container stopped
      }
      this.logger.error('Failed to stop container, running destroy() fallback', {
        userId: this.config.userId,
        error: String(error),
      });
      try {
        await this.containerDO.destroy();
        this.logger.info('Container destroyed successfully after stop failure', {
          userId: this.config.userId,
        });
      } catch (destroyError) {
        this.logger.error('Both stop and destroy failed during restart', {
          userId: this.config.userId,
          stopError: String(error),
          destroyError: String(destroyError),
        });
        throw destroyError;
      }
    }
  }

  /**
   * Send message to running container
   */
  async processUserMessage(message: string): Promise<string> {
    this.logger.info('Sending message to container', {
      userId: this.config.userId,
      messagePreview: message.substring(0, 50),
    });

    try {
      const response = await this.containerDO.fetch(
        new Request('http://container/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message }),
        })
      );

      if (!response.ok) {
        let errorMessage = `Container message failed: ${response.status}`;
        let errorType = 'UNKNOWN_ERROR';

        const responseClone = response.clone();
        try {
          // Try to parse structured error response from original
          const errorData = (await response.json()) as {
            message?: string;
            details?: {
              error_type?: string;
              raw_error?: string;
            };
          };

          if (errorData.message) {
            errorMessage = errorData.message;
          }

          if (errorData.details?.error_type) {
            errorType = errorData.details.error_type;
          }

          this.logger.error('Container returned structured error', {
            userId: this.config.userId,
            status: response.status,
            errorType,
            message: errorMessage,
          });
        } catch {
          // Fallback to text from clone if JSON parsing fails
          const errorText = await responseClone.text();
          errorMessage = `Container message failed: ${response.status} ${errorText}`;

          this.logger.error('Container returned unstructured error', {
            userId: this.config.userId,
            status: response.status,
            errorText,
          });
        }

        // Create error with type information for upstream handling
        const error = new Error(errorMessage);
        (error as any).errorType = errorType;
        (error as any).statusCode = response.status;
        throw error;
      }

      const result = (await response.json()) as {
        success: boolean;
        response: string;
        session_id?: string;
        cost?: number;
      };

      if (!result.success) {
        throw new Error('Container returned unsuccessful response');
      }

      this.logger.info('Container message processed', {
        userId: this.config.userId,
        responseLength: result.response.length,
        cost: result.cost,
      });

      return result.response;
    } catch (error) {
      this.logger.error('Failed to send message to container', {
        userId: this.config.userId,
        error: String(error),
      });
      throw error;
    }
  }

  /**
   * Check if container is healthy (running AND repo cloned)
   * Uses DO storage for instant, accurate state without HTTP calls
   */
  async checkContainerHealth(): Promise<boolean> {
    this.logger.debug('Checking container health', { userId: this.config.userId });

    try {
      const { isHealthy } = await this.containerDO.getContainerHealth();
      this.logger.debug('Container health check result', {
        userId: this.config.userId,
        isHealthy,
      });

      return isHealthy;
    } catch (error) {
      this.logger.warn('Container health check failed', {
        userId: this.config.userId,
        error: String(error),
      });
      return false;
    }
  }

  /**
   * Restart container with current configuration
   * Stops current container and starts with same config
   * Uses destroy() as fallback if stop() fails
   */
  async restartContainer(): Promise<void> {
    this.logger.info('Restarting container', {
      userId: this.config.userId,
      repoUrl: this.config.repoUrl,
    });
    try {
      // Attempt to stop the container, with .destroy() on error
      await this.stopContainer();
      // Start with current config
      await this.startContainer();

      this.logger.info('Container restarted successfully', { userId: this.config.userId });
    } catch (error) {
      this.logger.error('Failed to restart container', {
        userId: this.config.userId,
        error: String(error),
      });
      throw error;
    }
  }
}