export const ApiRoutes = {
	QUERY: "/query",
	RETRIEVE: "/retrieve",
	DOCUMENTS: "/documents",
} as const;

export type ApiRoutePath = (typeof ApiRoutes)[keyof typeof ApiRoutes];
