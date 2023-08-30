import { fetchBearerToken, DEVELOP_ID, DEVELOP_SECRET } from "../../shared/API";

import { MasterVariant, Product, ThreeLanguages, TypeIdAndId } from "../../types/interfaces/Product";

const getAllProductsInfo = async(): Promise<Product[]> => {
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
   catalogCategories.innerHTML = `<a class="catalog-item-title catalog-item-title-tomato" href="/tomatoCorn">Tomato, corn, broccoli, coliflower</a>
   <a class="catalog-item-title catalog-item-title-pumpkin" href="/otherSeeds">Other seeds</a>`;

   catalogWrapper.append(catalogCategories);

   return catalogWrapper;
}

const productsResult: Product[] = [];

function receiveName(item: Product): ThreeLanguages {
   const name: ThreeLanguages = {
         'en-US': `${item.masterData.current.name['en-US']}`,
         ru: `${item.masterData.current.name.ru}`,
         'be-BY': `${item.masterData.current.name['be-BY']}`,
   }
   return name;;
}

function receiveDescription(item: Product): ThreeLanguages {
   const description: ThreeLanguages = {
      'en-US': `${item.masterData.current.description['en-US']}`,
      ru: `${item.masterData.current.description.ru}`,
      'be-BY': `${item.masterData.current.description['be-BY']}`,
   }
   return description;
}

function receiveCategories(item: Product): TypeIdAndId[] {
   const categories: TypeIdAndId[] = [
      {
         typeId: `${item.masterData.current.categories[0].typeId}`,
         id: `${item.masterData.current.categories[0].id}`,
      },
   ]
   return categories;
}

function receiveSlug(item: Product): ThreeLanguages {
   const slug: ThreeLanguages = {
      'en-US': `${item.masterData.current.slug['en-US']}`,
      ru: `${item.masterData.current.slug.ru}`,
      'be-BY': `${item.masterData.current.slug['be-BY']}`,
   }
   return slug;
}

function receiveMetaTitle(item: Product): ThreeLanguages {
   const metaTitle: ThreeLanguages = {
      'en-US': `${item.masterData.current.metaTitle['en-US']}`,
      ru: `${item.masterData.current.metaTitle.ru}`,
      'be-BY': `${item.masterData.current.metaTitle['be-BY']}`,
   }
   return metaTitle;
}

function receiveMetaDescription(item: Product): ThreeLanguages {
   const metaDescription: ThreeLanguages = {
      'en-US': `${item.masterData.current.metaDescription['en-US']}`,
      ru: `${item.masterData.current.metaDescription.ru}`,
      'be-BY': `${item.masterData.current.metaDescription['be-BY']}`,
   }
   return metaDescription;
}

function receiveMasterVariant(item: Product): MasterVariant {
   const masterVariant: MasterVariant = {
      id: item.masterData.current.masterVariant.id,
      sku: `${item.masterData.current.masterVariant.sku}`,
      key: `${item.masterData.current.masterVariant.key}`,
      prices: item.masterData.current.masterVariant.prices,
      images: [
         {
            url: `${item.masterData.current.masterVariant.images[0].url}`,
            dimensions: item.masterData.current.masterVariant.images[0].dimensions,
         },
         {
            url: `${item.masterData.current.masterVariant.images[1].url}`,
            dimensions: item.masterData.current.masterVariant.images[1].dimensions,
         },
         {
            url: `${item.masterData.current.masterVariant.images[2].url}`,
            dimensions: item.masterData.current.masterVariant.images[2].dimensions,
         },
      ]
   }
   return masterVariant;
}

async function processProducts(): Promise<void> {
   const allProducts = await getAllProductsInfo();
   allProducts.forEach(item => {
      const oneProduct: Product = {
         id: item.id,
         masterData: {
            current: {
               name: receiveName(item),
               description: receiveDescription(item),
               categories: receiveCategories(item),
               slug: receiveSlug(item),
               metaTitle: receiveMetaTitle(item),
               metaDescription: receiveMetaDescription(item),
               masterVariant: receiveMasterVariant(item),
            },
         }
      };
      // console.log(oneProduct);
      productsResult.push(oneProduct);
   });
  }

processProducts();


