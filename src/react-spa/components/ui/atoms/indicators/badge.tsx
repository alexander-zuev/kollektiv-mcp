import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/utils/tailwind-utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-regular transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        ghost: 'bg-transparent border-current/20',
      },
      colorScheme: {
        default: '',
        primary: 'text-primary',
        secondary: 'text-secondary',
        destructive: 'text-destructive',
        blue: 'text-blue-500',
        green: 'text-green-500',
        orange: 'text-orange-500',
        purple: 'text-purple-500',
      },
    },
    defaultVariants: {
      variant: 'default',
      colorScheme: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, colorScheme, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, colorScheme }), className)} {...props} />;
}

export { Badge, badgeVariants };