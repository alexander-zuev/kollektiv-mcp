import { useAuthStore } from '@/features/auth/store/AuthStore';
import { logger } from '@/shared/lib/logger';
import { supabase } from '@/shared/services/supabaseClient';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

// TODO: I am probably missing auth error handling here?
// TODO: If I am not wrong I would need to handle errors with sessions same way
// as I handle it with MCP (see below) as the codes above return null and not user

// const NO_VALID_SESSION_ERRORS = new Set([
// 	"user_not_found",
// 	"refresh_token_not_found",
// 	"session_not_found",
// 	"session_expired",
// ]);

export const useAuthInitializer = () => {
  const { setSession, setUser, setIsInitialized } = useAuthStore(
    useShallow(state => ({
      setSession: state.setSession,
      setUser: state.setUser,
      setIsInitialized: state.setIsInitialized,
    }))
  );

  useEffect(() => {
    setIsInitialized(false);

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      logger.debug('Auth event:', event);

      if (session && session.provider_token) {
        window.localStorage.setItem('oauth_provider_token', session.provider_token);
      }
      if (session && session.provider_refresh_token) {
        window.localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token);
      }

      // Handle different events
      switch (event) {
        case 'INITIAL_SESSION':
          // This is handled by initializeAuth, no need for duplicate logic
          logger.debug('Initial session detected');
          setSession(session);
          setUser(session?.user ?? null);
          setIsInitialized(true);
          break;

        case 'SIGNED_IN':
          logger.info(
            'User signed in',
            session?.user?.email,
            'Provider:',
            session?.user?.app_metadata?.provider
          );
          setSession(session);
          setUser(session?.user ?? null);
          break;

        case 'SIGNED_OUT':
          logger.info('User signed out');
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

          setSession(null);
          setUser(null);

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