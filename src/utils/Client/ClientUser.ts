/* eslint-disable no-console */
import { CustomerRegistrationInfo } from '../../types/interfaces/interfaces';
import { ctpClient } from './BuildClientUser';

import {
  CategoryPagedQueryResponse,
  ClientResponse,
  CustomerPagedQueryResponse,
  ProductPagedQueryResponse,
  Project,
  createApiBuilderFromCtpClient,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';


import { projectKey } from './BuildClientAdmin';
// import { setImage } from '@/store/counterSlice';

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(
  ctpClient,
  'https://auth.us-central1.gcp.commercetools.com/'
).withProjectKey({
  projectKey: projectKey,
});

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
export const getProject = async (): Promise<ClientResponse<Project>> => {
  const api = await apiRoot.get().execute();
  return api;
};

// Retrieve Project information and output the result to the log
// getProject().then(console.log).catch(console.error);

console.log(apiRoot.categories());

console.log(apiRoot.products());

console.log(apiRoot.customers().get());

let image = '';

export async function getAllProducts(): Promise<ClientResponse<ProductPagedQueryResponse>> {
  try {
    const products = await apiRoot.products().get().execute();
    const url = products.body.results[0].masterData.current.variants[0].images;
    // eslint-disable-next-line no-unused-expressions
    url?.length ? (image = url[0].url) : console.log('error');
    console.log(image, '1');
    // dispatch(setImage(url));
    return products;
    // put data in store
  } catch {
    throw new Error('no products found');
  }
}

//  const customerDraftData = {
//  email: 'johndFather@example.com',
//  firstName: 'John',
//  lastName: 'Doe',
//  password: 'secret123',
//  streetName: 'Stedman St',
//  streetNumber: '10',
//  postalCode: '99901',
//  city: 'Ketchikan',
//  state: 'AK',
//  country: 'US',
//  building: '5',
//  apartment: '2346',
//  };

export async function getAllCustomers(): Promise<ClientResponse<CustomerPagedQueryResponse>> {
try {
    const customers = await apiRoot.customers().get().execute();
    console.log(customers);
    return customers;
  } catch {
    throw new Error('no customers found');
  }
}

export async function getCategories(): Promise<
  ClientResponse<CategoryPagedQueryResponse>
> {
  try {
    const categories = await apiRoot.categories().get().execute();
    const categorisArray = await categories.body.results;
    const categoryNamesArray = categorisArray.map((category) => category.name);
    const categoryNameKey = 'en-US';
    const categoryName = categoryNamesArray.map(
      (catName) => catName[categoryNameKey]
    );
    console.log(categoryName);
    return categories;
  } catch {
    throw new Error('no categories found');
  }
}

export async function createCustomer(data: CustomerRegistrationInfo): Promise<ClientResponse<CustomerSignInResult>> {
  try {
    const customer = await apiRoot
      .me()
      .signup()
      .post({
        // body: createCustomerDraft(data),
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();
    return customer;
  } catch {
    throw new Error('cannot create a customer me');
  }
}

export async function createCustomerTwo(data: CustomerRegistrationInfo): Promise<ClientResponse<CustomerSignInResult>> {
  try {
    const customer = await apiRoot
      .customers()
      .post({
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();
    return customer;
  } catch {
    throw new Error('cannot create a customer');
  }
}