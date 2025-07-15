import { UserFile } from '@/api-client/types/documents.ts';
import { useAuthStore } from '@/features/auth';
import { LoginModal } from '@/features/auth/components/LoginModal.tsx';
import {
  UploadWidget,
  UserFlowStepper,
  type UploadWidgetRef,
} from '@/features/dashboard/components/index.ts';
import { useFileList, useFileUpload } from '@/features/documents';
import { makeFileKey } from '@/features/documents/utils/fileKeyUtils.ts';
import { toast } from 'sonner';
import { logger } from '@/shared/lib';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

export const DashboardContainer = () => {
  const user = useAuthStore(useShallow(s => s.user));
  const queryClient = useQueryClient();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const {
    data: serverDocs = [],
    isLoading,
    error,
    isError,
  } = useFileList({
    userId: user?.id,
  });

  /* --------------------------- optimistic rows -------------------------- */
  const [optimisticDocs, setOptimisticDocs] = useState<UserFile[]>([]);

  /* --------------------------- upload callbacks ------------------------- */
  const onUploadStart = (file: File) =>
    setOptimisticDocs(prev => [
      ...prev,
      {
        id: `temp-${crypto.randomUUID()}`,
        filename: file.name,
        filesize: file.size,
        status: 'processing',
        uploadedAt: new Date().toISOString(),
      },
    ]);

  const onUploadSuccess = (doc: UserFile) => {
    queryClient.invalidateQueries({ queryKey: ['documents', user?.id] });
  };

  const onUploadError = (file: File, reason: string) => {
    setOptimisticDocs(prev => prev.filter(p => makeFileKey(p) !== makeFileKey(file)));

    // show a toast for this specific file failure
    toast.error(`Error uploading file: ${reason}`);
  };

  const existingKeys = useMemo(
    () => new Set([...serverDocs, ...optimisticDocs].map(makeFileKey)),
    [serverDocs, optimisticDocs]
  );

  useEffect(() => {
    const serverKeys = new Set(serverDocs.map(makeFileKey));

    setOptimisticDocs(prev => prev.filter(p => !serverKeys.has(makeFileKey(p))));
  }, [serverDocs]);

  /* --------------------------- hook instance ---------------------------- */
  const { uploadFiles } = useFileUpload({
    userId: user?.id,
    onUploadStart,
    onUploadSuccess,
    onUploadError,
    existingKeys,
  });

  // Create a ref for UploadWidget to call its trigger method
  const filesTableRef = useRef<UploadWidgetRef>(null);

  // This handler receives the actual files once selected
  const handleFilesPicked = async (files: File[]) => {
    if (!files?.length) return;
    logger.info('Files selected, ready for upload:', files);
    try {
      const docs = await uploadFiles(files);
      logger.info(`${docs.length} document(s) created`, docs);
    } catch (e: any) {
      // Batch-level errors (auth missing, hard limit, etc.)
      const message = e?.message ?? 'Unknown error';
      toast.error(message);
    }
  };
  /* --------------------------- merged list for UI ----------------------- */
  const documents = React.useMemo(() => {
    // const ids = new Set(optimisticDocs.map(d => d.id));
    const ids = new Set(serverDocs.map(d => d.id));

    return [...serverDocs, ...optimisticDocs.filter(d => !ids.has(d.id))];
    // return [...optimisticDocs, ...serverDocs.filter(d => !ids.has(d.id))];
  }, [optimisticDocs, serverDocs]);

  // Handles upload click or file drop
  const handleUploadAttempt = () => {
    if (user) {
      logger.debug('User authenticated - showing upload window');
      filesTableRef.current?.triggerFilePicker();
    } else {
      logger.debug('User not authenticated - redirecting to login');

      setIsLoginModalOpen(true);
    }
  };

  if (error) {
    logger.error('Error occurred when loading file list:', error);
  }

  const documentsUploadedFlag = useMemo(() => documents.length > 0, [documents]);

  return (
    <>
      <div className={'flex h-full flex-col items-center justify-center space-y-12'}>
        <UserFlowStepper userId={user?.id} documentsUploaded={documentsUploadedFlag} />
        <UploadWidget
          ref={filesTableRef}
          documents={documents ?? []}
          isLoading={isLoading}
          isError={isError}
          onUploadAttempt={handleUploadAttempt}
          onFilesPicked={handleFilesPicked}
          user={user}
        />
      </div>
      <LoginModal open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
    </>
  );
};