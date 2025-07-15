/**
 * API Client configuration
 */

export interface ApiClientConfig {
    baseUrl: string;
    headers?: Record<string, string>;
    timeout?: number;
    authHeader?: () => Record<string, string>;
    onAuthError?: (statusCode: 401 | 403, errorCode?: string) => Promise<void>;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';