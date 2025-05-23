import {z} from "zod";

/**
 * Request body schema for the Query tool/endpoint.
 */
export const QueryRequestSchema = z.object({
    query: z.string().min(1, "Query must be at least 1 character long"),
});

/**
 * Response data schema for the Query tool/endpoint.
 */
export const QueryResponseSchema = z.object({
    response: z.string(),
    metadata: z.record(z.any()).nullable(),
});

export type QueryRequest = z.infer<typeof QueryRequestSchema>;
export type QueryResponse = z.infer<typeof QueryResponseSchema>;