// HTTP verb/type restriction
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// Used for filling path templates like "/user/:id"
export type PathParams = Record<string, string | number>;
export type QueryParams = Record<string, string | number | boolean | undefined>;

// Request config options for each call
export interface ApiRequestOptions {
	pathParams?: PathParams;
	queryParams?: QueryParams;
	headers?: Record<string, string | undefined>;
	timeoutMs?: number;
}

export class ApiError extends Error {
	constructor(
		public message: string,
		public status: number,
		public statusText: string,
		/** Parsed JSON body when Content-Type is application/json, otherwise undefined */
		public payload?: unknown,
	) {
		super(message);
		this.name = "ApiError";
	}
}
