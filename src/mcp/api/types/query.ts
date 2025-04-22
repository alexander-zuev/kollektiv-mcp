/**
 * Request body schema for the Query tool/endpoint.
 */
export interface QueryToolRequest {
	query: string;
}

/**
 * Response data schema for the Query tool/endpoint.
 */
export interface QueryToolResponse {
	success: boolean;
	response: string | null;
	metadata: Record<string, any> | null;
}
