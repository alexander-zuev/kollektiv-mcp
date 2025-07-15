import {WarningCircleIcon} from '@phosphor-icons/react';
import {Link} from '@tanstack/react-router';
import {Button} from '@/components/ui/atoms/buttons/button';

interface ErrorFallbackProps {
    error?: Error;
    info?: { componentStack?: string };
    reset?: () => void;
}

export const ErrorFallback = ({ error, info, reset }: ErrorFallbackProps) => {
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-background">
            <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-lg">
                <div className="flex justify-center mb-6">
                    {/* Error icon with destructive styling */}
                    <div
                        className="w-16 h-16 rounded-full bg-destructive/20 border border-destructive/50 flex items-center justify-center shadow-lg shadow-destructive/10">
                        <WarningCircleIcon className="h-8 w-8 text-destructive" weight="regular"/>
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-4 text-foreground">Something went wrong</h1>
                <p className="mb-6 text-muted-foreground">
                    We're sorry, but something unexpected happened. Please try refreshing the page.
                </p>

                {/* Show error details in development */}
                {import.meta.env.DEV && error && (
                    <div className="mb-6 p-4 bg-destructive/10 text-destructive-foreground rounded overflow-auto text-left border border-destructive/30">
                        <p className="font-bold">
                            {error.name}: {error.message}
                        </p>
                        <details className="mt-2">
                            <summary className="cursor-pointer text-sm">View stack trace</summary>
                            <pre className="mt-2 text-xs whitespace-pre-wrap">{error.stack}</pre>
                        </details>
                    </div>
                )}

                <div className="flex flex-col space-y-2">
                    {reset && (
                        <Button variant="default" className="w-full" onClick={reset}>
                            Try again
                        </Button>
                    )}
                    <Button variant="outline" className="w-full"
                            onClick={() => window.location.reload()}>
                        Reload page
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                        <Link to="/">Go home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};