import type {Session, User} from '@supabase/supabase-js';
import {create} from 'zustand';

interface AuthStore {
    session: Session | null;
    user: User | null;
    isInitialized: boolean;

    setSession: (session: Session | null) => void;
    setUser: (user: User | null) => void;
    getUser: () => User | null;
    getJwt: () => string | null;
    setIsInitialized: (isInitialized: boolean) => void;

    resetAuthStore: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    // set initial state
    session: null,
    user: null,
    isInitialized: false,

    // Methods
    setSession: (session: Session | null) => set({session: session}),
    setUser: (user: User | null) => set({user: user}),
    getUser: () => get().user,
    getJwt: () => get().session?.access_token ?? null,
    setIsInitialized: (isInitialized: boolean) => set({isInitialized}),

    resetAuthStore: () => set({session: null, user: null, isInitialized: false}),
}));