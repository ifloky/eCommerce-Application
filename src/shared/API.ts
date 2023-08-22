import 'dotenv/config';

const BASE_URL = process.env.BASE_URL || "";
const BASE_PROJECT_KEY = process.env.BASE_PROJECT_KEY || "";
let BEARER_TOKEN = process.env.BEARER_TOKEN || "";
const DEVELOP_SECRET = process.env.DEVELOP_SECRET || "";
const DEVELOP_ID = process.env.DEVELOP_ID || "";

type HttpMethod = 'GET' | 'POST';

const fetchBearerToken = async (clientId: string, clientSecret: string): Promise<string> => {
  const tokenUrl = 'https://auth.us-central1.gcp.commercetools.com/oauth/token';
  const body = new URLSearchParams({
    'grant_type': 'client_credentials'
  });

  const headers: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
  };

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers,
    body,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch bearer token');
  }

  const data = await response.json();
  BEARER_TOKEN = data.access_token; 
  return data.access_token;
};

const fetchWithAuthorization = async <T>(
  url: string,
  method: HttpMethod,
  data?: object
): Promise<T> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${BEARER_TOKEN}`,
  };

  const requestOptions: RequestInit = {
    method,
    headers,
  };

  if (data) {
    requestOptions.body = JSON.stringify(data);
  }
  const response: Response = await fetch(BASE_URL + '/' + BASE_PROJECT_KEY + url, requestOptions);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};


function setCookie(name: string, value: string, expiresInHours: number): void {
  const expires = new Date(Date.now() + expiresInHours * 3600000).toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; secure; sameSite=strict`;
}

function deleteCookie(name: string): void {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export const fetchAndSetBearerToken = async (): Promise<void> => {
  try {
    const token = await fetchBearerToken(DEVELOP_ID, DEVELOP_SECRET);
    BEARER_TOKEN = token;
    setCookie('token', token, 24);    
  } catch (error) {
    deleteCookie('token');
    throw new Error('' + error);
  }
};

export const get = async <T>(url: string): Promise<T> => {
  await fetchAndSetBearerToken();
  return fetchWithAuthorization<T>(url, 'GET');
};


export const post = async <T>(url: string, data: object): Promise<T> => {
  await fetchAndSetBearerToken();
  return fetchWithAuthorization<T>(url, 'POST', data);
};


