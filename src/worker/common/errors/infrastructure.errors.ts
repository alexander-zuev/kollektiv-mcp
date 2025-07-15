import type {z} from "zod";
import {BaseError} from '@/worker/common/errors';

// Infrastructure Layer Error
abstract class InfrastructureError extends BaseError {
}

// Database errors - minimal but useful
export class DatabaseError extends InfrastructureError {
    constructor(
        message: string,
        public readonly sqlCode?: string,
        public readonly severity?: string,
        public readonly originalCause?: Error,
        public readonly query?: string
    ) {
        super(message);
    }
}

export class DatabaseIntegrityError extends DatabaseError {
    constructor(message: string, sqlCode?: string, severity?: string, originalCause?: Error) {
        super(message, sqlCode, severity, originalCause);
    }
}

export class DatabaseConnectionError extends DatabaseError {
    constructor(message: string, sqlCode?: string, severity?: string, originalCause?: Error) {
        super(message, sqlCode, severity, originalCause);
    }
}

export class DatabaseTimeoutError extends DatabaseError {
    constructor(message: string, sqlCode?: string, severity?: string, originalCause?: Error) {
        super(message, sqlCode, severity, originalCause);
    }
}

// Storage errors (KV + D1)
export class StorageError extends InfrastructureError {
    constructor(
        message: string,
        public readonly operation?: 'read' | 'write' | 'delete',
        public readonly storageType?: 'KV' | 'D1',
        public readonly originalCause?: Error
    ) {
        super(message);
    }
}

// Specific storage failures
export class StorageUnavailableError extends StorageError {
    constructor(storageType: 'KV' | 'D1', operation: string) {
        super(`${storageType} storage unavailable during ${operation}`, operation as any, storageType);
    }
}

export class StorageSerializationError extends StorageError {
    constructor(message: string, data?: any) {
        super(`Serialization error: ${message}`, 'write');
    }
}

// Email service errors
export class EmailServiceError extends InfrastructureError {
    constructor(
        message: string,
        public readonly operation?: 'send' | 'configuration',
        public readonly provider?: string,
        public readonly originalCause?: Error
    ) {
        super(message);
    }
}


// HTTP Form parsing errors
export class FormValidationError extends InfrastructureError {
    public issues: z.core.$ZodIssue[];

    constructor(issues: z.core.$ZodIssue[]) {
        // Keep message simple and user-friendly
        super("Form validation failed");
        this.issues = issues;
    }
}