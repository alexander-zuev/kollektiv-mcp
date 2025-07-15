import type { QueueMessage } from '@/shared/types/queue.types';
import { infrastructureLogger } from '@/infrastructure/logger/logger';

export class QueueService {
  constructor(private readonly queue: Queue) {}

  async sendMessage(message: QueueMessage): Promise<void> {
    infrastructureLogger.info('Sending message to queue', {
      type: message.type,
      correlationId: message.correlationId,
    });

    try {
      await this.queue.send(message);
      
      infrastructureLogger.info('Message sent to queue successfully', {
        type: message.type,
        correlationId: message.correlationId,
      });
    } catch (error) {
      infrastructureLogger.error('Failed to send message to queue', {
        type: message.type,
        correlationId: message.correlationId,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  async sendBatch(messages: QueueMessage[]): Promise<void> {
    infrastructureLogger.info('Sending batch messages to queue', {
      count: messages.length,
      types: messages.map(m => m.type),
    });

    try {
      await this.queue.sendBatch(messages);
      
      infrastructureLogger.info('Batch messages sent to queue successfully', {
        count: messages.length,
      });
    } catch (error) {
      infrastructureLogger.error('Failed to send batch messages to queue', {
        count: messages.length,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }
}