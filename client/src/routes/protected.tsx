import { FileRoute, redirect } from '@tanstack/react-router';

export const Route = new FileRoute('/protected').createRoute({
  beforeLoad: async ({ context }) => {
    const isAuthRoute = location.pathname === '/login' || location.pathname === '/create-account';
    if (!context.auth.getState().isAuthenticated && !isAuthRoute) {
      throw redirect({
        replace: true,
        to: '/login',
      });
    }

    return {
      context,
    };
  },
});