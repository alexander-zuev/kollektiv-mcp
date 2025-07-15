/**
 * Application metadata configuration
 * This file contains all SEO and metadata settings for the application
 */
import { routes } from '@/routing/config';
import { logger } from '@/shared/lib/logger';

// Define the required metadata structure with strict typing
export interface PageMetadata {
  // Required fields
  title: string;
  description: string;

  // Optional fields
  ogImage?: string;
  keywords?: string[];
  noindex?: boolean;
}

// Type for the metadata configuration object
export type MetadataConfig = Record<string, PageMetadata>;

// Application metadata configuration
// Each page must have all required fields defined
export const metadata: MetadataConfig = {
  // Home page
  '/': {
    title: 'Query | Manage your database with natural language',
    description:
      'Query is an MCP server that enables AI tools to safely interact with Supabase. Control database access, manage users, and execute SQL with built-in safety mechanisms.',
    ogImage: 'https://thequery.dev/social-card.png',
    keywords: ['supabase', 'mcp', 'server', 'management', 'database', 'natural language'],
  },

  // Privacy page
  '/privacy': {
    title: 'Query MCP | Privacy Policy',
    description: 'Our privacy policy and how we protect your data',
    keywords: ['privacy', 'policy', 'terms', 'query mcp'],
  },

  // Terms page
  '/terms': {
    title: 'Query MCP | Terms of Service',
    description: 'Our terms of service and usage conditions',
    keywords: ['terms', 'service', 'conditions', 'query mcp'],
  },

  // Auth pages
  '/login': {
    title: 'Query MCP | Login',
    description: 'Log in to your Query MCP account',
    noindex: true,
  },

  '/signup': {
    title: 'Query MCP | Sign Up',
    description: 'Create a new Query MCP account',
    noindex: true,
  },

  // App pages
  '/app': {
    title: 'Query MCP | Dashboard',
    description: 'Your Query MCP dashboard',
    noindex: true,
  },

  '/app/api-keys': {
    title: 'Query MCP | API Keys',
    description: 'Manage your API keys',
    noindex: true,
  },

  '/app/plans': {
    title: 'Query MCP | Plans',
    description: 'Manage your subscription plans',
    noindex: true,
  },

  // 404 page
  '404': {
    title: 'Query MCP | Page Not Found',
    description: 'The page you are looking for does not exist',
    noindex: true,
  },
};

/**
 * Get metadata for a specific path
 * Throws an error if metadata is not found
 */
export function getMetadata(path: string): PageMetadata {
  // Try to get exact path match
  const pageMetadata = metadata[path];

  // If not found, try to match with 404
  if (!pageMetadata) {
    if (path === '*' || path === '404') {
      logger.error(`Metadata not defined for path: ${path}`);
      throw new Error(`Metadata not defined for path: ${path}`);
    }

    logger.warn(`Using fallback 404 metadata for path: ${path}`);
    return (
      metadata['404'] || {
        title: 'Query MCP | Page Not Found',
        description: 'The page you are looking for does not exist',
        noindex: true,
      }
    );
  }

  return pageMetadata;
}

/**
 * Create custom metadata by extending the base metadata
 */
export function createCustomMetadata(
  basePath: string,
  overrides: Partial<PageMetadata>
): PageMetadata {
  const base = getMetadata(basePath);
  logger.debug(`Creating custom metadata for path: ${basePath}`, { overrides });
  return { ...base, ...overrides };
}

/**
 * Validate that all routes have corresponding metadata
 * This function runs in development to ensure metadata completeness
 */
export function validateRouteMetadata(): void {
  if (process.env.NODE_ENV !== 'production') {
    const missingMetadataPaths: string[] = [];

    // Check each route for metadata
    routes.forEach(route => {
      const path = route.path;
      // Skip wildcard routes as they use the 404 metadata
      if (path !== '*' && !metadata[path]) {
        missingMetadataPaths.push(path);
      }
    });

    if (missingMetadataPaths.length > 0) {
      logger.error('Missing metadata for the following routes:');
      missingMetadataPaths.forEach(path => {
        logger.error(`  - ${path}`);
      });
      logger.error('Please add metadata entries for these routes in src/config/metadata.ts');

      // In development, we want to make this very visible
      if (process.env.NODE_ENV === 'development') {
        throw new Error(
          `Missing metadata for ${missingMetadataPaths.length} routes. Check the console for details.`
        );
      }
    } else {
      logger.info('All routes have metadata defined');
    }
  }
}