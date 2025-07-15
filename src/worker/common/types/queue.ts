// Base message type with discriminated union
export type QueueMessageType = 'waitlist_welcome' | 'slack_notification' | 'container_event';

interface BaseQueueMessage {
  type: QueueMessageType;
  timestamp: string;
  correlationId: string;
}

// Specific message types
export interface WaitlistWelcomeMessage extends BaseQueueMessage {
  type: 'waitlist_welcome';
  data: {
    email: string;
  };
}

export interface SlackNotificationMessage extends BaseQueueMessage {
  type: 'slack_notification';
  data: {
    userId: string;
    message: string;
    channel?: string;
  };
}

export interface ContainerEventMessage extends BaseQueueMessage {
  type: 'container_event';
  data: {
    userId: string;
    event: 'started' | 'stopped' | 'failed';
    containerId: string;
  };
}

// Union type for all messages
export type QueueMessage = 
  | WaitlistWelcomeMessage 
  | SlackNotificationMessage 
  | ContainerEventMessage;

// Type guard functions
export function isWaitlistMessage(msg: QueueMessage): msg is WaitlistWelcomeMessage {
  return msg.type === 'waitlist_welcome';
}

export function isSlackNotificationMessage(msg: QueueMessage): msg is SlackNotificationMessage {
  return msg.type === 'slack_notification';
}

export function isContainerEventMessage(msg: QueueMessage): msg is ContainerEventMessage {
  return msg.type === 'container_event';
}