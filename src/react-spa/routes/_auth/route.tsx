import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ location, context }) => {
    console.debug('Checking auth');

    const { user } = await context.waitForAuth();

    if (!user) {
      console.debug('Not authenticated - redirecting to homepage');
      localStorage.setItem('auth_redirect', location.href);
      throw redirect({
        to: '/',
        search: {
          redirect: location.href,
        },
      });
    }
    console.log('User authenticated');
  },
  component: () => <Outlet />,
});