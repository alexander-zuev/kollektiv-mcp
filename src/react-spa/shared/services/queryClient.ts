import { QueryClient, QueryClientConfig } from '@tanstack/react-query';
import { ApiError } from '@/api-client/types/base.ts';

const retryPolicy = (failureCount: number, error: Error) => {
  const apiErr = error as ApiError;

  // Network errors
  if (!apiErr.status && (apiErr.kind === 'network' || apiErr.kind === 'timeout'))
    return failureCount < 3;
  // Server errors
  if (apiErr.status >= 500 && apiErr.status < 600) return failureCount < 3;
  // Client error
  return false;
};

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 15, // 15 minutes
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: retryPolicy,
      retryDelay: attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    },
    mutations: {
      /**
       * retry: How many times React Query should retry a failed mutation.
       * Recommendation: 0 (default). Mutations often have side effects, so
       * automatic retries can be dangerous (e.g., creating duplicate resources).
       * Handle mutation retries manually if needed.
       */
      retry: 0,
    },
  },
};

export const queryClient = new QueryClient(queryClientConfig);