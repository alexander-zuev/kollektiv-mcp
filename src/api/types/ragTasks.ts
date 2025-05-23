import { z } from "zod";

/**
 * Request body schema for the Query tool/endpoint.
 */
export const RagRequestSchema = z.object({
	ragQuery: z.string().min(1).describe("RAG search to execute"),
	context: z.string().min(1).describe("Context used by the RAG tool"),
});

export const DocumentChunkSchema = z.object({
	documentFilename: z.string().min(1),
	title: z.string().nullable().optional(),
	section: z.number().nullable().optional(),
	text: z.string().min(1),
	relevanceScore: z.number(),
});
export type DocumentChunk = z.infer<typeof DocumentChunkSchema>;

/**
 * Response data schema for the Query tool/endpoint.
 */
export const RagResponseSchema = z.object({
	response: z.array(DocumentChunkSchema),
	metadata: z.record(z.any()).nullable(),
});

export type RagSearchRequest = z.infer<typeof RagRequestSchema>;
export type RagSearchResponse = z.infer<typeof RagResponseSchema>;
