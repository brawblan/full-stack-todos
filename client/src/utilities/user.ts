import { redirect } from '@tanstack/react-router';
import { GET } from './fetch';
import { SuccessResponse } from '../types/Response';
import { setServerSession } from './auth-data';

type UserSuccessResponse = SuccessResponse<{ user: any; }>;

export const checkIsAuthenticated = async () => {
  const user = await GET<{ user: any; }>('/auth/currentUser');
  return (user as UserSuccessResponse).data.user != null;
};

export const checkUserAndRedirect = async (redirectTo: string) => {
  const windowHref = window.location.href;
  if (windowHref.includes('access_token')) {
    await setServerSession(windowHref);
  }

  const isAuthenticated = await checkIsAuthenticated();
  if (isAuthenticated) {
    throw redirect({
      replace: true,
      to: redirectTo,
    });
  }

  throw redirect({
    replace: true,
    to: '/login',
  });
};
