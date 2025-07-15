import { Outlet, Link, createRootRouteWithContext } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/atoms/buttons/button.tsx';
import { User } from '@supabase/supabase-js';

interface RouterContext {
  queryClient: QueryClient;
  waitForAuth: () => Promise<{ user: User | null }>;
  // auth: Promise<{ user: User | null }>;
}

function RootComponent() {
  return (
    <>
      <Outlet />
      {/*<ReactQueryDevtools buttonPosition="bottom-right" />*/}
      {/*<TanStackRouterDevtools position={'bottom-right'} />*/}
    </>
  );
}

/**
 * NotFound page component displayed when a route doesn't match any defined routes
 */
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="w-full max-w-md rounded-lg bg-card p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          {/* Not Found icon with warning styling */}
          <div className="bg-warning/20 border-warning/50 shadow-warning/10 flex h-16 w-16 items-center justify-center rounded-full border shadow-lg transition-all duration-300 hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-warning h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-foreground">Page Not Found</h1>
        <p className="mb-6 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col space-y-2">
          {/* Using the Button component from your UI library */}
          <Button asChild variant="default" className="w-full">
            <Link to={'/'}>Return to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});