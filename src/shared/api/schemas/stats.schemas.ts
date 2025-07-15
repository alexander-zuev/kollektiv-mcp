import { z } from 'zod'

export const UserStatsResponseSchema = z.object({
    queries: z.number().int().min(0).describe('Number of queries made by the user')
})

export type UserStatsResponse = z.infer<typeof UserStatsResponseSchema>