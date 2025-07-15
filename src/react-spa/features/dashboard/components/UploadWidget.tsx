import { Button } from '@/components';
import {
  ALLOWED_FILE_TYPES,
  ALLOWED_FILE_TYPES_STRING,
  MAX_FILE_SIZE_BYTES,
  MAX_FILES_SELECTED_FOR_UPLOAD,
} from '@/features/documents/constants/fileRules';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';

import { UserFile } from '@/api-client/types/documents.ts';
import { UserFilesTable } from 'src/features/dashboard/components/files-table';
import { logger } from 'src/shared/lib';
import { CloudArrowUpIcon, ShieldCheckIcon } from '@phosphor-icons/react';
import { User } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import { useDropzone, FileRejection } from 'react-dropzone';
import { toast } from 'sonner';

/* -------------------------------------------------------------------------- */
/*  Interfaces                                                                */

/* -------------------------------------------------------------------------- */

export interface UploadWidgetRef {
  /** Imperatively open the hidden native file-picker */
  triggerFilePicker: () => void;
}

interface FilesTableProps {
  documents: UserFile[];
  isError: boolean;
  isLoading: boolean;

  /** Click on “Upload” or empty-state link → decide login vs picker */
  onUploadAttempt: () => void;

  /** Files are ready after picker or drop (user already authed) */
  onFilesPicked: (files: File[]) => void;
  /** Allows conditional UI logic when the visitor is not logged in */
  user: User | null;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export const UploadWidget = forwardRef<UploadWidgetRef, FilesTableProps>(
  ({ documents, isLoading, isError, onUploadAttempt, onFilesPicked, user }, ref) => {
    const [isDragActive, setIsDragActive] = useState(false);

    // Convert to the format react-dropzone expects
    const acceptedFileTypes = useMemo(
      () =>
        Object.fromEntries(
          Object.entries(ALLOWED_FILE_TYPES).map(([mimeType, exts]) => [mimeType, exts])
        ),
      []
    );

    const onDrop = useCallback(
      (files: File[]) => {
        if (!user) {
          onUploadAttempt();
          setIsDragActive(false);
          return;
        }
        onFilesPicked(files);
        setIsDragActive(false);
      },
      [onFilesPicked, onUploadAttempt, user]
    );

    const onDropRejected = useCallback((rejections: FileRejection[]) => {
      let message: string;
      const codes = new Set(rejections.map(r => r.errors[0].code));
      if (codes.has('file-too-large')) {
        message = `File too large. Max file size is ${MAX_FILE_SIZE_BYTES / 1024 / 1024} MB`;
      } else if (codes.has('too-many-files')) {
        message = `Too many files. Max files is ${MAX_FILES_SELECTED_FOR_UPLOAD}`;
      } else if (codes.has('file-invalid-type')) {
        message = 'Only text files allowed: PDF, Word, PowerPoint, Excel, Markdown, TXT, JSON, CSV';
      } else {
        message = 'Upload rejected';
      }

      toast(message);
    }, []);

    const { getRootProps, getInputProps, open } = useDropzone({
      onDrop,
      onDropRejected,
      onDragEnter: () => setIsDragActive(true),
      onDragLeave: () => setIsDragActive(false),
      noClick: true, // disable click to open since we are wrapping the whole parent
      maxFiles: MAX_FILES_SELECTED_FOR_UPLOAD,
      maxSize: MAX_FILE_SIZE_BYTES,
      accept: acceptedFileTypes,
    });

    /* --------------------------- internal fns ---------------------- */
    const queryClient = useQueryClient();

    const onRefreshRequest = () => {
      logger.info('Refreshing files');
      queryClient.invalidateQueries({ queryKey: ['documents', user?.id] });
    };

    /* --------------------------- expose ref handle ------------------------ */
    useImperativeHandle(ref, () => ({
      triggerFilePicker: open,
    }));

    /* --------------------------- render ----------------------------------- */
    return (
      <div className="flex flex-col">
        <h3 className={'mb-2 text-start'}>Your files</h3>
        <p className={'text-start text-muted-foreground mb-6'}>Upload to chat with your data</p>

        {/* toolbar */}
        <div className="flex justify-end gap-2 mb-4">
          <Button onClick={onUploadAttempt} size={'sm'}>
            <CloudArrowUpIcon weight={'bold'} size={18} className="mr-2" />
            Upload
          </Button>
        </div>

        <div className="w-full min-h-64" {...getRootProps()}>
          {/* hidden native picker */}
          <input accept={ALLOWED_FILE_TYPES_STRING} {...getInputProps()} />

          <UserFilesTable
            documents={documents}
            isLoading={isLoading}
            isError={isError}
            onRefreshRequest={onRefreshRequest}
            onUploadAttempt={onUploadAttempt}
            isDragging={isDragActive}
          />
          <div
            className={
              'flex flex-row justify-center pt-4 gap-1 align-text-bottom align-center' +
              ' text-muted-foreground'
            }
          >
            <ShieldCheckIcon />
            <small className={'text-muted-foreground'}>
              Your data is securely handled in accordance with our{' '}
              <a href="/terms">Terms of Service </a>
            </small>
          </div>
        </div>
      </div>
    );
  }
);