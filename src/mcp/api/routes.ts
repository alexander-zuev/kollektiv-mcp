export const ApiRoutes = {
    QUERY: "/query",
    RETRIEVE: "/retrieve",
} as const;

export type ApiRoutePath = typeof ApiRoutes[keyof typeof ApiRoutes];