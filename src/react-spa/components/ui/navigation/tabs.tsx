import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import { cn } from '@/shared/utils/tailwind-utils';

const Tabs = TabsPrimitive.Root;

interface TabsListProps extends React.ComponentProps<typeof TabsPrimitive.List> {
  noBg?: boolean;
}

function TabsList({ className, noBg = false, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md p-1 text-muted-foreground',
        !noBg && 'bg-muted',
        className
      )}
      {...props}
    />
  );
}

interface TabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  noBg?: boolean;
  noBorder?: boolean;
  color?: 'default' | 'accent';
}

function TabsTrigger({
  className,
  noBg = false,
  noBorder = false,
  color = 'default',
  ...props
}: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap border border-transparent rounded-sm px-3 py-1.5 text-xs md:text-sm font-regular md:font-medium transition-all disabled:pointer-events-none disabled:opacity-50',
        // Base styles that apply to all tabs
        'focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
        // Add cursor pointer
        'cursor-pointer',
        // Color styles
        color === 'default'
          ? 'data-[state=active]:text-foreground'
          : 'data-[state=active]:text-accent-foreground',
        // Background styles
        !noBg &&
          (color === 'default'
            ? 'data-[state=active]:bg-background'
            : 'data-[state=active]:bg-accent'),
        // Border and shadow styles
        noBorder
          ? 'border-0 shadow-none data-[state=active]:shadow-none data-[state=active]:border-0'
          : ' border border-transparent data-[state=active]:border-border',
        className
      )}
      style={{
        // Inline styles to ensure overrides work
        boxShadow: noBorder ? 'none' : undefined,
      }}
      {...props}
    />
  );
}

interface TabsContentProps extends React.ComponentProps<typeof TabsPrimitive.Content> {
  noTransition?: boolean;
}

function TabsContent({ className, noTransition = false, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        'mt-2 border rounded-md ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        // // Add smooth transition properties
        // !noTransition && 'transition-all duration-300 ease-in-out',
        // // Fade effect for tab content
        // !noTransition && 'data-[state=inactive]:opacity-0 data-[state=active]:opacity-100',
        // // Keep content in the same position to prevent layout shifts
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };