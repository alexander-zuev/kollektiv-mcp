import { z } from 'zod/v4';
import { currencyCodes, UrlSchema } from '@shared/domain-schemas.ts';

// Request

export const TrackingPreviewRequestSchema = z.object({
  url: UrlSchema,
});
export type TrackingPreviewRequest = z.infer<typeof TrackingPreviewRequestSchema>;

// Response
export const TrackingPreviewResponseSchema = z.object({
  normalizedUrl: UrlSchema,
  productSnapshot: z.object({
    id: z.uuidv4().optional(),
    productName: z.string().describe('Product name or title'),
    productImageUrl: z.url().optional(),
    extractedAt: z.iso
      .datetime()
      .describe('UTC ISO timestamp of extraction (e.g., 2024-01-15T10:30:00Z)')
      .default(() => new Date().toISOString()),
    originalPrice: z.number().positive().describe('Original/MSRP price before any discounts'),
    currentPrice: z.number().positive().describe('Current price after discounts'),
    currency: z
      .enum(currencyCodes as [string, ...string[]])
      .describe('ISO 4217 currency code (USD, EUR, GBP, etc.)'),
    provider: z.enum(['firecrawl', 'browser_render']).describe('Scraping provider used'),
    availability: z
      .enum(['in_stock', 'out_of_stock', 'unknown'])
      .describe('Product availability status'),
  }),
});
export type TrackingPreviewResponse = z.infer<typeof TrackingPreviewResponseSchema>;