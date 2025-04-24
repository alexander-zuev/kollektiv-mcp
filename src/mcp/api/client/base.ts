/**
 * API Client
 * A clean, type-safe HTTP client for making API requests
 */

import type { ApiClientConfig } from "@/mcp/api/client/config";
import type { ApiRoutePath } from "@/mcp/api/routes";
import type { ApiRequestOptions, HttpMethod, PathParams, QueryParams } from "@/mcp/api/types/base";
import { ApiError } from "@/mcp/api/types/base";
import { convertToCamelCase, convertToSnakeCase } from "@/mcp/api/utils/caseConverter";

/**
 * Creates an API client with the specified configuration
 * @param options - Configuration options
 * @returns An object with methods for making API requests
 */
export function createApiClient(options: ApiClientConfig) {
	const baseUrl = options.baseUrl;
	const timeout = options.timeout || 60000; // Default 60s timeout
	const defaultHeaders = {
		"Content-Type": "application/json",
		Accept: "application/json",
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
		let normalizedPath = path.startsWith("/") ? path : `/${path}`;

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
	): Promise<T> {
		// Build url path with path and query params
		const url = buildApiUrl(path, options.pathParams, options.queryParams);

		// Merge default headers with request headers
		const headers: Record<string, string> = {
			...defaultHeaders,
			...(options.headers || {}),
		};

		// Set up fetch config
		const fetchOptions: RequestInit = {
			method,
			headers,
			body: body ? JSON.stringify(convertToSnakeCase(body)) : undefined,
			// signal: (for abort/timeout, add if needed)
		};

		let timeoutId: NodeJS.Timeout | undefined;
		const abortController = new AbortController();
		// Use request-specific timeout OR the client's default timeout
		const effectiveTimeout = options.timeoutMs ?? timeout;

		// Only set up AbortController if there's a valid timeout value
		if (effectiveTimeout && effectiveTimeout > 0) {
			timeoutId = setTimeout(() => {
				console.log(`[API Client] Request timed out after ${effectiveTimeout}ms. Aborting...`);
				abortController.abort();
			}, effectiveTimeout);
			fetchOptions.signal = abortController.signal;
		}

		// Get the response
		try {
			return getProcessedResponse(url, fetchOptions);
		} finally {
			if (timeoutId) clearTimeout(timeoutId);
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
			console.log("Sending request to:", url.toString());
			response = await fetch(url.toString(), fetchOptions);

			// --- Handle API Server Errors (Received a response, but it's not OK) ---
			if (!response.ok) {
				// This means we received an error response from the API server (e.g., 4xx, 5xx)
				let errorMsg = response.statusText;
				try {
					// Try to get more specific error details from the response body
					const text = await response.text();
					try {
						const body = JSON.parse(text);
						errorMsg =
							typeof body === "string"
								? body
								: body?.message || body?.error || JSON.stringify(body);
					} catch {
						// JSON parsing failed, maybe it's plain text?
						if (text.trim()) errorMsg = text;
					}
				} catch {
					// Ignore errors reading the body, fallback to statusText
				}
				// Throw a specific error indicating an API-level failure
				throw new ApiError(errorMsg, response.status, response.statusText);
			}

			// --- Handle Successful Responses ---

			// Handle NO CONTENT specifically
			if (response.status === 204) {
				return {} as T;
			}

			// Handle successful responses with JSON bodies
			try {
				const jsonResponse = await response.json();
				const processedResponse = convertToCamelCase(jsonResponse);
				return processedResponse as T;
			} catch (parseError) {
				// The server likely sent a non-JSON response despite a 2xx status (other than 204)
				// Or the JSON was malformed.
				throw new ApiError(
					`Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : String(parseError)}`,
					response.status, // Keep original status
					"JSON Parsing Error", // Custom status text
				);
			}
		} catch (error) {
			// If it's already an ApiError we threw, just re-throw it
			if (error instanceof ApiError) {
				throw error;
			}

			// Handle AbortError (likely from timeout)
			if (error instanceof DOMException && error.name === "AbortError") {
				throw new ApiError("Request timed out or was cancelled", 0, "Request Cancelled");
			}

			// Handle other generic fetch/network errors
			const message = error instanceof Error ? error.message : String(error);
			// Use status 0 for network-level errors where no HTTP status was received
			throw new ApiError(
				`Network or request setup error: ${message}`,
				0, // Or maybe check response?.status if available, but likely not for these errors
				"Network Error",
			);
		}
	}

	/**
	 * Make a GET request
	 * @param path - API path
	 * @param options - Request options (pathParams, queryParams, headers)
	 * @returns Promise with the response wrapped in ApiResponse
	 */
	async function get<T>(path: ApiRoutePath, options: ApiRequestOptions = {}): Promise<T> {
		return request<T>("GET", path, options);
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
	): Promise<T> {
		return request<T>("POST", path, options, body);
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
		options: ApiRequestOptions = {},
	): Promise<T> {
		return request<T>("PUT", path, options, body);
	}

	/**
	 * Make a DELETE request
	 * @param path - API path
	 * @param options - Request options (pathParams, queryParams, headers)
	 * @returns Promise with the response wrapped in ApiResponse
	 */
	async function del<T>(path: ApiRoutePath, options: ApiRequestOptions = {}): Promise<T> {
		return request<T>("DELETE", path, options);
	}

	// Return the public API
	return {
		get,
		post,
		put,
		delete: del, // Renamed to avoid conflict with JavaScript keyword
	};
}
