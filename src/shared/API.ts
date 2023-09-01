import 'dotenv/config';
import { createElement } from '../utils/abstract';

const BASE_URL = process.env.BASE_URL || "";
const BASE_PROJECT_KEY = process.env.BASE_PROJECT_KEY || "";
let BEARER_TOKEN = process.env.BEARER_TOKEN || "";

const DEVELOP_SECRET = process.env.DEVELOP_SECRET || "";
const DEVELOP_ID = process.env.DEVELOP_ID || "";


type HttpMethod = 'GET' | 'POST';

export const fetchBearerToken = async (clientId: string, clientSecret: string): Promise<string> => {
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
    const errorMessage = createElement('div', ['error'])
    errorMessage.innerHTML = 'hey dude, check your input';
    document.body.appendChild(errorMessage)

    setTimeout(() => {
      document.body.removeChild(errorMessage)
    }, 3000);
  }

  return response.json();
};


export function setCookie(name: string, value: string, expiresInHours: number): void {
  const expires = new Date(Date.now() + expiresInHours * 3600000).toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; secure; sameSite=strict`;
}

export function getCookie(name: string): string {
  const decodedName = decodeURIComponent(name);
  const cookies = document.cookie.split('; ');

  const matchingCookie = cookies.find(cookie => {
    const [cookieName] = cookie.split('=');
    return cookieName === decodedName;
  });

  if (matchingCookie) {
    const [, cookieValue] = matchingCookie.split('=');
    return decodeURIComponent(cookieValue);
  }

  return '';
}

export function deleteCookie(name: string): void {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

const fetchAndSetBearerToken = async (): Promise<void> => {
  try {
    const token = await fetchBearerToken(DEVELOP_ID, DEVELOP_SECRET);
    BEARER_TOKEN = token;
    setCookie('token', token, 24);    
  } catch (error) {
    deleteCookie('token');
    throw new Error('' + error);
  }
};

const fetchAndSetPasswordFlow = async (): Promise<void> => {
  try {
    const token = getCookie('access_token')
    BEARER_TOKEN = token;
  } catch (error) {
    deleteCookie('access_token');
    throw new Error('' + error);
  }
};

export const getAnonymousFlow = async <T>(url: string): Promise<T> => {
  await fetchAndSetBearerToken();
  return fetchWithAuthorization<T>(url, 'GET');
};

export const postAnonymousFlow = async <T>(url: string, data: object): Promise<T> => {
  await fetchAndSetBearerToken();
  return fetchWithAuthorization<T>(url, 'POST', data);
};


export const getPasswordFlow = async <T>(url: string): Promise<T> => {
  await fetchAndSetPasswordFlow();
  return fetchWithAuthorization<T>(url, 'GET');
};

export const postPasswordFlow = async <T>(url: string, data: object): Promise<T> => {
  await fetchAndSetPasswordFlow();
  return fetchWithAuthorization<T>(url, 'POST', data);
};

