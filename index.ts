import { createClient } from '@commercetools/sdk-client'
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'


//get access token
//https://oHXMPiqOKQvspjme2LYnfe60:fU1Fi40S0Czz-86Ilh2PwEYZJYsMGdGN@auth.us-central1.gcp.commercetools.com/oauth/token?grant_type=client_credentials


const region = 'us-central1.gcp';
const projectKey = 'bestshop-rs'; 
const BEARER_TOKEN = 'QZodKZBwQA4mxGKHCDG3bDtNlqUqOkAQ'; 
const apiUrl = `https://api.${region}.commercetools.com/${projectKey}/`;

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.us-central1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: 'oHXMPiqOKQvspjme2LYnfe60',
    clientSecret: 'fU1Fi40S0Czz-86Ilh2PwEYZJYsMGdGN',
  },
  scopes: ['manage_project:bestshop-rs manage_api_clients:bestshop-rs'],
})
const httpMiddleware = createHttpMiddleware({
  host: 'https://api.us-central1.gcp.commercetools.com',
})
const client = createClient({
  middlewares: [authMiddleware, httpMiddleware],
})

fetch(apiUrl, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${BEARER_TOKEN}`
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });