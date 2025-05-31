import { API_CONFIG, APIError } from './config';
import type { APIResponse } from './types';

async function handleResponse<T>(response: Response): Promise<APIResponse<T>> {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new APIError(
      data.message || 'An error occurred',
      response.status,
      data.code || 'UNKNOWN_ERROR'
    );
  }

  return {
    data,
    status: response.status,
  };
}

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const timeoutId = setTimeout(() => {
    throw new APIError('Request timeout', 408, 'TIMEOUT');
  }, API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...API_CONFIG.HEADERS,
        ...options.headers,
      },
    });
    clearTimeout(timeoutId);
    return handleResponse<T>(response);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      'Network error',
      0,
      'NETWORK_ERROR'
    );
  }
}