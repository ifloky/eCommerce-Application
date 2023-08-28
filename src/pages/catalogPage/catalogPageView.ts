/* eslint-disable no-console */

import { fetchBearerToken, DEVELOP_ID, DEVELOP_SECRET } from "../../shared/API";

const getAllProductsInfo = async(): Promise<string> => {
   const response = await fetch('https://api.us-central1.gcp.commercetools.com/bestshop-rs/products?limit=25', {
      method: 'GET',
      headers: {
         'Authorization': `Bearer ${await fetchBearerToken(DEVELOP_ID, DEVELOP_SECRET)}`,
         'Content-Type': 'application/json',
      },
   });

   if (!response.ok) {
      throw new Error('Failed to get products info');
   }

    const data = await response.json();
    return data.results;
}

export const catalogRender = async(): Promise<void> => {
   // eslint-disable-next-line no-console

}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const allProducts = getAllProductsInfo();
const allId: string[] = [];

Array(allProducts).forEach(item => {
   // eslint-disable-next-line no-restricted-syntax
   for (const key of Object.keys(item)) {
      if (key === 'id') {
         allId.push(item[key]);
      }
   }
})


// eslint-disable-next-line no-console
console.log(Array(allId));
// eslint-disable-next-line no-console
