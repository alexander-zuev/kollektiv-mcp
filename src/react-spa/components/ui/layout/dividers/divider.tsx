import { cn } from '@/shared/utils/tailwind-utils';
import * as React from 'react';

interface DividerProps {
  text?: string;
  className?: string;
}

const Divider = ({ text, className }: DividerProps & {}) => {
  return (
    <div className={cn('relative my-6', className)}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-border"></span>
      </div>
      {text && (
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-2 text-muted-foreground">{text}</span>
        </div>
      )}
    </div>
  );
};
Divider.displayName = 'Divider';

export { Divider };