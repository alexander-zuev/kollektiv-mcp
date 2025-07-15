import {createEmailService} from '@/infrastructure/container/deps';
import {QueueConsumer} from '@/infrastructure/queue/QueueConsumer';
import type {QueueMessage} from '@/shared/types/queue.types';

export async function queue(batch: MessageBatch, env: Env): Promise<void> {
    const emailService = createEmailService(env);
    const consumer = new QueueConsumer({emailService});
    for (const message of batch.messages) {
        await consumer.handleMessage(message as Message<QueueMessage>);
    }
}