import { ctpClient, projectKey, authHost } from './BuildClient';
import {
  ApiRoot,
  Project,
  ClientResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

console.log(ApiRoot);

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(ctpClient, authHost)
  .withProjectKey({ projectKey: projectKey });


// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
export const getProject = async (): Promise<ClientResponse<Project>> => {
    const api = await apiRoot.get().execute();
    return api;
  };

  console.log(apiRoot.categories());

console.log(apiRoot.products());

console.log(apiRoot.customers().get());


  // Retrieve Project information and output the result to the log
//   getProject()
//     .then(console.log)
//     .catch(console.error);
