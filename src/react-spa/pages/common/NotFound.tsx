import { ROUTES } from '@/routing/config';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/atoms/buttons/button';

/**
 * NotFound page component displayed when a route doesn't match any defined routes
 */
const NotFound: FunctionComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-background">
      <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          {/* Not Found icon with warning styling */}
          <div className="w-16 h-16 rounded-full bg-warning/20 border border-warning/50 flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg shadow-warning/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-warning"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-foreground">Page Not Found</h1>
        <p className="mb-6 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col space-y-2">
          {/* Using the Button component from your UI library */}
          <Button asChild variant="default" className="w-full">
            <Link to={ROUTES.HOME}>Return to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;