import type {UserFile} from '@shared/api/schemas/files.schemas';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {api} from '@/api-client/http-client';
import {getApiRoute} from '@shared/api/app-routes';

interface useFilesDeleteOpts {
    userId: string | undefined;
    documentId: string;
}

function deleteFile(userId: string, documentId: string): Promise<void> {
    return api.delete<void>(getApiRoute('files_by_id'), {
        pathParams: {
            id: documentId,
        },
    });
}

export const useFileDelete = ({userId, documentId}: useFilesDeleteOpts) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            if (!userId) throw new Error('User not authenticated');
            return await deleteFile(userId, documentId);
        },
        onMutate: async () => {
            if (!userId) return;
            // cancel queries in progress for documents
            await queryClient.cancelQueries({queryKey: ['documents', userId]});
            // manually delete the doc from the query cache if it exists there
            const previousDocuments = queryClient.getQueryData<UserFile[]>(['documents', userId]) || [];
            const updatedDocuments = previousDocuments.filter(doc => doc.id !== documentId);

            queryClient.setQueryData(['documents', userId], updatedDocuments);

            return {previousDocuments};
        },
        onSuccess: () => {
            if (!userId) return;
            queryClient.invalidateQueries({queryKey: ['documents', userId]});
        },
        onError: (_err, _, context) => {
            if (!userId) return;

            queryClient.setQueryData(['documents', userId], context?.previousDocuments);
            queryClient.invalidateQueries({queryKey: ['documents', userId]});
        },
    });
};