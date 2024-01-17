import { POST } from './fetch';

export const setServerSession = async (url: string) => {
  const authDataURLSearchParams = new URLSearchParams(`?${url.slice(2)}`);

  const access_token = authDataURLSearchParams.get('access_token');
  const provider_refresh_token = authDataURLSearchParams.get('provider_refresh_token');
  const provider_token = authDataURLSearchParams.get('provider_token');
  const refresh_token = authDataURLSearchParams.get('refresh_token');
  const token_type = authDataURLSearchParams.get('token_type');
  const expires_at = authDataURLSearchParams.get('expires_at');
  const expires_in = authDataURLSearchParams.get('expires_in');

  if (access_token) {
    sessionStorage.setItem('fullstack_todos', access_token);
    return await POST('/auth/authData', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({
        access_token,
        provider_refresh_token,
        provider_token,
        refresh_token,
        token_type,
        expires_at,
        expires_in
      })
    });
  }
};