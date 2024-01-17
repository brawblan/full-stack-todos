import { FileRoute, redirect } from '@tanstack/react-router';

export const Route = new FileRoute('/_auth').createRoute({
  beforeLoad: ({ context: { auth }, navigate }) => {
    if (auth.getState().isAuthenticated) {
      console.log('true');
      throw redirect({
        replace: true,
        to: '/protected/todos',
      });
    } else {
      console.log('false');
      navigate({
        replace: true,
        to: '/login',
      });
    }
  }
});
