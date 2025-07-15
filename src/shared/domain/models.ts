import {z} from 'zod';


// Tracking Job status
export const TRACKING_JOB_STATUSES = ['active', 'error', 'paused', 'deleted'] as const;
export type TrackingJobStatus = (typeof TRACKING_JOB_STATUSES)[number];

// URL
export const UrlSchema = z.url({
    protocol: /^https?$/,
    hostname: z.regexes.domain,
    error: 'Please enter a valid product URL, e.g. https://www.walmart.com/ip/product-name/12345',
});
export type Url = z.infer<typeof UrlSchema>;

// Price rules
export const PriceRuleSchema = z.object({
    type: z.enum(['percentage_decrease', 'target_price', 'any_change', 'percentage_change_any']),
    value: z.number().optional(),
}).refine(
    (data) => {
        // If not any_change, value is required
        if (data.type !== 'any_change') {
            return data.value !== undefined;
        }
        return true;
    },
    {
        message: "Value is required for this price rule type",
        path: ["value"],
    }
);
export type PriceRule = z.infer<typeof PriceRuleSchema>;

// Monitoring schedules
export const MonitoringScheduleSchema = z.object({
    interval: z.enum(['daily']),
});
export type MonitoringSchedule = z.infer<typeof MonitoringScheduleSchema>;

// Notifications
export const NotificationChannelSchema = z.object({
    channel: z.enum(['email']),
    contact: z.email(),
});
export type NotificationChannel = z.infer<typeof NotificationChannelSchema>;