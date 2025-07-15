import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/shared/utils/tailwind-utils';

/**
 * Progress component
 *
 * A horizontal progress bar that visualizes completion percentage.
 *
 * @example
 * // Basic usage
 * <Progress value={33} />
 *
 * // Custom styling
 * <Progress value={75} className="h-2 w-64" />
 *
 *
 * @param value - Number between 0-100 representing completion percentage
 * @param className - Optional custom classes for the root element
 *
 * Notes:
 * - The track (container) uses bg-secondary for the background
 * - The indicator (fill) uses bg-primary for the filled portion
 * - Always visible when rendered; use conditional rendering to show/hide
 */
function Progress({
  className,
  value = 0,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={`h-full w-full flex-1 bg-primary ${value === 0 ? 'opacity-0 transition-opacity duration-300' : 'opacity-100 transition-all'}`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };