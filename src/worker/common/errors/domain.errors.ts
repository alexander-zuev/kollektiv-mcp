import {BaseError} from '@/worker/common/errors';

// Domain Errors == Business Rules Errors
abstract class DomainError extends BaseError {
}


// Auth Flow domain errors
export class AuthFlowError extends DomainError {
    public readonly cause?: unknown;
    public readonly code?: string;

    constructor(userMessage: string, opts?: { cause?: unknown; code?: string }) {
        super(userMessage, opts?.cause ? { cause: opts.cause } : undefined);
        this.cause = opts?.cause;
        this.code = opts?.code;
        
        // Preserve original error cause chain
        if (opts?.cause instanceof Error) {
            this.stack = opts.cause.stack;
        }
    }
}