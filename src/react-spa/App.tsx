import {useNetworkStatus} from '@/shared/hooks/useNetworkStatus';
import {QueryClientProvider} from '@tanstack/react-query';
import {PostHogProvider} from 'posthog-js/react';
import type {ReactNode} from 'react';
import {Toaster} from '@/components/ui/feedback/toasts/sonner';
import {config} from '@/config';
import {AppRouter} from '@/routing/AppRouter';
import {ErrorBoundary} from '@/shared/monitoring/sentry.ts';
import {supabase, usePosthogUser} from '@/shared/services';
import {queryClient} from '@/shared/services/queryClient.ts';
import {useAuthInitializer} from './features/auth';
import ErrorPage from './pages/common/ErrorPage';

const PosthogWrapper = ({children}: { children: ReactNode }) => {
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

// App component
const App = (): ReactNode => {
    useAuthInitializer();
    useNetworkStatus();
    usePosthogUser();

    const getSession = async () => {
        console.log('getSession called');
        await supabase.auth.getSession();
    };

    getSession();

    return (
        <ErrorBoundary
            fallback={errorData => (
                <ErrorPage
                    error={
                        errorData.error instanceof Error ? errorData.error : new Error(String(errorData.error))
                    }
                />
            )}
        >
            <PosthogWrapper>
                <QueryClientProvider client={queryClient}>
                    <AppRouter/>
                    <Toaster/>
                    {/*<ReactQueryDevtools initialIsOpen={false} />*/}
                </QueryClientProvider>
            </PosthogWrapper>
        </ErrorBoundary>
    );
};

export default App;