import { z } from 'zod/v4';
import { UrlSchema } from '@shared/domain-schemas.ts';

/**
 * Request schema for AI product extraction endpoint
 */
export const AiExtractRequestSchema = z.object({
  url: UrlSchema,
});

export type AiExtractRequest = z.infer<typeof AiExtractRequestSchema>;

/**
 * Response schema for AI product extraction endpoint
 */
export const AiExtractResponseSchema = z.object({
  data: z
    .object({
      name: z.string().optional(),
      store: z.string().optional(),
      brand: z.string().optional(),
    })
    .optional(),
});

export type AiExtractResponse = z.infer<typeof AiExtractResponseSchema>;

// JSON Schema for Workers AI (matches the Zod schema structure)
export const ProductExtractionJsonSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Product name if identifiable from URL path/parameters',
    },
    store: {
      type: 'string',
      description: 'Store name extracted from domain (e.g., Amazon, Walmart)',
    },
  },
  required: [], // All fields are optional
  additionalProperties: false,
} as const;