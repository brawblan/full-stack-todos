import { FileRoute, redirect } from '@tanstack/react-router';

export const Route = new FileRoute('/').createRoute({
  beforeLoad: async ({ context }) => {
    if (context.auth.getState().status === 'loggedOut') {
      throw redirect({
        replace: true,
        to: '/signin',
      });
    }

    return {
      context,
    };
  },
});