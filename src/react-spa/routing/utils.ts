import { RouteConfig } from './config';

/**
 * Utility functions for working with React Router routes
 */


/**
 * Get breadcrumb items from the current path
 * 
 * @param path Current path
 * @param routes Array of route configurations
 * @returns Array of breadcrumb items with label and path
 */
export const getBreadcrumbs = (path: string, routes: RouteConfig[]) => {
  const segments = path.split('/').filter(Boolean);
  
  return segments.map((segment, index) => {
    const currentPath = `/${segments.slice(0, index + 1).join('/')}`;
    const route = routes.find(r => r.path === currentPath);
    
    return {
      label: route?.title || segment,
      path: currentPath
    };
  });
};
