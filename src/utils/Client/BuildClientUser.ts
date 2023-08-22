/* eslint-disable no-console */

import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';
import SdkAuth from '@commercetools/sdk-auth';
import { BASE_URL, BASE_AUTH_URL, BASE_PROJECT_KEY, USER_ID, USER_SECRET } from '../constantsApi/constantsClients';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: BASE_AUTH_URL,
  projectKey: BASE_PROJECT_KEY,
  credentials: {
    clientId: USER_ID,
    clientSecret: USER_SECRET,
  },
  scopes: ['view_categories:bestshop-rs',
  'manage_customer_groups:bestshop-rs',
  'view_published_products:bestshop-rs',
  'manage_my_business_units:bestshop-rs',
  'manage_my_orders:bestshop-rs',
  'view_discount_codes:bestshop-rs',
  'manage_my_payments:bestshop-rs',
  'create_anonymous_token:bestshop-rs',
  'manage_my_profile:bestshop-rs',
  'manage_my_shopping_lists:bestshop-rs',
  'manage_my_quotes:bestshop-rs',
  'manage_customers:bestshop-rs',
  'manage_my_quote_requests:bestshop-rs'],
  fetch,
};

  const authClient = new SdkAuth({
  host: 'https://auth.us-central1.gcp.commercetools.com/',
  projectKey: BASE_PROJECT_KEY,
  disableRefreshToken: false,
  credentials: {
    clientId: USER_ID,
    clientSecret: USER_SECRET,
  },
  scopes: ['view_categories:bestshop-rs',
  'manage_customer_groups:bestshop-rs',
  'view_published_products:bestshop-rs',
  'manage_my_business_units:bestshop-rs',
  'manage_my_orders:bestshop-rs',
  'view_discount_codes:bestshop-rs',
  'manage_my_payments:bestshop-rs',
  'create_anonymous_token:bestshop-rs',
  'manage_my_profile:bestshop-rs',
  'manage_my_shopping_lists:bestshop-rs',
  'manage_my_quotes:bestshop-rs',
  'manage_customers:bestshop-rs',
  'manage_my_quote_requests:bestshop-rs'],

  fetch,
  });

  //  export type AuthAdmin = {
  //  access_token: string;
  //  token_type: string;
  //  expires_in: number;
  //  scope: string;
  //  };

export const token = authClient.clientCredentialsFlow()
// eslint-disable-next-line no-console
console.log(Object.keys(token));

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: BASE_URL,
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(BASE_PROJECT_KEY)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();


