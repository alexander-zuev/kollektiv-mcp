import { z } from 'zod/v4';
import {
  UrlSchema,
  PriceRuleSchema,
  MonitoringScheduleSchema,
  NotificationChannelSchema,
  currencyCodes,
  TRACKING_JOB_STATUSES,
} from '@shared/domain-schemas';
import { TimestamptzSchema } from '@shared/types';

export const TrackingJobDetailResponseSchema = z.object({
  id: z.uuidv4(),
  productName: z.string(),
  productImageUrl: z.url().optional(),
  price: z.object({
    currentPrice: z.number().describe('Current price after discounts'),
    currency: z
      .enum(currencyCodes as [string, ...string[]])
      .describe('ISO 4217 currency code (USD, EUR, GBP, etc.)'),
    extractedAt: TimestamptzSchema,
  }),
  priceRules: z.object({
    type: z.enum(['percentage_decrease', 'target_price', 'any_change', 'percentage_change_any']),
    value: z.number().optional(),
  }),
  schedule: z.object({
    interval: z.enum(['daily']),
  }),
  notificationChannels: z.object({
    channel: z.enum(['email']),
    contact: z.email(),
  }),
  status: z.enum(TRACKING_JOB_STATUSES),
  createdAt: TimestamptzSchema,
});
export type TrackingJobDetailResponse = z.infer<typeof TrackingJobDetailResponseSchema>;

export const TrackingJobCreateRequestSchema = z.object({
  snapshotId: z.uuidv4(),
  url: UrlSchema,
  productName: z.string(),
  productImageUrl: z.url().optional(),
  priceRules: PriceRuleSchema,
  schedule: MonitoringScheduleSchema,
  notificationChannels: NotificationChannelSchema,
});

export type TrackingJobCreateRequest = z.infer<typeof TrackingJobCreateRequestSchema>;

export const TrackingJobCreateResponseSchema = z.object({
  id: z.uuidv4(),
});
export type TrackingJobCreateResponse = z.infer<typeof TrackingJobCreateResponseSchema>;

export const TrackingJobUpdateRequestSchema = z.object({
  status: z.enum(TRACKING_JOB_STATUSES),
});
export type TrackingJobUpdateRequest = z.infer<typeof TrackingJobUpdateRequestSchema>;