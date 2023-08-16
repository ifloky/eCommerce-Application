import 'dotenv/config';

interface FetchResponse<T> {
  ok: boolean;
  status: number;
  json(): Promise<T>;
}


const BASE_URL = process.env.BASE_URL || '';
const BEARER_TOKEN = process.env.BEARER_TOKEN || '';

type HttpMethod = 'GET' | 'POST';

const fetchWithAuthorization = async <T>(url: string, method: HttpMethod, data?: string): Promise<T> => {

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': BEARER_TOKEN,
  };

  const requestOptions: RequestInit = {
    method,
    headers,
  };

  if (data) {
    requestOptions.body = JSON.stringify(data);
  }

  const response: FetchResponse<T> = await fetch(BASE_URL + url, requestOptions);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const get = async <T>(url: string): Promise<T> => {
  return fetchWithAuthorization<T>(url, 'GET');
};

export const post = async <T>(url: string, data: string): Promise<T> => {
  return fetchWithAuthorization<T>(url, 'POST', data);
};
