import fetch from 'node-fetch';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

//  import SdkAuth from '@commercetools/sdk-auth'
import 'dotenv/config'

// export const projectKey = process.env.PROJECT_KEY || '';
// const scopes = ['process.env.SCopes'];
// const clientId = process.env.CLIENT_ID || '';
// const clientSecret = process.env.CLIENT_SECRET || '';
// export const authHost = process.env.AUTH_URL || '';
// const httpHost = process.env.API_URL || ''

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: httpHost,
  projectKey: projectKey,
  credentials: {
    clientId: clientId,
    clientSecret: clientSecret,
  },
  scopes,
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
  host: httpHost,
  fetch,
};


// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

  //  console.log(ctpClient);

