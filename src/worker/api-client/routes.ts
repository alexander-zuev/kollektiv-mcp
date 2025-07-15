export const ApiRoutes = {
	QUERY: "/query",
	RAG_SEARCH: "/rag-search",
	RETRIEVE: "/retrieve",
	DOCUMENTS: "/documents",
} as const;

export type ApiRoutePath = (typeof ApiRoutes)[keyof typeof ApiRoutes];
