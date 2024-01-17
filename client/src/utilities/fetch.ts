const BASE_URL = import.meta.env.MODE !== 'development' ? import.meta.env.VITE_API_URL : 'http://localhost:1200';


interface SuccessResponse<T = any> {
  success: true;
  data: T;
}

interface ErrorResponse {
  success: false;
  message: string;
}

const getToken = (): string | null => {
  const token = sessionStorage.getItem('fullstack_todos') || null;
  return token;
};

const publicHeaders = {
  'Content-Type': 'application/json',
};

const privateHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export const GET = async <T>(endpoint: string, isProtected = false): Promise<SuccessResponse<T> | ErrorResponse> => {
  const token = getToken();

  if (isProtected && !token) throw new Error('No token found');

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: isProtected ? privateHeaders(token!) : publicHeaders,
  });
  return await response.json();
};

export const PATCH = async <T>(endpoint: string, body: T): Promise<SuccessResponse | ErrorResponse> => {
  const token = getToken();

  if (!token) throw new Error('No token found');

  return fetch(`${BASE_URL}${endpoint}`, {
    method: 'PATCH',
    headers: privateHeaders(token),
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error.message || 'An error occurred');
    });
};

export const POST = async <T>(
  endpoint: string,
  body?: T,
  isProtected = false,
): Promise<SuccessResponse | ErrorResponse> => {
  const token = getToken();

  if (isProtected && !token) throw new Error('No token found');

  try {
    const payload = {
      method: 'POST',
      headers: isProtected ? privateHeaders(token!) : publicHeaders,
    };

    if (body) {
      Object.assign(payload, { body: JSON.stringify(body) });
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, payload);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'An error occurred');
  }
};

export const PUT = async <T>(endpoint: string, body: T, isProtected = false): Promise<SuccessResponse | ErrorResponse> => {
  const token = getToken();

  if (isProtected && !token) throw new Error('No token found');

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: isProtected ? privateHeaders(token!) : publicHeaders,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Request failed');
    }
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'An error occurred');
  }
};

export const DELETE = async (endpoint: string): Promise<SuccessResponse | ErrorResponse> => {
  const token = getToken();

  if (!token) throw new Error('No token found');

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: privateHeaders(token),
  });
  return await response.json();
};
