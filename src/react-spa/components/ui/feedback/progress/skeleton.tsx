import { cn } from '@/shared/utils/tailwind-utils';

/**
 * Skeleton component
 *
 * A placeholder loading state that pulses to indicate content is loading.
 * Use for content that's being fetched or calculated.
 *
 * @example
 * // Basic usage
 * <Skeleton className="h-4 w-full" />
 *
 * // For a card placeholder
 * <div className="space-y-2">
 *   <Skeleton className="h-12 w-12 rounded-full" />
 *   <Skeleton className="h-4 w-[250px]" />
 *   <Skeleton className="h-4 w-[200px]" />
 * </div>
 *
 * @param className - Required for dimensions (height and width)
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
}

export { Skeleton };