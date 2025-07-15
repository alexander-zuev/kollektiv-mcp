import * as React from 'react';

import { cn } from '@/shared/utils/tailwind-utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({
  ref,
  className,
  ...props
}: TextareaProps & {
  ref: React.RefObject<HTMLTextAreaElement>;
}) => {
  return (
    <textarea
      className={cn(
        'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-surface flex min-h-[80px] w-full rounded-md border border-border px-3 py-1 text-base shadow-xs transition-[color,box-shadow,border-color] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'hover:border-border-hover',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
        className
      )}
      ref={ref}
      {...props}
    />
  );
};
Textarea.displayName = 'Textarea';

export { Textarea };