import { useAuthStore } from '@/features/auth/store';

export function getAuthHeader(): { Authorization: string } | {} {
  const jwt = useAuthStore.getState().getJwt();

  return jwt ? { Authorization: `Bearer ${jwt}` } : {};
}
