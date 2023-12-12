const BASE_URL = import.meta.env.API_URL || import.meta.env.DEV_API_URL || 'http://localhost:1200';

interface SuccessResponse<T = any> {
  success: true;
  data: T;
}

interface ErrorResponse {
  success: false;
  message: string;
}

const getToken = async () => {
  // const token = await AsyncStorage.getItem('duckit-token');
  const token = 'token';
  return token;
};

const publicHeaders = {
  'Content-Type': 'application/json',
};

const privateHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export const GET = async <T>(endpoint: string, isProtected = false): Promise<SuccessResponse<T> | ErrorResponse> =>
  await getToken().then(async (token) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: isProtected ? privateHeaders(token) : publicHeaders,
    });
    return await response.json();
  });

export const PATCH = async <T>(endpoint: string, body: T): Promise<SuccessResponse | ErrorResponse> =>
  getToken().then((token) =>
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: privateHeaders(token),
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .catch((error) => {
        throw new Error(error.message || 'An error occurred');
      }),
  );

export const POST = async <T>(
  endpoint: string,
  body?: T,
  isProtected = false,
): Promise<SuccessResponse | ErrorResponse> => {
  const token = await getToken();
  try {
    const payload = {
      method: 'POST',
      headers: isProtected ? privateHeaders(token) : publicHeaders,
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

export const PUT = <T>(endpoint: string, body: T, isProtected = false): Promise<SuccessResponse | ErrorResponse> =>
  getToken().then((token) =>
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: isProtected ? privateHeaders(token) : publicHeaders,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          throw new Error(data.message || 'Request failed');
        }

        return data;
      })
      .catch((error) => {
        throw new Error(error.message || 'An error occurred');
      }),
  );

export const DELETE = (endpoint: string): Promise<SuccessResponse | ErrorResponse> =>
  getToken().then((token) =>
    fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: privateHeaders(token),
    }).then((response) => response.json()),
  );
