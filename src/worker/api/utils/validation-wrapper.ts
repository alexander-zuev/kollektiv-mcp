import {zValidator as zv} from '@hono/zod-validator';
import type {ValidationTargets} from 'hono';
import type {ZodType} from 'zod';
import {apiLogger} from '@/worker/infrastructure/logger/logger';

export const zValidator = <T extends ZodType, Target extends keyof ValidationTargets>(
    target: Target,
    schema: T
) =>
    zv(target, schema, (result, c) => {
        if (!result.success) {
            apiLogger.error('Input validation failed', {
                operation: 'input-validation',
                target,
                inputType: typeof result.data,
                issues: result.error.issues.map(issue => ({
                    path: issue.path.join('.'),
                    message: issue.message,
                    code: issue.code,
                })),
            });

            const issues = result.error.issues.map(issue => ({
                message: issue.message,
                code: issue.code,
                property: issue.path,
            }));

            return c.json(
                {
                    success: false,
                    error: {
                        issues,
                        name: 'ZodError',
                    },
                },
                400
            );
        }
    });