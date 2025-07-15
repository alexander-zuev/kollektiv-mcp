/**
 * API Routes Configuration
 *
 * This file serves as the single source of truth for all API routes in the application.
 * It provides a centralized configuration for routes, including:
 * - Path definitions
 * - HTTP methods
 * - Response types
 * - Path parameters
 * - Query parameters
 */
import { HttpMethod } from '@/api-client/types';
import type { ListDocsResponse, UserFile } from './types/documents';
import { UserStatsResponse } from '@/api-client/types/stats.ts';

/**
 * API Endpoint Configuration
 *
 * Defines the structure of an API endpoint, including:
 * - path: The URL path for the endpoint
 * - method: The HTTP method for the endpoint
 * - response: The expected response type
 * - pathParams: The path parameters for the endpoint (if any)
 * - queryParams: The query parameters for the endpoint (if any)
 */
export interface ApiEndpointConfig<
  TResponse = any,
  TPathParams extends Record<string, string | number> = {},
  TQueryParams extends Record<string, string | number | boolean | undefined> = {},
> {
  path: string;
  method: HttpMethod;
  response: TResponse;
  pathParams?: TPathParams;
  queryParams?: TQueryParams;
}

/**
 * API Endpoints
 *
 * Defines all API endpoints in the application.
 * Each endpoint is defined with its path, method, response type, and parameters.
 */
export const ApiEndpoints = {
  // Document endpoints
  LIST_DOCUMENTS: {
    path: '/documents',
    method: 'GET',
    response: {} as ListDocsResponse,
  },
  GET_DOCUMENT: {
    path: '/documents/:documentId',
    method: 'GET',
    response: {} as UserFile,
    pathParams: {} as { documentId: string },
  },
  DELETE_DOCUMENT: {
    path: '/documents/:documentId',
    method: 'DELETE',
    response: undefined as void,
    pathParams: {} as { documentId: string },
  },
  USER_STATS: {
    path: '/stats',
    method: 'GET',
    response: {} as UserStatsResponse,
  },
} as const;

/**
 * Legacy API Routes
 *
 * Maintained for backward compatibility.
 * New code should use ApiEndpoints instead.
 */
export const ApiRoutes = {
  DOCUMENTS: ApiEndpoints.LIST_DOCUMENTS.path,
  DOCUMENT: ApiEndpoints.GET_DOCUMENT.path,
  USER_STATS: ApiEndpoints.USER_STATS.path,
} as const;

/**
 * API Route Path Type
 *
 * Type for API route paths.
 */
export type ApiRoutePath = (typeof ApiRoutes)[keyof typeof ApiRoutes];

/**
 * API Endpoint Type
 *
 * Type for API endpoints.
 */
export type ApiEndpoint = keyof typeof ApiEndpoints;

/**
 * Get API Endpoint
 *
 * Helper function to get an API endpoint configuration.
 *
 * @param endpoint - The API endpoint to get
 * @returns The API endpoint configuration
 *
 * @example
 * const endpoint = getApiEndpoint('LIST_DOCUMENTS');
 * api.get<typeof endpoint.response>(endpoint.path);
 */
export function getApiEndpoint<T extends ApiEndpoint>(endpoint: T): (typeof ApiEndpoints)[T] {
  return ApiEndpoints[endpoint];
}