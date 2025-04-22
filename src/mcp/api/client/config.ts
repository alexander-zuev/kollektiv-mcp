/**
 * API Client configuration
 */
export interface ApiClientConfig {
    baseUrl: string;
    headers?: Record<string, string>;
    timeout?: number;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";