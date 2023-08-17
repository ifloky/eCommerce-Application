import 'dotenv/config'

export const BASE_URL = process.env.BASE_URL || '';
export const BEARER_TOKEN = process.env.BEARER_TOKEN || '';
export const BASE_CLIENT_SECRET = process.env.CTP_CLIENT_SECRET || '';
export const BASE_PROJECT_KEY = process.env.CTP_PROJECT_KEY || '';
export const BASE_API_URL = 'https://api.us-central1.gcp.commercetools.com' || '';
export const BASE_AUTH_URL = 'https://auth.us-central1.gcp.commercetools.com' || '';

