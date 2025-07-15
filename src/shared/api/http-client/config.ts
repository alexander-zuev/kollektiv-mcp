/**
 * API Client configuration
 *
 * @example
 * // Default configuration (with case conversion)
 * const apiClient = createApiClient({
 *   baseUrl: 'https://api.example.com',
 * });
 *
 * @example
 * // Disable case conversion
 * const apiClient = createApiClient({
 *   baseUrl: 'https://api.example.com',
 *   caseConversion: false,
 * });
 *
 * @example
 * // Custom case conversion
 * const apiClient = createApiClient({
 *   baseUrl: 'https://api.example.com',
 *   caseConversion: {
 *     requestToSnakeCase: true,    // Convert request bodies to snake_case
 *     responseToCamelCase: false,  // Don't convert response bodies to camelCase
 *   },
 * });
 */

export interface ApiClientConfig {
    baseUrl?: string;
    headers?: Record<string, string>;
    timeout?: number;
    getAuthHeaders?: () => Record<string, string>;
    handleAuthError?: (statusCode: 401 | 403, errorCode?: string) => Promise<void>;
    /**
     * Configure case conversion behavior
     * - true: Convert request bodies to snake_case and responses to camelCase (default)
     * - false: Don't perform any case conversion
     * - object: Custom configuration
     */
    caseConversion?:
        | boolean
        | {
        /**
         * Convert request bodies from camelCase to snake_case
         * @default true
         */
        requestToSnakeCase?: boolean;
        /**
         * Convert response bodies from snake_case to camelCase
         * @default true
         */
        responseToCamelCase?: boolean;
    };
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';