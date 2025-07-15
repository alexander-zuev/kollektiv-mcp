import { RouteConfig } from './config';

/**
 * Check if a route requires authentication
 *
 * @param route Route configuration object
 * @returns Boolean indicating if route requires authentication
 */
export const isProtectedRoute = (route: RouteConfig): boolean => {
  return route.requiresAuth;
};

/**
 * Convert route arrays to a single object for easier access
 * This allows looking up routes by path
 *
 * @param routes Array of route configurations
 * @returns Object with paths as keys and route configs as values
 */
export const createRouteMap = (routes: RouteConfig[]): Record<string, RouteConfig> => {
  return Object.fromEntries(routes.map(route => [route.path, route]));
};

/**
 * Find a route configuration by path
 *
 * @param routes Array of route configurations
 * @param path Path to search for
 * @returns Route configuration or undefined if not found
 */
export const findRouteByPath = (routes: RouteConfig[], path: string): RouteConfig | undefined => {
  return routes.find(route => route.path === path);
};