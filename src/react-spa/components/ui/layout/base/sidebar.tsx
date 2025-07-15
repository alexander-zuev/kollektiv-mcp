import { Sidebar as SidebarIcon } from '@phosphor-icons/react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { Button } from '@/components/ui/atoms/buttons';
import { Input } from '@/components/ui/atoms/inputs';
import { Skeleton } from '@/components/ui/feedback';
import { Separator } from '@/components/ui/layout/dividers/separator';
import {
  Sheet,
  SheetContent,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/overlays';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { cn } from '@/shared/utils/tailwind-utils';

/**
 * Sidebar Component System
 *
 * A comprehensive and flexible sidebar navigation system for dashboard layouts.
 *
 * Core Features:
 * - Responsive design with mobile and desktop variants
 * - Multiple collapsible modes: offcanvas, icon, or none
 * - Keyboard shortcut support (Cmd/Ctrl+B)
 * - Auto-persists state with cookies
 * - Accessible via keyboard and screen readers
 *
 * Padding System:
 * - All variants use p-4 padding for consistency with the app's design system
 * - Mobile sidebar uses p-4 padding
 * - Desktop sidebar uses p-4 padding for all variants
 * - SidebarInset uses m-2 margin to maintain proper spacing without causing overflow
 */

const SIDEBAR_COOKIE_NAME = 'sidebar:state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

/**
 * Sidebar Context Type
 * Provides state management for the sidebar system
 */
type SidebarContext = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

/**
 * Hook to access sidebar state from any component
 * Must be used within a SidebarProvider
 */
function useSidebar(): SidebarContext {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}

/**
 * SidebarProvider
 *
 * Provides state management for the sidebar and wraps the entire layout.
 *
 * @param defaultOpen - Whether the sidebar should be open by default (default: true)
 * @param open - Control open state externally (optional)
 * @param onOpenChange - Callback when open state changes (optional)
 * @param className - Additional CSS classes
 * @param style - Additional inline styles
 * @param children - Layout components (should contain Sidebar and SidebarInset)
 */
const SidebarProvider = ({
  ref,
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  ref: React.RefObject<HTMLDivElement>;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}): JSX.Element => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      if (setOpenProp) {
        return setOpenProp?.(typeof value === 'function' ? value(open) : value);
      }

      _setOpen(value);

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile(open => !open) : setOpen(open => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? 'expanded' : 'collapsed';

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper flex min-h-svh w-full text-sidebar-foreground has-data-[variant=inset]:bg-sidebar',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
};
SidebarProvider.displayName = 'SidebarProvider';

/**
 * Sidebar
 *
 * The main sidebar container component.
 *
 * @param side - Position of the sidebar ("left" or "right", default: "left")
 * @param variant - Visual style ("sidebar" or "inset", default: "sidebar")
 * @param collapsible - Collapse behavior ("offcanvas", "icon", or "none", default: "offcanvas")
 * @param className - Additional CSS classes
 * @param children - Sidebar content components (header, content, footer)
 */
const Sidebar = ({
  ref,
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  ref: React.RefObject<HTMLDivElement>;
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'inset' | 'floating';
  collapsible?: 'offcanvas' | 'icon' | 'none';
  className?: string;
  children?: React.ReactNode;
}): JSX.Element => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === 'none') {
    return (
      <div
        className={cn(
          'flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground',
          variant === 'floating' || variant === 'inset' ? 'p-4' : '',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          ref={ref}
          data-sidebar="sidebar"
          data-mobile="true"
          className="w-(--sidebar-width) bg-sidebar p-4 border-border text-sidebar-foreground [&>button]:hidden"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      className="group peer hidden md:block"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          'duration-200 relative h-svh w-(--sidebar-width) bg-transparent transition-[width] ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
        )}
      />
      <div
        className={cn(
          'duration-200 fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? 'p-4 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+4px)]'
            : 'p-4 group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
Sidebar.displayName = 'Sidebar';

/**
 * SidebarTrigger
 *
 * Button to toggle the sidebar. Usually placed in a header or navbar.
 */
const SidebarTrigger = ({
  ref,
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button> & {
  ref?: React.RefObject<React.ElementRef<typeof Button>>;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
}): JSX.Element => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn('h-7 w-7', className)}
      onClick={event => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <SidebarIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};
SidebarTrigger.displayName = 'SidebarTrigger';

/**
 * SidebarRail
 *
 * Drag handle for resizable sidebar (when implemented).
 */
const SidebarRail = ({
  ref,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  ref: React.RefObject<HTMLButtonElement>;
}) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex',
        'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className
      )}
      {...props}
    />
  );
};
SidebarRail.displayName = 'SidebarRail';

/**
 * SidebarInset
 *
 * The main content area that adjusts based on sidebar state.
 * This component should be a sibling to the Sidebar component.
 *
 * Spacing Notes:
 * - Uses m-4 (1rem) margin for consistent spacing with the design system
 * - The min-height calculation subtracts 8 spacing units (2rem) from viewport height
 *   to account for the top and bottom margins (m-4 = 1rem on each side)
 * - This prevents vertical scrollbars while maintaining proper spacing
 */
const SidebarInset = ({
  ref,
  className,
  ...props
}: React.ComponentProps<'main'> & {
  ref?: React.RefObject<HTMLDivElement>;
}): JSX.Element => (
  <main
    ref={ref}
    className={cn(
      'relative flex min-h-svh flex-1 flex-col bg-background',
      // Using m-4 (1rem) for consistent spacing with design system
      // The min-height calculation subtracts 8 spacing units (2rem) to account for top/bottom margins
      'peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(8)))] md:peer-data-[variant=inset]:m-4 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-4 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm',
      className
    )}
    {...props}
  />
);
SidebarInset.displayName = 'SidebarInset';

/**
 * SidebarInput
 *
 * Search input specifically styled for the sidebar.
 */
const SidebarInput = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Input> & {
  ref: React.RefObject<React.ElementRef<typeof Input>>;
}) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        'h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
        className
      )}
      {...props}
    />
  );
};
SidebarInput.displayName = 'SidebarInput';

/**
 * SidebarHeader
 *
 * Container for the top section of the sidebar.
 * Typically contains logo, app title, or search.
 */
const SidebarHeader = ({
  ref,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  ref: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  );
};
SidebarHeader.displayName = 'SidebarHeader';

/**
 * SidebarFooter
 *
 * Container for the bottom section of the sidebar.
 * Typically contains user profile, logout button, or support links.
 */
const SidebarFooter = ({
  ref,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  ref: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  );
};
SidebarFooter.displayName = 'SidebarFooter';

/**
 * SidebarSeparator
 *
 * Horizontal divider for separating sections in the sidebar.
 */
const SidebarSeparator = ({
  ref,
  className,
  ...props
}: React.ComponentProps<typeof Separator> & {
  ref: React.RefObject<React.ElementRef<typeof Separator>>;
}) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn('mx-2 w-auto bg-sidebar-border', className)}
      {...props}
    />
  );
};
SidebarSeparator.displayName = 'SidebarSeparator';

/**
 * SidebarContent
 *
 * Main container for sidebar navigation content.
 * Placed between header and footer.
 */
const SidebarContent = ({
  ref,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  ref?: React.RefObject<HTMLDivElement>;
}): JSX.Element => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className
      )}
      {...props}
    />
  );
};
SidebarContent.displayName = 'SidebarContent';

/**
 * SidebarGroup
 *
 * Container for a group of related menu items.
 * Can have a label and optional actions.
 *
 * Example:
 * ```tsx
 * <SidebarGroup>
 *   <SidebarGroupLabel>API Management</SidebarGroupLabel>
 *   <SidebarMenu>
 *     <SidebarMenuItem>
 *       <SidebarMenuButton>Generate Key</SidebarMenuButton>
 *     </SidebarMenuItem>
 *   </SidebarMenu>
 * </SidebarGroup>
 * ```
 */
const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="group"
        className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
        {...props}
      />
    );
  }
);
SidebarGroup.displayName = 'SidebarGroup';

/**
 * SidebarGroupLabel
 *
 * Label for a sidebar group.
 */
const SidebarGroupLabel = ({ ref, className, asChild = false, ...props }) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        'duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-hidden ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        className
      )}
      {...props}
    />
  );
};
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

/**
 * SidebarGroupAction
 *
 * Action button for a sidebar group (e.g., "Add New").
 */
const SidebarGroupAction = ({
  ref,
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & {
  ref?: React.RefObject<HTMLButtonElement>;
  asChild?: boolean;
}): JSX.Element => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        'absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
};
SidebarGroupAction.displayName = 'SidebarGroupAction';

/**
 * SidebarGroupContent
 *
 * Container for the content of a sidebar group.
 */
const SidebarGroupContent = ({
  ref,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  ref?: React.RefObject<HTMLDivElement>;
}): JSX.Element => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn('w-full text-sm', className)}
    {...props}
  />
);
SidebarGroupContent.displayName = 'SidebarGroupContent';

/**
 * SidebarMenu
 *
 * Unordered list container for menu items.
 */
const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu"
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  )
);
SidebarMenu.displayName = 'SidebarMenu';

/**
 * SidebarMenuItem
 *
 * List item container for a menu button.
 */
const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      data-sidebar="menu-item"
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  )
);
SidebarMenuItem.displayName = 'SidebarMenuItem';

const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground',
        outline:
          'border border-border shadow-xs hover:bg-surface-hover text-foreground active:bg-surface-hover data-[active=true]:bg-surface-hover',
        ghost:
          'text-muted-foreground hover:text-secondary-foreground hover:bg-surface-hover data-[active=true]:text-secondary-foreground data-[active=true]:bg-surface-hover',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/**
 * SidebarMenuButton
 *
 * Interactive button for sidebar navigation.
 *
 * @param isActive - Whether this item is currently active
 * @param variant - Visual style ("default", "ghost", etc.)
 * @param size - Size of the button ("default", "sm", "lg")
 * @param tooltip - Optional tooltip text (shown when sidebar is collapsed)
 * @param asChild - Whether to render as a child component (for using with Link)
 *
 * Example with Link:
 * ```tsx
 * <SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
 *   <Link to="/dashboard">Dashboard</Link>
 * </SidebarMenuButton>
 * ```
 */
interface SidebarMenuButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
  isActive?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  tooltip?: string | { children: React.ReactNode };
  className?: string;
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  (
    {
      asChild = false,
      isActive = false,
      variant = 'default',
      size = 'default',
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const { isMobile, state } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === 'string') {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== 'collapsed' || isMobile}
          {...tooltip}
        />
      </Tooltip>
    );
  }
);
SidebarMenuButton.displayName = 'SidebarMenuButton';

/**
 * SidebarMenuAction
 *
 * Action button that appears inside a menu item (e.g., delete, edit).
 *
 * @param showOnHover - Whether to only show the action on hover
 */
const SidebarMenuAction = ({ ref, className, asChild = false, showOnHover = false, ...props }) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        'absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        showOnHover &&
          'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0',
        className
      )}
      {...props}
    />
  );
};
SidebarMenuAction.displayName = 'SidebarMenuAction';

/**
 * SidebarMenuBadge
 *
 * Badge component for showing counts or status in menu items.
 */
const SidebarMenuBadge = ({
  ref,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  ref: React.RefObject<HTMLDivElement>;
}) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      'absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none',
      'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
      'peer-data-[size=sm]/menu-button:top-1',
      'peer-data-[size=default]/menu-button:top-1.5',
      'peer-data-[size=lg]/menu-button:top-2.5',
      'group-data-[collapsible=icon]:hidden',
      className
    )}
    {...props}
  />
);
SidebarMenuBadge.displayName = 'SidebarMenuBadge';

/**
 * SidebarMenuSkeleton
 *
 * Loading skeleton for menu items.
 *
 * @param showIcon - Whether to show an icon placeholder
 */
const SidebarMenuSkeleton = ({ ref, className, showIcon = false, ...props }) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn('rounded-md h-8 flex gap-2 px-2 items-center', className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 flex-1 max-w-(--skeleton-width)"
        data-sidebar="menu-skeleton-text"
        style={
          {
            '--skeleton-width': width,
          } as React.CSSProperties
        }
      />
    </div>
  );
};
SidebarMenuSkeleton.displayName = 'SidebarMenuSkeleton';

/**
 * SidebarMenuSub
 *
 * Container for submenu items in a hierarchical navigation.
 */
const SidebarMenuSub = ({
  ref,
  className,
  ...props
}: React.ComponentProps<'ul'> & {
  ref: React.RefObject<HTMLUListElement>;
}) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5',
      'group-data-[collapsible=icon]:hidden',
      className
    )}
    {...props}
  />
);
SidebarMenuSub.displayName = 'SidebarMenuSub';

/**
 * SidebarMenuSubItem
 *
 * List item for submenu navigation.
 */
const SidebarMenuSubItem = ({
  ref,
  ...props
}: React.ComponentProps<'li'> & {
  ref: React.RefObject<HTMLLIElement>;
}) => <li ref={ref} {...props} />;
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem';

/**
 * SidebarMenuSubButton
 *
 * Button for submenu items.
 *
 * @param isActive - Whether this submenu item is currently active
 * @param size - Size of the button
 */
interface SidebarMenuSubButtonProps extends React.ComponentPropsWithoutRef<'a'> {
  asChild?: boolean;
  isActive?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const SidebarMenuSubButton = React.forwardRef<HTMLAnchorElement, SidebarMenuSubButtonProps>(
  ({ asChild = false, size = 'md', isActive, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';

    return (
      <Comp
        ref={ref}
        data-sidebar="menu-sub-button"
        data-size={size}
        data-active={isActive}
        className={cn(
          'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-hidden ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
          'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          'group-data-[collapsible=icon]:hidden',
          className
        )}
        {...props}
      />
    );
  }
);
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton';

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};