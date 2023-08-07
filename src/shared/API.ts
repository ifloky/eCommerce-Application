interface FetchResponse<T> {
  ok: boolean;
  status: number;
  json(): Promise<T>;
}

const BASE_URL = 'https://api.us-central1.gcp.commercetools.com/bestshop-rs';
const BEARER_TOKEN = 'Bearer zIakNzlaXZxHtEkqKOdJzDgkG5o5d4Lf';

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
