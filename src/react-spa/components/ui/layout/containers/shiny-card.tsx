import React from 'react';
import { cn } from '@/shared/utils/utils.ts';

export interface ShinyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Variant of the shiny card
   * @default "standard"
   */
  variant?: 'standard' | 'premium';

  /**
   * Whether to add a subtle animation to the card
   * @default false
   */
  animated?: boolean;

  /**
   * Custom gradient colors for the background
   * Format: "from-[color1] via-[color2] to-[color3]"
   */
  gradientColors?: string;

  /**
   * Custom gradient colors for the inner glow
   * Format: "from-[color1] via-[color2] to-[color3]"
   */
  glowColors?: string;

  /**
   * Border color
   * @default "border-accent-border"
   */
  borderColor?: string;

  /**
   * Children to render inside the card
   */
  children: React.ReactNode;
}

/**
 * ShinyCard component
 *
 * A card component with a shiny, polished appearance that resembles a shield or tablet.
 * Comes in two variants: standard and premium.
 *
 * @example
 * ```tsx
 * <ShinyCard variant="premium">
 *   <h2>Premium Content</h2>
 *   <p>This content is displayed in a premium shiny card.</p>
 * </ShinyCard>
 * ```
 */
export const ShinyCard: React.FC<ShinyCardProps> = ({
  variant = 'standard',
  animated = false,
  gradientColors,
  glowColors,
  borderColor = 'border-accent-border',
  className,
  children,
  ...props
}) => {
  // Default gradient colors based on variant
  const defaultGradientColors =
    variant === 'premium'
      ? 'from-blue-surface via-accent-surface to-primary-alpha'
      : 'from-gray-3 via-gray-2 to-gray-3';

  // Default glow colors based on variant
  const defaultGlowColors =
    variant === 'premium'
      ? 'from-transparent via-primary/10 to-primary/20'
      : 'from-transparent via-foreground/5 to-foreground/10';

  // Animation class if enabled
  const animationClass = animated
    ? variant === 'premium'
      ? 'animate-glow-pulse'
      : 'hover:scale-[1.01] transition-transform duration-300'
    : '';

  // Shadow based on variant
  const shadowClass = variant === 'premium' ? 'shadow-lg shadow-primary/10' : 'shadow-md';

  return (
    <div
      className={cn(
        'w-full rounded-xl overflow-hidden relative border',
        borderColor,
        shadowClass,
        animationClass,
        className
      )}
      {...props}
    >
      {/* Background gradient */}
      <div
        className={cn('absolute inset-0 bg-gradient-to-r', gradientColors || defaultGradientColors)}
      />

      {/* Inner glow effect */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-tr backdrop-blur-sm',
          glowColors || defaultGlowColors
        )}
      />

      {/* Subtle highlight at the top */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-px bg-gradient-to-r',
          variant === 'premium'
            ? 'from-transparent via-primary/40 to-transparent'
            : 'from-transparent via-foreground/20 to-transparent'
        )}
      />

      {/* Premium-only corner shine */}
      {variant === 'premium' && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-primary/30 to-transparent opacity-70 blur-md" />
      )}

      {/* Content */}
      <div className="relative p-6 md:p-8 z-10">{children}</div>
    </div>
  );
};

export default ShinyCard;