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

export class ApiError extends Error {
	constructor(
		message: string,
		public status: number,
		public statusText: string,
	) {
		super(message);
		this.name = "ApiError";
	}
}
