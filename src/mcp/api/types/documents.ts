import { z } from "zod";

/**
 * Request body schema for the list-documents tool.
 * (Currently empty.)
 */

/**
 * Single document schema
 */
export const FileSchema = z.object({
	id: z.string().uuid(),
	filename: z.string(),
	filesize: z.number().int().positive(),
	status: z.enum(["processing", "available", "failed", "deleted"]),
	uploadedAt: z.string().datetime(),
});

/**
 * Response data schema for GET /documents
 */
export const ListUserFilesSchema = z.array(FileSchema);

export type UserFile = z.infer<typeof FileSchema>;
export type ListDocsResponse = z.infer<typeof ListUserFilesSchema>;
