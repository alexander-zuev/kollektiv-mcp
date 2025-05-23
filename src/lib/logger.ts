// Define log levels
export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
}

// Logger class with configurable log level
class Logger {
    private level: LogLevel;

    constructor(level: LogLevel = LogLevel.INFO) {
        this.level = level;
    }

    // Set the log level
    setLevel(level: LogLevel): void {
        this.level = level;
    }

    // Debug level logging (most verbose)
    debug(message: string, ...args: any[]): void {
        if (this.level <= LogLevel.DEBUG) {
            console.debug(`[DEBUG] ${message}`, ...args);
        }
    }

    // Info level logging (standard information)
    info(message: string, ...args: any[]): void {
        if (this.level <= LogLevel.INFO) {
            console.info(`[INFO] ${message}`, ...args);
        }
    }

    // Warning level logging
    warn(message: string, ...args: any[]): void {
        if (this.level <= LogLevel.WARN) {
            console.warn(`[WARN] ${message}`, ...args);
        }
    }

    // Error level logging (most important)
    error(message: string, ...args: any[]): void {
        if (this.level <= LogLevel.ERROR) {
            console.error(`[ERROR] ${message}`, ...args);
        }
    }
}

// Create logger with default level
export const logger = new Logger(LogLevel.INFO);

// Function to configure logger with values from config
export function configureLogger(logLevel: number): void {
    logger.setLevel(logLevel);
}