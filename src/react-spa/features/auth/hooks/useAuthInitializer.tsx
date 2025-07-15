import { useAuthStore } from '@/features/auth/store/AuthStore.tsx';
import { logger } from '@/shared/lib/logger.ts';
import { supabase } from '@/shared/services/supabaseClient.ts';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

export const useAuthInitializer = () => {
  const { setSession, setUser, setIsInitialized } = useAuthStore(
    useShallow(state => ({
      setSession: state.setSession,
      setUser: state.setUser,
      setIsInitialized: state.setIsInitialized,
    }))
  );

  useEffect(() => {
    console.debug('Initializing auth effect');
    setIsInitialized(false);

    // Get session on load
    // This is necessary for a case when user reloads the page
    // Session is already stored in the localStorage
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setUser(null);
        setIsInitialized(true);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
        setIsInitialized(true);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.debug('Auth event:', event);

      if (session && session.provider_token) {
        window.localStorage.setItem('oauth_provider_token', session.provider_token);
      }
      if (session && session.provider_refresh_token) {
        window.localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token);
      }

      // Handle different events
      switch (event) {
        case 'INITIAL_SESSION':
          logger.debug('Initial session detected');
          setSession(session);
          setUser(session?.user ?? null);
          setIsInitialized(true);
          console.debug('Auth initialized');
          break;

        case 'SIGNED_IN':
          logger.info('User signed in', {
            'email': session?.user?.email,
            'Provider:': session?.user?.app_metadata?.provider,
          });
          setSession(session);
          setUser(session?.user ?? null);
          break;

        case 'SIGNED_OUT':
          logger.info('User signed out');
          setSession(null);
          setUser(null);

          // Clear ALL session storage for security
          sessionStorage.clear();

          // Clear only Supabase-related items
          Object.keys(window.localStorage).forEach(key => {
            // Supabase auth keys typically start with these prefixes
            if (
              key.startsWith('sb-') ||
              key.startsWith('supabase.auth.') ||
              key === 'oauth_provider_token' ||
              key === 'oauth_provider_refresh_token'
            ) {
              window.localStorage.removeItem(key);
            }
          });

          break;

        case 'PASSWORD_RECOVERY':
          // Could show a notification or redirect to password reset page
          logger.info('Password recovery initiated');
          break;

        case 'TOKEN_REFRESHED':
          setSession(session);
          setUser(session?.user ?? null); // Add this for consistency
          logger.debug('Auth token refreshed');
          break;

        case 'USER_UPDATED':
          setUser(session?.user ?? null);
          logger.info('User profile updated');
          break;
      }
    });

    // Cleanup function to unsubscribe from auth events
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setSession, setUser, setIsInitialized]);
};