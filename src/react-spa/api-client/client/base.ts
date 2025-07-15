/**
 * API Client
 * A clean, type-safe HTTP http-client for making API requests
 */

import type {ApiClientConfig} from '@/api-client/client/config';
import type {ApiRoutePath} from '@/api-client/routes';
import type {
    ApiRequestOptions,
    HttpMethod,
    PathParams,
    QueryParams,
} from '@/api-client/types/base';
import {ApiError, logApiError} from '@/api-client/types/base';
import {convertToCamelCase, convertToSnakeCase} from '@/api-client/utils/caseConverter';

import {logger} from '@/shared/lib/logger';

/**
 * Creates an API http-client with the specified configuration
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
        queryParams?: QueryParams
    ): URL {
        // Ensure path starts with '/'
        let normalizedPath = path.startsWith('/') ? path : `/${path}`;

        // Build in path params
        if (pathParams) {
            for (const [key, value] of Object.entries(pathParams)) {
                normalizedPath = normalizedPath.replace(`:${key}`, encodeURIComponent(value));
            }
        }

        const url = new URL(`${baseUrl}${normalizedPath}`);

        // Build in query params if provided
        if (queryParams) {
            for (const [key, value] of Object.entries(queryParams)) {
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, String(value));
                }
            }
        }

        return url;
    }

    /**
     * Handles and logs all types of API errors. Never returns, throws ApiError on error.
     *
     * @param response
     */
    async function handleErrorResponse(response: Response, url: URL): Promise<never> {
        const status = response.status;
        const statusText = response.statusText || String(status);

        const ct = (response.headers.get('content-type') || '').toLowerCase();
        const clen = response.headers.get('content-length');
        const bodyExpected = ![204, 205, 304].includes(status) && clen !== '0';

        let payload: unknown = null;
        let msg: string | undefined;

        // Error handling flow
        if (bodyExpected) {
            try {
                // First get the response as text to ensure text() is called
                const responseText = await response.text();

                if (ct.includes('json')) {
                    try {
                        // Try to parse as JSON
                        payload = JSON.parse(responseText);
                        const b: any = payload;
                        msg = b?.detail?.message ?? b?.detail ?? b?.message ?? b?.error?.message ?? b?.error;
                        if (typeof msg !== 'string') msg = undefined;
                    } catch {
                        // If JSON parsing fails, use the text
                        msg = responseText.trim();
                    }
                } else {
                    // treat any non-JSON as text
                    msg = responseText.trim();
                }
            } catch {
                /* ignore malformed body */
            }
        }
        // Handle Auth Errors first if the onAuthError handler provided
        if ((status === 401 || status === 403) && options.onAuthError) {
            const code = (
                payload as {
                    detail?: { details?: { code?: string } };
                }
            )?.detail?.details?.code;
            await options.onAuthError(status, code);
        }

        if (!msg) msg = statusText;
        logApiError('HTTP', url, status, msg);
        throw new ApiError(msg, status, statusText, 'HTTP', payload);
    }

    /**
     * Checks if the user has an internet connection
     * @param url The URL object for the request
     *
     * @throws ApiError if no internet connection is detected
     */
    function checkInternetConnection(url: URL): void {
        if (navigator.onLine === false) {
            logApiError('network', url, 0, 'No network connection');
            throw new ApiError(
                'No network connection - check your connection and try again.',
                0,
                'No network connection',
                'network'
            );
        }
    }

    /**
     * Handles errors raised by fetch API
     *
     * @param error The error object
     * @param url The URL object for the request
     *
     * @throws ApiError if the error is not handled
     */
    function handleFetchError(error: Error, url: URL): never {
        // Re-raise ApiError (it's already handled)
        if (error instanceof ApiError) {
            throw error;
        }

        // Handle AbortError
        if (error instanceof DOMException && error.name === 'AbortError') {
            logApiError('timeout', url, 0, error.message);
            throw new ApiError('Request timed out or was cancelled', 0, 'Request Cancelled', 'timeout');
        }

        // All other errors
        const msg = error instanceof Error ? error.message : String(error);
        logApiError('other', url, 0, msg);
        throw new ApiError(
            'Request failed - either the server could not respond or there was a network / CORS issue.',
            0,
            'Fetch failed',
            'other'
        );
    }

    /**
     * Parses and returns a response<T> if response.ok

     * @param response
     * @returns Promise<T>
     * @throws ApiError if response could not be parsed
     */
    async function parseResponse<T>(response: Response, url: URL): Promise<T> {
        // Handle NO CONTENT specifically
        if (response.status === 204) {
            return {} as T;
        }

        // Handle successful responses with JSON bodies
        try {
            const jsonResponse = await response.json();
            const processedResponse = convertToCamelCase(jsonResponse);
            return processedResponse as T;
        } catch (e) {
            logApiError('parse', url, response.status, String(e));
            throw new ApiError(
                'Received malformed response from server.',
                response.status,
                'JSON Parsing Error',
                'parse'
            );
        }
    }

    /**
     * Sends a request, processes the Response, and handles network/parsing errors.
     * Converts successful JSON responses to camelCase.
     * Throws specific ApiError instances for various failure conditions.
     *
     * @param url - The URL object for the request.
     * @param fetchOptions - The options for the fetch call.
     * @returns Promise resolving to the processed response data of type T.
     */
    async function getProcessedResponse<T>(url: URL, fetchOptions: RequestInit): Promise<T> {
        let response: Response;

        try {
            checkInternetConnection(url);
            logger.info('Sending request to:', url.toString());

            response = await fetch(url.toString(), fetchOptions);

            /* ---------- !response.ok branch ---------- */
            if (!response.ok) {
                await handleErrorResponse(response, url);
            }
            /* ---------- response.ok branch ---------- */
            return await parseResponse(response, url);
        } catch (error) {
            /* ---------- error branch ---------- */
            handleFetchError(error as Error, url);
        }
    }

    /**
     * Core request method that handles all HTTP methods
     * @param method - HTTP method (GET, POST, PUT, DELETE)
     * @param path - API path
     * @param requestOptions - Request options (pathParams, queryParams, headers)
     * @param body - Request body
     * @returns Promise with the response wrapped in ApiResponse
     */
    async function request<T = any>(
        method: HttpMethod,
        path: ApiRoutePath,
        requestOptions: ApiRequestOptions,
        body?: any
    ): Promise<T> {
        // Build url path with path and query params
        const url = buildApiUrl(path, requestOptions.pathParams, requestOptions.queryParams);

        // Merge default headers with request headers
        const headers: Record<string, string> = {
            ...defaultHeaders,
            ...(requestOptions.headers || {}),
        };

        const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
        if (isFormData) {
            // browser will add it's own boundary
            delete headers['Content-Type'];
        }

        // Set up fetch config
        const fetchOptions: RequestInit = {
            method,
            headers,
            body: isFormData
                ? (body as FormData)
                : body
                    ? JSON.stringify(convertToSnakeCase(body))
                    : undefined,
            // signal: (for abort/timeout, add if needed)
        };

        let timeoutId: NodeJS.Timeout | undefined;
        const abortController = new AbortController();
        // Use request-specific timeout OR the http-client's default timeout
        const effectiveTimeout = requestOptions.timeoutMs ?? timeout;

        // Only set up AbortController if there's a valid timeout value
        if (effectiveTimeout && effectiveTimeout > 0) {
            timeoutId = setTimeout(() => {
                logger.info(`[API Client] Request timed out after ${effectiveTimeout}ms. Aborting...`);
                abortController.abort();
            }, effectiveTimeout);
            fetchOptions.signal = abortController.signal;
        }

        // Get the response
        try {
            return await getProcessedResponse(url, fetchOptions);
        } finally {
            if (timeoutId) clearTimeout(timeoutId);
        }
    }

    /**
     * Make a GET request
     * @param path - API path
     * @param requestOptions - Request options (pathParams, queryParams, headers)
     * @returns Promise with the response wrapped in ApiResponse
     */
    async function get<T>(path: ApiRoutePath, requestOptions: ApiRequestOptions = {}): Promise<T> {
        return request<T>('GET', path, requestOptions);
    }

    /**
     * Make a POST request
     * @param path - API path
     * @param requestOptions - Request options (pathParams, queryParams, headers)
     * @param body - Request body
     * @returns Promise with the response wrapped in ApiResponse
     */
    async function post<T>(
        path: ApiRoutePath,
        body: unknown,
        requestOptions: ApiRequestOptions = {}
    ): Promise<T> {
        return request<T>('POST', path, requestOptions, body);
    }

    /**
     * Make a PUT request
     * @param path - API path
     * @param body - Request body
     * @param requestOptions - Request options (pathParams, queryParams, headers)
     * @returns Promise with the response wrapped in ApiResponse
     */
    async function put<T>(
        path: ApiRoutePath,
        body: unknown,
        requestOptions: ApiRequestOptions = {}
    ): Promise<T> {
        return request<T>('PUT', path, requestOptions, body);
    }

    /**
     * Make a DELETE request
     * @param path - API path
     * @param requestOptions - Request options (pathParams, queryParams, headers)
     * @returns Promise with the response wrapped in ApiResponse
     */
    async function del<T>(path: ApiRoutePath, requestOptions: ApiRequestOptions = {}): Promise<T> {
        return request<T>('DELETE', path, requestOptions);
    }

    // Return the public API
    return {
        get,
        post,
        put,
        delete: del, // Renamed to avoid conflict with JavaScript keyword
    };
}