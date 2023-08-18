
import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';
// import SdkAuth from '@commercetools/sdk-auth';
import { BASE_PROJECT_KEY } from '../constansApi/constantsClients';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://api.us-central1.gcp.commercetools.com',
  projectKey: BASE_PROJECT_KEY,
  credentials: {
    clientId: '-',
    clientSecret: '-',
  },
  scopes: [
    'manage_customers:tycteam manage_my_quotes:tycteam manage_product_selections:tycteam view_categories:tycteam manage_my_business_units:tycteam manage_my_profile:tycteam manage_customer_groups:tycteam manage_my_payments:tycteam manage_my_quote_requests:tycteam create_anonymous_token:tycteam manage_products:tycteam view_published_products:tycteam manage_my_shopping_lists:tycteam manage_my_orders:tycteam',
  ],

  fetch,
};

//  const authClient = new SdkAuth({
//  host: 'https://auth.us-central1.gcp.commercetools.com/',
//  projectKey: projectKey,
//  disableRefreshToken: false,
//  credentials: {
//    clientId: '-',
//    clientSecret: '-',
//  },
//  scopes: [
//    'manage_customers:tycteam manage_my_quotes:tycteam manage_product_selections:tycteam view_categories:tycteam manage_my_business_units:tycteam manage_my_profile:tycteam manage_customer_groups:tycteam manage_my_payments:tycteam manage_my_quote_requests:tycteam create_anonymous_token:tycteam manage_products:tycteam view_published_products:tycteam manage_my_shopping_lists:tycteam manage_my_orders:tycteam',
//  ],

//  fetch,
//  });

export type AuthAdmin = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

//  export const tokenCustomer = authClient.clientCredentialsFlow();
//  console.log(tokenCustomer);

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.us-central1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(BASE_PROJECT_KEY)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();


