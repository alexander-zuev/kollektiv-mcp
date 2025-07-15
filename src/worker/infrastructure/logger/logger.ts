interface LogContext {
  [key: string]: unknown;
}

interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  context?: LogContext;
  timestamp: string;
  service: string;
  operation?: string;
}

class Logger {
  private service: string;
  private operation?: string;

  constructor(service: string, operation?: string) {
    this.service = service;
    this.operation = operation;
  }

  private formatLog(level: LogEntry['level'], message: string, context?: LogContext): void {
    const entry: LogEntry = {
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
      service: this.service,
      operation: this.operation,
    };

    // Environment-based formatting: pretty print in dev, compact in production
    const isDev = typeof navigator === 'undefined';

    const contextStr = context
      ? isDev
        ? `\n${JSON.stringify(context, null, 2)}`
        : ` | ${JSON.stringify(context)}`
      : '';

    const logLine = this.operation
      ? `[${level.toUpperCase()}] ${this.service}:${this.operation} - ${message}${contextStr}`
      : `[${level.toUpperCase()}] ${this.service} - ${message}${contextStr}`;

    switch (level) {
      case 'debug':
        console.debug(logLine);
        break;
      case 'info':
        console.log(logLine);
        break;
      case 'warn':
        console.warn(logLine);
        break;
      case 'error':
        console.error(logLine);
        break;
    }
  }

  debug(message: string, context?: LogContext): void {
    this.formatLog('debug', message, context);
  }

  info(message: string, context?: LogContext): void {
    this.formatLog('info', message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.formatLog('warn', message, context);
  }

  error(message: string, context?: LogContext): void {
    this.formatLog('error', message, context);
  }
}

// Factory functions for each layer
export const createLogger = (service: string, operation?: string): Logger => {
  return new Logger(service, operation);
};

// Pre-configured loggers for each service
export const apiLogger = createLogger('API');
export const useCaseLogger = createLogger('UseCase');
export const domainLogger = createLogger('Domain');
export const infrastructureLogger = createLogger('Infrastructure');
export const workerLogger = createLogger('Worker');