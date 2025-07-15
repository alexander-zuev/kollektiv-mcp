import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shared/utils/tailwind-utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
  ref?: React.RefObject<React.ElementRef<typeof DialogPrimitive.Overlay>>;
}) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      // Base styles
      'fixed inset-0 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      // Use semantic z-index utility
      'z-overlay', // <--- Changed from z-50
      className
    )}
    {...props}
  />
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = ({
  ref,
  className,
  children,
  hideCloseButton = false,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  ref?: React.RefObject<React.ElementRef<typeof DialogPrimitive.Content>>;
  hideCloseButton?: boolean;
}) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        // Base layout and style
        'fixed left-[50%] top-[50%] grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-[var(--color-background)] p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-bottom-4 sm:rounded-lg',
        'z-modal', // <--- Changed from z-50
        'component-width-dialog', // <--- Our width utility
        // Allow overrides
        className
      )}
      {...props}
    >
      {children}
      {!hideCloseButton && (
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors cursor-pointer">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
  ref?: React.RefObject<React.ElementRef<typeof DialogPrimitive.Title>>;
}) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & {
  ref?: React.RefObject<React.ElementRef<typeof DialogPrimitive.Description>>;
}) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};