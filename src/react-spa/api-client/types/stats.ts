import { z } from 'zod';

/**
 * User stats response (no request)
 */

export const UserStatsResponseSchema = z.object({
  queries: z.number().int().positive(),
});

export type UserStatsResponse = z.infer<typeof UserStatsResponseSchema>;