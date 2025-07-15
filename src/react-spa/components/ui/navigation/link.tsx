import { cn } from '@/shared/utils/utils.ts';
import { LinkProps, Link as RouterLink } from 'react-router-dom';
import React from 'react';

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  unstyled?: boolean; // Option to remove default styling
}

export const Link = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ children, className, unstyled = false, ...props }, ref) => {
    return (
      <RouterLink
        ref={ref}
        className={cn(
          // Base styles
          unstyled && 'leading-none inline-flex',
          className
        )}
        {...props}
      >
        {children}
      </RouterLink>
    );
  }
);

Link.displayName = 'Link';