import { useQuery } from '@tanstack/react-query';
import { api } from '@/api-client/client';
import { getApiEndpoint } from '@/api-client/routes.ts';
import type { ListDocsResponse } from '@/api-client/types/documents.ts';
import { logger } from '@/shared/lib/logger.ts';
import { getAuthHeader } from '@/api-client/utils';

interface useFileListProps {
  userId: string | undefined;
}

const fetchFileList = async () => {
  const endpoint = getApiEndpoint('LIST_DOCUMENTS');
  const response = await api.get<ListDocsResponse>(endpoint.path, {
    headers: { ...getAuthHeader() },
  });
  logger.debug(`Received ${response.length} documents from API`);
  return response;
};

export const useFileList = ({ userId }: useFileListProps) => {
  return useQuery({
    queryKey: ['documents', userId],
    queryFn: () => fetchFileList(),
    enabled: !!userId,
  });
};