import { useSyncExternalStore, useRef, useEffect } from 'react';
import { toast } from 'sonner';

function getSnapshot(): boolean {
  return navigator.onLine ? true : false;
}
function subscribe(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);

  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}
export const useNetworkStatus = (): boolean => {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  const wasOnlineBefore = useRef(isOnline);

  useEffect(() => {
    const statusChanged = wasOnlineBefore.current !== isOnline;

    if (statusChanged) {
      if (!isOnline) {
        toast.error('Network disconnected', {
          description: 'Check your internet connection',
        });
      } else if (wasOnlineBefore.current === false) {
        toast.success('Network connected');
      }
      wasOnlineBefore.current = isOnline;
    }
  }, [isOnline]);

  return isOnline;
};
