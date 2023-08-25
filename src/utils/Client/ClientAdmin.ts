/* eslint-disable no-console */
import { BASE_PROJECT_KEY, BASE_AUTH_URL } from '../constantsApi/constantsClients';
import { BASE_API_URL } from '../constantsApiClient/constantsAdminClient';
import { ctpClient } from './BuildClientAdmin';
import {
  ClientResponse,
  //  CustomerSignInResult,
  ProductPagedQueryResponse,
  Project,
  createApiBuilderFromCtpClient,
  //  ProductType,
  //  Category,
} from '@commercetools/platform-sdk';

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(
  ctpClient,
  BASE_AUTH_URL
).withProjectKey({
  projectKey: BASE_PROJECT_KEY,
});

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
export const getProject = async (): Promise<ClientResponse<Project>> => {
  const api = await apiRoot.get().execute();
  return api;
};

export const productType = {
  "type": "product-type",
  "resources": [
    {
      "key": "sample",
      "name": "test_product_type",
      "description": "Test product type.",
      "attributes": [
        {
          "name": "product-ref-attribute",
          "label": {
            "en": "selling product"
          },
          "isRequired": false,
          "isSearchable": false,
          "type": {
            "name": "reference",
            "referenceTypeId": "category"
          },
          "attributeConstraint": "Unique",
          "inputTip": {
            "en": "product input tip"
          },
          "inputHint": "SingleLine"
        }
      ]
    }
  ]
}


// Retrieve Project information and output the result to the log
// getProject().then(console.log).catch(console.error);

console.log(`Here are categories ${apiRoot.productTypes}`);

export const getAllProducts = async (): Promise<ClientResponse<ProductPagedQueryResponse>> => {
  const products = await apiRoot.products().get().execute();
  // console.log(products);
  return products;
};

getProject()
  .then(console.log)
  .then(console.error);

  interface Name {
    en: string
  }
  interface Parent {
    typeId: string,
    id: string
  }

  interface Category {
    name: Name,
    slug: Name,
    parent?: Parent,
    orderHint: string
  }

  export const category = {
    "name" : {
      "en" : "Hats"
    },
    "slug" : {
      "en" : "hats"
    },
    "orderHint" : "0.1"
  };

  export const createСategory = async (data: Category): Promise<string> =>
  (
    await fetch(`${BASE_API_URL}/${BASE_PROJECT_KEY}/categories`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

  // eslint-disable-next-line no-shadow
  //  export async function importCategory(data): Promise<ClientResponse<ProductType>> {
  //  try {
  //    const prod = await apiRoot
  //    .productTypes()
  //    .post({
  //      body: data,
  //      headers: {
  //        'Content-Type': 'application/json',
  //      },
  //    })
  //    .execute();
  //    return prod;
  //  }
  //  catch {
  //    throw new Error('cannot create productType');
  //  }
  //  }
