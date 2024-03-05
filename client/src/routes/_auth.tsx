import { FileRoute, redirect } from '@tanstack/react-router';
import { checkIsAuthenticated } from '../utilities/user';

export const Route = new FileRoute('/_auth').createRoute({
  beforeLoad: async ({ navigate }) => {
    const isAuthenticated = await checkIsAuthenticated();

    if (isAuthenticated) {
      throw redirect({
        replace: true,
        to: '/todos',
      });
    } else {
      navigate({
        replace: true,
        to: '/login',
      });
    }
  }
});
