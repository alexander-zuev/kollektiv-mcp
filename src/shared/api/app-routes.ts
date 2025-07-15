/**
 * App Routes Configuration
 *
 * Centralized definition of all application routes with proper typing.
 * Used by worker, frontend, and API clients for consistency.
 */

export const APP_ROUTES = {
    auth: {
        prefix: '/auth',
        paths: {
            authorize: '/authorize',
            callback: '/callback',
            login: '/login',
            logout: '/logout',
        }
    },
    api: {
        prefix: '/api/v1',
        paths: {
            files: '/files',
            files_by_id: '/files/:id',
            retrieve: '/retrieve',
            stats: '/stats',
            support: '/support',
        }
    },
    mcp: {
        prefix: '',
        paths: {
            mcp: '/mcp',
            sse: '/sse', // @deprecated use /mcp instead
        }
    }
} as const;

// Helper functions for route construction
export function getAuthRoute(path: keyof typeof APP_ROUTES.auth.paths): string {
    return `${APP_ROUTES.auth.prefix}${APP_ROUTES.auth.paths[path]}`;
}

export function getApiRoute(path: keyof typeof APP_ROUTES.api.paths): FullApiRoutePath {
    return `${APP_ROUTES.api.prefix}${APP_ROUTES.api.paths[path]}` as FullApiRoutePath;
}

export function getMcpRoute(path: keyof typeof APP_ROUTES.mcp.paths): string {
    return `${APP_ROUTES.mcp.prefix}${APP_ROUTES.mcp.paths[path]}`;
}

// Type definitions
export type AuthRoutePath = keyof typeof APP_ROUTES.auth.paths;
export type ApiRoutePath = keyof typeof APP_ROUTES.api.paths;
export type McpRoutePath = keyof typeof APP_ROUTES.mcp.paths;
export type FullApiRoutePath = `${typeof APP_ROUTES.api.prefix}${typeof APP_ROUTES.api.paths[ApiRoutePath]}`;