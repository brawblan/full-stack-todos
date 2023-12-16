import { FileRoute, redirect } from '@tanstack/react-router';

export const Route = new FileRoute('/').createRoute({
  beforeLoad: ({ context: { auth }, navigate }) => {
    if (auth.getState().status === 'loggedIn') {
      throw redirect({
        to: '/todos',
      });
    } else {
      navigate({
        replace: true,
        to: '/signin',
      });
    }
  }
});