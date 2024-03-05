import { AuthData } from '../types/Auth';
import { POST } from './fetch';
import { useAuthStore } from '../store/auth';

export const setServerSession = async (urlOrObject: string | Partial<AuthData>) => {
  let body: AuthData;

  if (typeof urlOrObject === 'string') {
    body = getDataFromURL(urlOrObject);
  } else {
    body = urlOrObject as AuthData;
  }

  if (body.access_token) {
    sessionStorage.setItem('fullstack_todos', body.access_token);
    useAuthStore.getState().authBtn = 'Logout';

    return await POST('/auth/authData', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${body.access_token}`
      },
      body: JSON.stringify(body),
    });
  }
};

const getDataFromURL = (url: string): AuthData => {
  const newURL = new URL(url);
  const authDataString = newURL.hash ? newURL.hash.slice(1) : newURL.search.slice(1);
  const authDataURLSearchParams = new URLSearchParams(authDataString);

  const access_token = authDataURLSearchParams.get('access_token') ?? '';
  const provider_refresh_token = authDataURLSearchParams.get('provider_refresh_token') ?? '';
  const provider_token = authDataURLSearchParams.get('provider_token') ?? '';
  const refresh_token = authDataURLSearchParams.get('refresh_token') ?? '';
  const token_type = authDataURLSearchParams.get('token_type') ?? '';
  const expires_at = authDataURLSearchParams.get('expires_at') ?? '';
  const expires_in = authDataURLSearchParams.get('expires_in') ?? '';

  const body = {
    access_token,
    provider_refresh_token,
    provider_token,
    refresh_token,
    token_type,
    expires_at,
    expires_in
  };

  return body;
};
