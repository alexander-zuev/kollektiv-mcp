import React, {Suspense} from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import {useAuthInitializer} from '@/features/auth/useAuthInitializer';
import {LoadingFallbackPage} from '@/pages';
import {routes} from './config';

/**
 * Main application router component
 * Uses React Router with our route configuration
 */
export const AppRouter: React.FC = () => {
    useAuthInitializer();
    return (
        <Router>
            <Suspense fallback={<LoadingFallbackPage/>}>
                <Routes>
                    {/* Generate routes from our configuration */}
                    {routes.map(route => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                route.requiresAuth ? (
                                    // <AuthGuard>
                                    <route.component/>
                                ) : (
                                    // </AuthGuard>
                                    <route.component/>
                                )
                            }
                        />
                    ))}
                </Routes>
            </Suspense>
        </Router>
    );
};