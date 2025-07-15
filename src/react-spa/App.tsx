import {ErrorBoundary} from '@/shared/monitoring/sentry.ts';
import {AppRouter} from '@/routing/AppRouter';
import {QueryClientProvider} from '@tanstack/react-query';
import ErrorPage from './pages/common/ErrorPage';
import {supabase} from 'src/shared/services';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {queryClient} from '@/shared/services/queryClient.ts';
import {usePosthogUser} from 'src/shared/services';
import {Toaster} from '@/components/ui/feedback/toasts/sonner';
import {PostHogProvider} from 'posthog-js/react';
import {config} from '@/config';
import {ReactNode} from 'react';
import {useNetworkStatus} from '@/shared/hooks/useNetworkStatus';
import {useAuthInitializer} from './features/auth';

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