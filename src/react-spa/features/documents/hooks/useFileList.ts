import {getApiRoute} from '@shared/api/app-routes';
import type {ListDocsResponse} from '@shared/api/schemas/files.schemas';
import {useQuery} from '@tanstack/react-query';
import {api} from '@/api-client/http-client';
import {logger} from '@/shared/lib/logger.ts';

interface useFileListProps {
    userId: string | undefined;
}

const fetchFileList = async () => {
    const response = await api.get<ListDocsResponse>(getApiRoute('files'));
    logger.debug(`Received ${response.length} documents from API`);
    return response;
};

export const useFileList = ({userId}: useFileListProps) => {
    return useQuery({
        queryKey: ['documents', userId],
        queryFn: () => fetchFileList(),
        enabled: !!userId,
    });
};