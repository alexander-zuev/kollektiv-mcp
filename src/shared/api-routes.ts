/**
 * API Routes Configuration
 *
 * Centralized definition of all API routes with proper typing.
 * Used by both frontend and worker for consistency.
 */

const API_BASE = '/api';
const API_VERSION = 'v1';

export const API_ROUTES = {
  // Base path
  BASE_PATH: `${API_BASE}/${API_VERSION}`,

  // Tracking routes
  TRACKING_PREVIEW: `/tracking/preview`,
  TRACKING_JOBS: `/tracking/jobs`,
  TRACKING_JOBS_BY_ID: `/tracking/jobs/:id`,

  // Stats routes
  STATS: `/stats`,

  // Testing routes
  FIRECRAWL: `/firecrawl`,
  BROWSER_RENDER: `/browser-render`,

  // Support
  SUPPORT: `/support`,

  // AI Services
  AI_URL_EXTRACT: `/ai/url-extract`,
} as const;

export type ApiRoutePath = (typeof API_ROUTES)[keyof typeof API_ROUTES];

// New type for frontend API client (full paths with prefix)
export type FullApiRoutePath = `${typeof API_ROUTES.BASE_PATH}${ApiRoutePath}`;

export function getApiRouteWithPrefix(path: ApiRoutePath): FullApiRoutePath {
  return `${API_ROUTES.BASE_PATH}${path}` as FullApiRoutePath;
}