import type {User} from "@supabase/supabase-js";
import {useAuthStore} from "@/features/auth/store";

// Helper that returns a fresh promise each time

export function waitForAuth(): Promise<{ user: User | null }> {
    const {user, isInitialized} = useAuthStore.getState();

    if (isInitialized) {
        return Promise.resolve({user});
    }

    return new Promise(resolve => {
        const unsub = useAuthStore.subscribe(state => {
            if (state.isInitialized) {
                unsub();
                resolve({user: state.user});
            }
        });
    });
}