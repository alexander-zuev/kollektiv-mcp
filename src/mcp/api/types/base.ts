// HTTP verb/type restriction
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

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

/**
 * API Error structure
 * Provides a consistent format for API errors
 */
export interface ApiError {
	message: string;
	status: number;
	statusText: string;
	name: string; // Error name for categorization and analysis
	code?: string; // Optional: Some APIs provide specific error codes
}

/**
 * Standard API response wrapper
 * Provides a consistent format for all API responses
 */
export type ApiResponse<T> =
	| {
			data: T;
			error: null;
	  }
	| {
			data: null;
			error: ApiError;
	  };
