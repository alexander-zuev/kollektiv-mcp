/**
 * API Client
 * A clean, type-safe HTTP client for making API requests
 */

import {
    ApiError,
    ApiResponse,
    ApiRequestOptions,
    HttpMethod,
    PathParams,
    QueryParams
} from '@/mcp/api/types/base';
import {ApiClientConfig} from "@/mcp/api/client/config";
import {ApiRoutePath} from '@/mcp/api/routes'
import {convertToSnakeCase, convertToCamelCase} from "@/mcp/api/utils/caseConverter";


/**
 * Creates an API client with the specified configuration
 * @param options - Configuration options
 * @returns An object with methods for making API requests
 */
export function createApiClient(options: ApiClientConfig) {
    const baseUrl = options.baseUrl;
    const timeout = options.timeout || 60000; // Default 60s timeout
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
    };

    /**
     * Builds a full API URL by:
     * - Normalizing the path (ensuring leading slash)
     * - Expanding :pathParams placeholders
     * - Adding query string parameters
     *
     * Example:
     *   buildApiUrl('/user/:id', {id: '42'}, {filter: 'active'}) → /user/42?filter=active
     * @param path - API path
     * @param pathParams - Path parameters to replace in the URL
     * @param queryParams - Query parameters to add to the URL
     * @returns Formatted URL
     */
    function buildApiUrl(
        path: ApiRoutePath,
        pathParams?: PathParams,
        queryParams?: QueryParams,
    ): URL {
        // Ensure path starts with '/'
        let normalizedPath = path.startsWith('/') ? path : `/${path}`;

        // Build in path params
        if (pathParams) {
            Object.entries(pathParams).forEach(([key, value]) => {
                normalizedPath = normalizedPath.replace(`:${key}`, encodeURIComponent(value));
            });
        }

        const url = new URL(`${baseUrl}${normalizedPath}`);

        // Build in query params if provided
        if (queryParams) {
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, String(value));
                }
            });
        }


        return url;
    }


    /**
     * Core request method that handles all HTTP methods
     * @param method - HTTP method (GET, POST, PUT, DELETE)
     * @param path - API path
     * @param options - Request options (pathParams, queryParams, headers)
     * @param body - Request body
     * @returns Promise with the response wrapped in ApiResponse
     */
    async function request<T = any>(
        method: HttpMethod,
        path: ApiRoutePath,
        options: ApiRequestOptions,
        body?: any,
    ): Promise<ApiResponse<T>> {
        // Build url path with path and query params
        const url = buildApiUrl(path, options.pathParams, options.queryParams);

        // Merge default headers with request headers
        const headers: Record<string, string> = {
            ...defaultHeaders,
            ...(options.headers || {})
        };

        // Set up fetch config
        const fetchOptions: RequestInit = {
            method,
            headers,
            body: body ? JSON.stringify(convertToSnakeCase(body)) : undefined,
            // signal: (for abort/timeout, add if needed)
        };

        // Timeout logic (optional)
        let timeoutId: NodeJS.Timeout | undefined;
        const abortController = new AbortController();
        if (options.timeoutMs) {
            timeoutId = setTimeout(() => abortController.abort(), options.timeoutMs);
            fetchOptions.signal = abortController.signal;
        }

        // Send the request
        try {
            const response = await fetch(url.toString(), fetchOptions);
            return processResponse<T>(response);
        } catch (rawError) {
            let error: ApiError;

            if (rawError instanceof DOMException && rawError.name === 'AbortError') {
                // Request was cancelled by abort (timeout/user intervention)
                error = {
                    message: 'Request was cancelled',
                    status: 0,
                    statusText: 'Request Cancelled',
                    name: 'AbortError',
                };
            } else if (rawError instanceof Error) {
                // Other fetch/network error
                error = {
                    message: rawError.message,
                    status: 0,
                    statusText: 'Network Error',
                    name: rawError.name || 'NetworkError',
                };
            } else {
                // Unexpected, non-error thrown
                error = {
                    message: String(rawError) || 'Unknown error occured when making request.',
                    status: 0,
                    statusText: 'Unknown Error',
                    name: 'UnknownError',
                };
            }

            return {data: null, error};
        } finally {
            if (timeoutId) clearTimeout(timeoutId);
        }
    }


    /**
     * Process API response, handling errors consistently.
     * Converts snake_case keys to camelCase, produces ApiResponse<T>.
     * @param response - Fetch response
     * @returns Promise with the response wrapped in ApiResponse
     */
    async function processResponse<T>(response: Response): Promise<ApiResponse<T>> {
        // Handle API-level errors first
        if (!response.ok) {
            let errorMsg = response.statusText;
            try {
                // Try to parse text or JSON, but don't assume shape
                const text = await response.text();
                // Try to parse JSON if possible
                try {
                    const body = JSON.parse(text);
                    // message: (try known, or fallback to whole object)
                    if (typeof body === 'string') {
                        errorMsg = body;
                    } else if (body && typeof body === 'object') {
                        // Use a common field, else dump whole object for debugging
                        errorMsg = body.message || body.error || JSON.stringify(body);
                    }
                } catch {
                    // Not JSON, use as-is if non-empty
                    if (text.trim()) errorMsg = text;
                }
            } catch {
                /* ignore parsing errors, fall back to statusText */
            }

            return {
                data: null,
                error: {
                    message: errorMsg,
                    status: response.status,
                    statusText: response.statusText,
                    name: 'ApiError',
                }
            };
        }

        // For NO CONTENT
        if (response.status === 204) {
            return {data: {} as T, error: null};
        }

        // Parse JSON response
        try {
            const jsonResponse = await response.json();
            const processedResponse = convertToCamelCase(jsonResponse);
            return {data: processedResponse as T, error: null};
        } catch (error) {
            throw new Error(`Failed to parse JSON response: ${error instanceof Error ? error.message : String(error)}`);

        }
    }


    /**
     * Make a GET request
     * @param path - API path
     * @param options - Request options (pathParams, queryParams, headers)
     * @returns Promise with the response wrapped in ApiResponse
     */
    async function get<T>(path: ApiRoutePath, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
        return request<T>('GET', path, options);
    }

    /**
     * Make a POST request
     * @param path - API path
     * @param options - Request options (pathParams, queryParams, headers)
     * @param body - Request body
     * @returns Promise with the response wrapped in ApiResponse
     */
    async function post<T>(
        path: ApiRoutePath,
        body: unknown,
        options: ApiRequestOptions = {},
    ): Promise<ApiResponse<T>> {
        return request<T>('POST', path, options, body);
    }

    /**
     * Make a PUT request
     * @param path - API path
     * @param body - Request body
     * @param options - Request options (pathParams, queryParams, headers)
     * @returns Promise with the response wrapped in ApiResponse
     */
    async function put<T>(
        path: ApiRoutePath,
        body: unknown,
        options: ApiRequestOptions = {}
    ): Promise<ApiResponse<T>> {
        return request<T>('PUT', path, options, body);
    }

    /**
     * Make a DELETE request
     * @param path - API path
     * @param options - Request options (pathParams, queryParams, headers)
     * @returns Promise with the response wrapped in ApiResponse
     */
    async function del<T>(path: ApiRoutePath, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
        return request<T>('DELETE', path, options);
    }

    // Return the public API
    return {
        get,
        post,
        put,
        delete: del, // Renamed to avoid conflict with JavaScript keyword
    };
}