import { CaretDown } from '@phosphor-icons/react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as React from 'react';

import { cn } from '@/shared/utils/tailwind-utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({
  ref,
  className,
  bottomBorder = true,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
  ref: React.RefObject<React.ElementRef<typeof AccordionPrimitive.Item>>;
  bottomBorder?: boolean;
}) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(bottomBorder ? 'border-b border-border' : '', className)}
    {...props}
  />
);
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = ({
  ref,
  className,
  children,
  underlineOnHover = true,
  showCaret = true,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
  ref: React.RefObject<React.ElementRef<typeof AccordionPrimitive.Trigger>>;
  underlineOnHover?: boolean;
  showCaret?: boolean;
}) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 font-semibold text-base transition-all' +
          ' [&[data-state=open]>svg]:rotate-180',
        underlineOnHover ? 'hover:underline' : '',
        showCaret ? 'hover:underline hover:cursor-pointer' : '',
        className
      )}
      {...props}
    >
      {children}
      {showCaret && (
        <CaretDown className="h-5 w-5 shrink-0 transition-transform duration-200 ml-2" />
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
  ref: React.RefObject<React.ElementRef<typeof AccordionPrimitive.Content>>;
}) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };