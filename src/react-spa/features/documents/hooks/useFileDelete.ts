import { api } from '@/api-client/client';
import { ApiEndpoints } from '@/api-client/routes.ts';
import { UserFile } from '@/api-client/types/documents.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAuthHeader } from '@/api-client/utils';

interface useFilesDeleteOpts {
  userId: string | undefined;
  documentId: string;
}

function deleteFile(userId: string, documentId: string): Promise<void> {
  return api.delete<void>(ApiEndpoints.DELETE_DOCUMENT.path, {
    headers: { ...getAuthHeader() },
    pathParams: {
      documentId: documentId,
    },
  });
}

export const useFileDelete = ({ userId, documentId }: useFilesDeleteOpts) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error('User not authenticated');
      return await deleteFile(userId, documentId);
    },
    onMutate: async () => {
      if (!userId) return;
      // cancel queries in progress for documents
      await queryClient.cancelQueries({ queryKey: ['documents', userId] });
      // manually delete the doc from the query cache if it exists there
      const previousDocuments = queryClient.getQueryData<UserFile[]>(['documents', userId]) || [];
      const updatedDocuments = previousDocuments.filter(doc => doc.id !== documentId);

      queryClient.setQueryData(['documents', userId], updatedDocuments);

      return { previousDocuments };
    },
    onSuccess: () => {
      if (!userId) return;
      queryClient.invalidateQueries({ queryKey: ['documents', userId] });
    },
    onError: (_err, _, context) => {
      if (!userId) return;

      queryClient.setQueryData(['documents', userId], context?.previousDocuments);
      queryClient.invalidateQueries({ queryKey: ['documents', userId] });
    },
  });
};