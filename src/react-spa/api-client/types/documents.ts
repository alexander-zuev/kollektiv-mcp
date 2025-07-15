import { z } from 'zod';

/**
 * Single document schema
 */
export const FileSchema = z.object({
  id: z.string().uuid(),
  filename: z.string(),
  filesize: z.number().int().positive(),
  status: z.enum(['processing', 'available', 'failed', 'deleted']),
  uploadedAt: z.string().datetime(),
});

/**
 * Response data schema for the Query tool/endpoint.
 */
export const ListUserFilesSchema = z.array(FileSchema);

/**
 * Request payload for POST /documents
 * (sent as multipart/form-data, validated only on the front-end)
 */

export const UploadDocumentRequestSchema = z.object({
  file: z.instanceof(File), // browser File object
});

export const UploadDocumentResponseSchema = FileSchema;
export type UploadDocumentRequest = z.infer<typeof UploadDocumentRequestSchema>;
export type UserFile = z.infer<typeof FileSchema>;
export type ListDocsResponse = z.infer<typeof ListUserFilesSchema>;