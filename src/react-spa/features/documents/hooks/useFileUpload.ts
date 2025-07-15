import { api } from '@/api-client/client';
import { ApiError } from '@/api-client/types';
import { UserFile } from '@/api-client/types/documents.ts';
import { makeFileKey } from '@/features/documents/utils/fileKeyUtils.ts';
import { logger } from '@/shared/lib';
import { useCallback, useState } from 'react';
import {
  MAX_FILES_SELECTED_FOR_UPLOAD,
  MAX_FILE_SIZE_BYTES,
  ALLOWED_FILE_TYPES,
} from 'src/features/documents/constants';
import { getAuthHeader } from '@/api-client/utils/authHeader.ts';

const UPLOAD_TIMEOUT_MS = 60_000; // 60 s

// TODO: move to ALLOWED_MIME
const ALLOWED_MIME = new Set<string>(Object.keys(ALLOWED_FILE_TYPES));

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */

/* -------------------------------------------------------------------------- */

export interface UseFileUploadOptions {
  /** Authenticated user id (omit when not logged in) */
  userId?: string;

  onUploadStart?: (file: File) => void;
  onUploadSuccess?: (doc: UserFile) => void;
  onUploadError?: (file: File, reason: string) => void;

  existingKeys?: Set<string>;
}

export interface UseFileUploadReturn {
  /** Upload one or more files and resolve with successfully created docs */
  uploadFiles: (raw: FileList | File[]) => Promise<UserFile[]>;
  /** Number of requests currently in flight */
  inFlight: number;
}

/* -------------------------------------------------------------------------- */
/*  Hook                                                                      */
/* -------------------------------------------------------------------------- */

export const useFileUpload = ({
  userId,
  onUploadStart,
  onUploadSuccess,
  onUploadError,
  existingKeys,
}: UseFileUploadOptions): UseFileUploadReturn => {
  const [inFlight, setInFlight] = useState(0);

  /* --------------------------- helpers ----------------------------------- */

  const validate = useCallback(
    (file: File): string | null => {
      if (existingKeys?.has(makeFileKey(file))) {
        return `File ${file.name} is already uploaded. Change the name and or upload a different file.`;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return 'File exceeds 10 MB, please compress it and try again.';
      }
      if (!ALLOWED_MIME.has(file.type)) {
        return 'Allowed: PDF, Word, PowerPoint, Excel, Markdown, TXT, JSON, CSV';
      }
      return null;
    },
    [existingKeys]
  );

  /* ----------------及ひmain fn ----------------------------------- */

  const uploadFiles = useCallback(
    async (raw: FileList | File[]): Promise<UserFile[]> => {
      if (!userId) {
        logger.warn('Upload aborted: no userId');
        throw new Error('Please log in before uploading files.');
      }

      const files = Array.from(raw);
      logger.info(`Uploading ${files.length} file(s)…`, files);

      /* -- hard cap ------------------------------------------------------- */
      if (files.length > MAX_FILES_SELECTED_FOR_UPLOAD) {
        logger.warn('Upload aborted: exceeded MAX_FILES_SELECTED_FOR_UPLOAD');
        throw new Error(`You can upload up to ${MAX_FILES_SELECTED_FOR_UPLOAD} files at once.`);
      }

      const successful: UserFile[] = [];

      await Promise.all(
        files.map(async file => {
          // Client-side validation
          const err = validate(file);
          if (err) {
            logger.warn('Validation failed for file:', file.name, err);
            onUploadError?.(file, err);
            return;
          }

          onUploadStart?.(file);
          logger.debug('Starting upload:', file.name);

          const formData = new FormData();
          formData.append('file', file);

          setInFlight(c => c + 1);

          try {
            const res = await api.post<UserFile>('/documents', formData, {
              headers: { ...getAuthHeader() },
              timeoutMs: UPLOAD_TIMEOUT_MS,
            });
            successful.push(res);
            logger.info('Upload succeeded:', file.name, res);
            onUploadSuccess?.(res);
          } catch (e) {
            const reason =
              e instanceof ApiError
                ? e.message
                : `An error occurred when uploading ${file.name}. Try again later.`;

            logger.warn('Upload failed:', file.name);
            onUploadError?.(file, reason);
          } finally {
            setInFlight(c => c - 1);
          }
        })
      );

      logger.info(`Finished batch: ${successful.length}/${files.length} succeeded`);
      return successful;
    },
    [userId, onUploadError, onUploadStart, onUploadSuccess, validate]
  );

  return { uploadFiles, inFlight };
};