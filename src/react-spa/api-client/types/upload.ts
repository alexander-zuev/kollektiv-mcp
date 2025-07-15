import { z } from 'zod';

/**
 * Request body schema for the Query tool/endpoint.
 */
export const UploadDocumentRequestSchema = z.object({});

/**
 * Response data schema for the Query tool/endpoint.
 */
export const UploadDocumentResponseSchema = z.object({});

export type UploadDocRequest = z.infer<typeof UploadDocumentRequestSchema>;
export type UploadDocResponse = z.infer<typeof UploadDocumentResponseSchema>;