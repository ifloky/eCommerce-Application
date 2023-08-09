//  const {
//   createClient,
//   createHttpClient,
//   createAuthForClientCredentialsFlow,
//   createAuthForPasswordFlow
// } = require ('@commercetools/sdk-client-v2')
// const { createApiBuilderFromCtpClient } = require('@commercetools/platform-sdk')

// import { createApiBuilderFromCtpClient as createApiBuilderFromCtpClientOnlyForImports } from "@commercetools/importapi-sdk";
// import 'dotenv.config';

// const fetch = require("node-fetch");

// const projectKey = process.env.CTP_PROJECT_KEY,
//      authHost = process.env.CTP_AUTH_URL;

// //use .env for credentials process.env.adminClientId

// const getClient = () => {
//   const authMiddleware = createAuthForClientCredentialsFlow({
//      host: authHost,
//   })
// };

// const getImportClient = () => {

// };

// const getStoreClient = () => {

// };

// const getMLClient = () => {};

// const getMyAPIClient = () => {

// };

// module.exports.apiRoot = createApiBuilderFromCtpClient(getClient());

// // module.exports.importApiRoot = createApiBuilderFromCtpClientOnlyForImports(
// //   getImportClient()
// // );

// // module.exports.storeApiRoot = createApiBuilderFromCtpClient(getStoreClient());

// // module.exports.myApiRoot = createApiBuilderFromCtpClient(getMyAPIClient());
// module.exports.projectKey = projectKey;