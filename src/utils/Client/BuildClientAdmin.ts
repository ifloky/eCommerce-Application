import fetch from 'node-fetch';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { BASE_AUTH_URL, BASE_PROJECT_KEY, DEVELOP_ID, DEVELOP_SECRET, BASE_URL } from '../constantsApi/constantsClients';

//  import SdkAuth from '@commercetools/sdk-auth'
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

//  const authClient = new SdkAuth({
//  host: 'https://auth.us-central1.gcp.commercetools.com/',
//  projectKey: projectKey,
//  disableRefreshToken: false,
//  credentials: {
//    clientId: 'MnD3lYwVYb80uoQvugZvkLFY',
//    clientSecret: 'WM64L_47FMiVY1Yc-nW3aqUrIJfvmJYJ',
//  },
//  scopes: [
//    'manage_customers:tycteam manage_my_quotes:tycteam manage_product_selections:tycteam view_categories:tycteam manage_my_business_units:tycteam manage_my_profile:tycteam manage_customer_groups:tycteam manage_my_payments:tycteam manage_my_quote_requests:tycteam create_anonymous_token:tycteam manage_products:tycteam view_published_products:tycteam manage_my_shopping_lists:tycteam manage_my_orders:tycteam',
//  ],

//  fetch,
//  });

//  export const tokenAdmin = async(): Promise<TokenInfo> => authClient.clientCredentialsFlow();
//  console.log(tokenAdmin);

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

