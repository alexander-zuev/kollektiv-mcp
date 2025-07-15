import {getApiRoute} from '@shared/api/app-routes';
import type {UserStatsResponse} from '@shared/api/schemas/stats.schemas';
import {useQuery} from '@tanstack/react-query';
import {api} from '@/api-client/http-client';
import {logger} from '@/shared/lib/logger';

interface useUserStats {
    userId: string | undefined;
    documentsUploaded: boolean;
}

const fetchUserStats = async () => {
    const response = await api.get<UserStatsResponse>(getApiRoute('stats'));
    logger.debug(`Received user stats from API: ${JSON.stringify(response)}`);
    return response;
};

export const useUserStats = ({userId, documentsUploaded}: useUserStats) => {
    return useQuery({
        queryKey: [userId],
        queryFn: () => fetchUserStats(),
        enabled: !!userId && documentsUploaded,
    });
};