import { useQuery } from '@tanstack/react-query';
import { api } from '@/api-client/client';
import { getApiEndpoint } from '@/api-client/routes';
import { logger } from '@/shared/lib/logger';
import { UserStatsResponse } from '@/api-client/types/stats.ts';
import { getAuthHeader } from '@/api-client/utils';

interface useUserStats {
  userId: string | undefined;
  documentsUploaded: boolean;
}

const fetchUserStats = async () => {
  const endpoint = getApiEndpoint('USER_STATS');
  const response = await api.get<UserStatsResponse>(endpoint.path, {
    headers: { ...getAuthHeader() },
  });
  logger.debug(`Received user stats from API: ${JSON.stringify(response)}`);
  return response;
};

export const useUserStats = ({ userId, documentsUploaded }: useUserStats) => {
  return useQuery({
    queryKey: [userId],
    queryFn: () => fetchUserStats(),
    enabled: !!userId && documentsUploaded,
  });
};