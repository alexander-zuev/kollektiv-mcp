import App from '@/App';
import {config} from '@/config'; // 1. Import and validate configuration first
// import {configureLogger, logger} from '@/'; // 3. Import and configure
// logger with config values
import '@/shared/monitoring/sentry.ts'; // 2. Initialize error tracking early
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client'; // 5. Other imports
import {generateErrorPageHTML} from '@/pages/common/ErrorPage'; // 4. Import error page template generator
import '@/styles/styles.css';
import * as Sentry from '@sentry/react';

console.log('React is starting...');

// configureLogger(config.logging.level);
// logger.info('Application starting');

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element not found');
}

try {
    createRoot(rootElement, {
        // React 19 error hooks:
        onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
            console.error('Uncaught error', error, errorInfo.componentStack);
        }),
        onCaughtError: Sentry.reactErrorHandler(),
        onRecoverableError: Sentry.reactErrorHandler(),
    }).render(
        <StrictMode>
            <App/>
        </StrictMode>
    );
    console.info('Application started successfully');
} catch (error) {
    console.error('Fatal application error', error);
    rootElement.innerHTML = generateErrorPageHTML(
        error instanceof Error ? error : new Error(String(error))
    );
}