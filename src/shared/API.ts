
const fetchWithAuthorization = async (url: string, method: string, data?: any): Promise<any> => {
  const BASE_URL =  process.env.BASE_URL || '';
  const BEARER_TOKEN = process.env.BEARER_TOKEN || '';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': BEARER_TOKEN
  };

  const requestOptions: RequestInit = {
    method,
    headers,
  };

  if (data) {
    requestOptions.body = JSON.stringify(data);
  }

  const response = await fetch(BASE_URL, requestOptions);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};


export const get = async <T>(url: string): Promise<T> => {
  const fullUrl = process.env.BASE_URL + url;
  return fetchWithAuthorization(fullUrl, 'GET');
};

export const post = async <T>(url: string, data: any): Promise<T> => {
  const fullUrl = process.env.BASE_URL + url;
  return fetchWithAuthorization(fullUrl, 'POST', data);
};