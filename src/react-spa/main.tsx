import {StrictMode} from 'react';
import {config} from '@/config/config.ts';
import {ErrorBoundary, initSentry, Sentry} from '@/shared/lib/sentry.ts';
import '@/styles/styles.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createRouter, RouterProvider} from '@tanstack/react-router';
import {PostHogProvider} from "posthog-js/react";
import ReactDOM from 'react-dom/client';
import {Toaster} from '@/components/ui/feedback/toasts';
import {useAuthInitializer, waitForAuth} from "@/features/auth";
import {ErrorFallback} from '@/features/common/components/ErrorFallback';
import {useNetworkStatus} from "@/shared/hooks";
import {ThemeProvider} from '@/shared/hooks/use-theme.tsx';
import {routeTree} from './routeTree.gen.ts';


const queryClient = new QueryClient();


// Create a new router instance
const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    context: {
        queryClient,
        waitForAuth,
    },
});


// Initialize Sentry with router integration
initSentry(router);

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const PosthogWrapper = ({children}: { children: React.ReactNode }) => {
    if (config.isDevelopment) {
        return children;
    }
    return (
        <PostHogProvider
            apiKey={config.posthog.apiKey}
            options={{
                api_host: config.posthog.apiHost,
                // debug: import.meta.env.MODE === 'development',
            }}
        >
            {children}
        </PostHogProvider>
    );
};

function AppWithAuth() {
    useNetworkStatus();
    useAuthInitializer();

    return <RouterProvider router={router} context={{queryClient}}/>;
}


// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement, {
        onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
            console.error('Uncaught error', error, errorInfo.componentStack);
        }),
        onCaughtError: Sentry.reactErrorHandler(),
        onRecoverableError: Sentry.reactErrorHandler(),
    });
    root.render(
        <StrictMode>
            <ErrorBoundary fallback={ErrorFallback}>
                <PosthogWrapper>
                    <QueryClientProvider client={queryClient}>
                        <ThemeProvider defaultTheme={'dark'} storageKey={'vite-ui-theme'}>
                            <Toaster/>
                            <AppWithAuth/>
                        </ThemeProvider>
                    </QueryClientProvider>
                </PosthogWrapper>
            </ErrorBoundary>
        </StrictMode>
    );
}