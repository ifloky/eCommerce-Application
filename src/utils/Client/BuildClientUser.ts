
import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';
// import SdkAuth from '@commercetools/sdk-auth';
import { BASE_URL, BASE_AUTH_URL, BASE_PROJECT_KEY, USER_ID, USER_SECRET } from '../constantsApi/constantsClients';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: BASE_AUTH_URL,
  projectKey: BASE_PROJECT_KEY,
  credentials: {
    clientId: USER_ID,
    clientSecret: USER_SECRET,
  },
  scopes: ['view_project_settings:bestshop-rs', 'view_cart_discounts:bestshop-rs', 'view_staged_quotes:bestshop-rs', 'view_quotes:bestshop-rs', 'view_published_products:bestshop-rs', 'view_states:bestshop-rs view_stores:bestshop-rs', 'view_shopping_lists:bestshop-rs', 'view_connectors:bestshop-rs', 'view_customers:bestshop-rs', 'view_associate_roles:bestshop-rs', 'view_payments:bestshop-rs', 'view_categories:bestshop-rs', 'view_attribute_groups:bestshop-rs', 'view_import_containers:bestshop-rs', 'view_types:bestshop-rs', 'view_standalone_prices:bestshop-rs', 'view_products:bestshop-rs', 'view_quote_requests:bestshop-rs', 'view_shipping_methods:bestshop-rs', 'view_customer_groups:bestshop-rs', 'view_messages:bestshop-rs', 'view_audit_log:bestshop-rs', 'view_business_units:bestshop-rs', 'view_product_selections:bestshop-rs', 'view_orders:bestshop-rs', 'view_key_value_documents:bestshop-rs', 'view_tax_categories:bestshop-rs', 'view_discount_codes:bestshop-rs', 'view_order_edits:bestshop-rs', 'view_connectors_deployments:bestshop-rs',],

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


