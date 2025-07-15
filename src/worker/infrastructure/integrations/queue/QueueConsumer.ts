import type { QueueMessage, WaitlistWelcomeMessage } from '@/shared/types/queue.types';
import type { IEmailService } from '@/domain/interfaces/IEmailService';
import { isWaitlistMessage } from '@/shared/types/queue.types';
import { infrastructureLogger } from '@/infrastructure/logger/logger';

// TODO: This requires a bit of re-think
export interface QueueConsumerDependencies {
  emailService: IEmailService;
}

export class QueueConsumer {
  constructor(private readonly dependencies: QueueConsumerDependencies) {}

  async handleMessage(message: Message<QueueMessage>): Promise<void> {
    const msg = message.body;

    try {
      if (!isWaitlistMessage(msg)) {
        infrastructureLogger.warn('Ignoring non-waitlist message', { type: msg.type });
        message.ack();
        return;
      }

      await this.handleWaitlistMessage(msg);
      message.ack();

      infrastructureLogger.info('Message processed and acknowledged', {
        type: msg.type,
        correlationId: msg.correlationId,
      });
    } catch (error) {
      infrastructureLogger.error('Message processing failed, will retry', {
        type: msg.type,
        correlationId: msg.correlationId,
        error: error instanceof Error ? error.message : String(error),
      });
      // Don't ack - let it retry
      throw error;
    }
  }

  private async handleWaitlistMessage(message: WaitlistWelcomeMessage): Promise<void> {
    const { email } = message.data;

    infrastructureLogger.info('Sending welcome email', {
      email,
      correlationId: message.correlationId,
    });

    await this.dependencies.emailService.sendWelcomeEmail(email);
  }
}