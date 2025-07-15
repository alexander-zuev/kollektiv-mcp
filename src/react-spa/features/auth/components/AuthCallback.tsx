// Purpose of this auth callback is simple -> retrieve the intended destination and guide

import {useNavigate} from '@tanstack/react-router';
import {useEffect} from 'react';
import {useShallow} from 'zustand/react/shallow';
import {LoadingSpinner} from '@/components/ui';
import {useAuthStore} from '@/features/auth/store';
import {logger} from '@/shared/lib/logger.ts';

export const AuthCallback = () => {
    const navigate = useNavigate();
    const user = useAuthStore(useShallow(state => state.user));

    useEffect(() => {
        // Wait for auth to be initialized
        if (user) {
            const redirectTo = localStorage.getItem('auth_redirect');
            if (redirectTo) {
                localStorage.removeItem('auth_redirect');
                logger.info(`AuthCallback: Redirecting to stored path: ${redirectTo}`);
                navigate({to: redirectTo});
            } else {
                logger.info('AuthCallback: No redirect path, going to dashboard');
                navigate({to: '/'});
            }
        }
    }, [navigate, user]);

    return (
        <div className={'flex justify-between items-center h-screen w-full'}>
            <LoadingSpinner text={'Authenticating...'}/>
        </div>
    );
};