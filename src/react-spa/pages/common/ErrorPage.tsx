import { FunctionComponent } from 'react';
import { logger } from 'src/shared/lib';
import { Button } from '@/components/ui/atoms/buttons/button';

export interface ErrorPageProps {
  error?: Error;
  title?: string;
  message?: string;
  showDetails?: boolean;
}

/**
 * Global error page component that can be used for both:
 * - React error boundary fallbacks
 * - Pre-React initialization errors (via HTML template)
 */
const ErrorPage: FunctionComponent<ErrorPageProps> = ({
  error,
  title = 'Something went wrong',
  message = "We've been notified about this issue and are working to fix it.",
  showDetails = import.meta.env.DEV, // Only show error details in development by default
}) => {
  // Log the error if it exists
  if (error) {
    logger.error('Application error:', error);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-background">
      <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          {/* Error icon */}
          <div className="w-16 h-16 rounded-full bg-destructive/20 border border-destructive/50 flex items-center justify-center shadow-lg shadow-destructive/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-destructive"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-foreground">{title}</h1>
        <p className="mb-6 text-muted-foreground">{message}</p>

        {/* Show error details in development */}
        {showDetails && error && (
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
          {/* Reload button */}
          <Button variant="default" className="w-full" onClick={() => window.location.reload()}>
            Reload the page
          </Button>

          {/* Go to home page button */}
          <Button variant="outline" className="w-full" onClick={() => (window.location.href = '/')}>
            Go to home page
          </Button>
        </div>
      </div>
    </div>
  );
};

/**
 * Generate HTML template for pre-React error rendering
 * This can be used in main.tsx to display errors before React initializes
 */
export function generateErrorPageHTML(error?: Error): string {
  const title = 'Application Error';
  const message = 'The application failed to initialize. Please try refreshing the page.';

  return `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 1rem; text-align: center; background-color: var(--background);">
      <div style="max-width: 28rem; width: 100%; background-color: var(--card); padding: 2rem; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);">
        <div style="display: flex; justify-content: center; margin-bottom: 1.5rem;">
          <div style="width: 4rem; height: 4rem; border-radius: 9999px; background-color: rgba(var(--destructive-rgb), 0.2); border: 1px solid rgba(var(--destructive-rgb), 0.5); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(var(--destructive-rgb), 0.1);">
            <svg xmlns="http://www.w3.org/2000/svg" style="height: 2rem; width: 2rem; color: var(--destructive);" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        
        <h1 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--foreground);">${title}</h1>
        <p style="margin-bottom: 1.5rem; color: var(--muted-foreground);">${message}</p>
        
        ${
          error && import.meta.env.DEV
            ? `
          <div style="margin-bottom: 1.5rem; padding: 1rem; background-color: rgba(var(--destructive-rgb), 0.1); color: var(--destructive-foreground); border-radius: 0.25rem; overflow: auto; text-align: left; border: 1px solid rgba(var(--destructive-rgb), 0.3);">
            <p style="font-weight: 700;">${error.name}: ${error.message}</p>
            <details style="margin-top: 0.5rem;">
              <summary style="cursor: pointer; font-size: 0.875rem;">View stack trace</summary>
              <pre style="margin-top: 0.5rem; font-size: 0.75rem; white-space: pre-wrap;">${error.stack}</pre>
            </details>
          </div>
        `
            : ''
        }
        
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <button 
            style="width: 100%; padding: 0.5rem 1rem; background-color: var(--primary); color: var(--primary-foreground); font-weight: 500; border-radius: 0.25rem; border: none; cursor: pointer; transition: background-color 0.2s;"
            onmouseover="this.style.backgroundColor='var(--primary-hover)'"
            onmouseout="this.style.backgroundColor='var(--primary)'"
            onclick="window.location.reload();"
          >
            Reload the page
          </button>
          
          <button 
            style="width: 100%; padding: 0.5rem 1rem; background-color: transparent; color: var(--muted-foreground); border: 1px solid var(--border); border-radius: 0.25rem; cursor: pointer; transition: background-color 0.2s;"
            onmouseover="this.style.backgroundColor='var(--accent)'"
            onmouseout="this.style.backgroundColor='transparent'"
            onclick="window.location.href='/';"
          >
            Go to home page
          </button>
        </div>
      </div>
    </div>
  `;
}

export default ErrorPage;