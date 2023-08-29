
import { fetchBearerToken, DEVELOP_ID, DEVELOP_SECRET } from "../../shared/API";
// import { createElement } from "../../utils/abstract";



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

export function catalogRender(): HTMLElement {
   const catalogWrapper: HTMLDivElement = document.createElement('div');
   const catalogWrapperTitle: HTMLElement = document.createElement('h2');
   catalogWrapperTitle.classList.add('catalog-wrapper-title');
   catalogWrapperTitle.innerHTML = `Our seeds catalog`;
   catalogWrapper.append(catalogWrapperTitle);
   catalogWrapper.classList.add('catalog-wrapper');

   const catalogCategories: HTMLDivElement = document.createElement('div',);
   catalogCategories.classList.add('catalog-wrapper-categories');
   catalogCategories.innerHTML = `<div class="catalog-wrapper-categories-item"><h3 class="catalog-item-title">Tomato, corn, broccoli, coliflower</h3></div>
   <div class="catalog-wrapper-categories-item"><h3 class="catalog-item-title">Other seeds</h3></div>`;

   catalogWrapper.append(catalogCategories);
   return catalogWrapper;
}
// eslint-disable-next-line no-console
const allProducts = getAllProductsInfo();
const allId: string[] = [];

Array(allProducts).forEach(item  => {
   // eslint-disable-next-line no-restricted-syntax
   for (const key of Object.keys(item)) {
      if (key === 'id') {
         allId.push(item[key]);
      }
   }
})
// eslint-disable-next-line no-console
console.log(Array(allId));
