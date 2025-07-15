import {logger} from '@/common/logger';

// HTTP verb/type restriction
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Used for filling path templates like "/user/:id"
export type PathParams = Record<string, string | number>;
export type QueryParams = Record<string, string | number | boolean | undefined>;

// Request config options for each call
export interface ApiRequestOptions {
    pathParams?: PathParams;
    queryParams?: QueryParams;
    headers?: Record<string, string>;
    timeoutMs?: number;
}

/** Api error kinds:
 * - network: Network error (e.g. connection timeout)
 * - http: HTTP error (e.g. 4xx, 5xx)
 * - parse: JSON parse error
 * - cors: CORS error
 * - timeout: Request timeout
 */
export type ApiErrorKind = 'network' | 'HTTP' | 'parse' | 'other' | 'timeout';

/**
 * API error class
 * @param message - Error message
 * @param status - HTTP status code
 * @param statusText - HTTP status text
 * @param kind - Error kind
 * @param payload - Parsed JSON body when Content-Type is application/json, otherwise undefined
 */
export class ApiError extends Error {
    constructor(
        public message: string,
        public status: number,
        public statusText: string,
        public kind: ApiErrorKind = 'HTTP',
        /** Parsed JSON body when Content-Type is application/json, otherwise undefined */
        public payload?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export function logApiError(kind: ApiErrorKind, url: URL, status: number, msg: string): void {
    logger.error(`[API] ${kind} error ${status}: ${msg}`);
}