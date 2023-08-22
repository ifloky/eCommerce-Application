import fetch from 'node-fetch';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { BASE_AUTH_URL, BASE_PROJECT_KEY, DEVELOP_ID, DEVELOP_SECRET, BASE_URL } from '../constantsApi/constantsClients';

import SdkAuth from '@commercetools/sdk-auth'
import 'dotenv/config'

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: BASE_AUTH_URL,
  projectKey: BASE_PROJECT_KEY,
  credentials: {
    clientId: DEVELOP_ID,
    clientSecret: DEVELOP_SECRET,
  },
  scopes: ['manage_project:bestshop-rs', 'manage_api_clients:bestshop-rs'],
  fetch,
};

  const authClient = new SdkAuth({
  host: 'https://auth.us-central1.gcp.commercetools.com/',
  projectKey: BASE_PROJECT_KEY,
  disableRefreshToken: false,
  credentials: {
    clientId: DEVELOP_ID,
    clientSecret: DEVELOP_SECRET,
  },
  scopes: ['manage_project:bestshop-rs', 'manage_api_clients:bestshop-rs'],

  fetch,
  });

  export const tokenAdmin = authClient.clientCredentialsFlow();
  // eslint-disable-next-line no-console
  console.log(tokenAdmin);

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: BASE_URL,
  fetch,
};


// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(BASE_PROJECT_KEY) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

  //  console.log(ctpClient);

