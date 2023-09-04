/* eslint-disable max-lines-per-function */
import { getAnonymousFlow } from "../../shared/API";
import { MasterVariant, Product, ThreeLanguages, TypeIdAndId, Prices, ValuePrices, ProductResult } from "../../types/interfaces/Product";
import { createElement } from "../../utils/abstract";
import { priceWithDiscount } from "../../widgets/cardProduct/cardProductView";
import { paginationView } from "./components/pagination";

const getAllProductsInfo = async (): Promise<ProductResult> => {
  return getAnonymousFlow('/products');
};

export function catalogRender(): HTMLElement {
  const catalogWrapper: HTMLDivElement = createElement('div', ['catalog__wrapper']);
  const catalogWrapperTitle: HTMLElement = createElement('h2', ['catalog__wrapper-title']);
  catalogWrapperTitle.innerHTML = `Our seeds catalog`;
  catalogWrapper.append(catalogWrapperTitle);

  const catalogCategories: HTMLDivElement = createElement('div', ['catalog__wrapper-categories']);
  catalogCategories.classList.add();
  catalogCategories.innerHTML = `<a class="catalog__item-title catalog__item-title-tomato" href="/tomato">Tomato</a>
  <a class="catalog__item-title catalog__item-title-pumpkin" href="/otherSeeds">Other seeds</a>`;
  catalogWrapper.append(catalogCategories);

  return catalogWrapper;
}

async function receiveName(item: Product): Promise<ThreeLanguages>{
  const name: ThreeLanguages = {
    'en-US': `${item.masterData.current.name['en-US']}`,
    'ru': `${item.masterData.current.name.ru}`,
    'be-BY': `${item.masterData.current.name['be-BY']}`,
  }
  return name;
}

async function receiveDescription(item: Product): Promise<ThreeLanguages> {
  const description: ThreeLanguages = {
    'en-US': `${item.masterData.current.description['en-US']}`,
    'ru': `${item.masterData.current.description.ru}`,
    'be-BY': `${item.masterData.current.description['be-BY']}`,
  }
  return description;
}

async function receiveCategories(item: Product): Promise<TypeIdAndId[]> {
  const categories: TypeIdAndId[] = [
    {
      typeId: `${item.masterData.current.categories[0].typeId}`,
      id: `${item.masterData.current.categories[0].id}`,
    },
  ]
  return categories;
}

async function receiveSlug(item: Product): Promise<ThreeLanguages> {
  const slug: ThreeLanguages = {
    'en-US': `${item.masterData.current.slug['en-US']}`,
    'ru': `${item.masterData.current.slug.ru}`,
    'be-BY': `${item.masterData.current.slug['be-BY']}`,

  }
  return slug;
}

async function receiveMetaTitle(item: Product): Promise<ThreeLanguages> {
  const metaTitle: ThreeLanguages = {
    'en-US': `${item.masterData.current.metaTitle['en-US']}`,
    'ru': `${item.masterData.current.metaTitle.ru}`,
    'be-BY': `${item.masterData.current.metaTitle['be-BY']}`,
  }
  return metaTitle;
}

async function receiveMetaDescription(item: Product): Promise<ThreeLanguages> {
  const metaDescription: ThreeLanguages = {
    'en-US': `${item.masterData.current.metaDescription['en-US']}`,
    'ru': `${item.masterData.current.metaDescription.ru}`,
    'be-BY': `${item.masterData.current.metaDescription['be-BY']}`,
  }
  return metaDescription;
}

async function receiveValueDiscounted(item: Product): Promise<ValuePrices> {
  const value: ValuePrices = {
    type: item.masterData.current.masterVariant.prices[0].discounted ? `${item.masterData.current.masterVariant.prices[0].discounted.value.type}` : '',
    currencyCode: item.masterData.current.masterVariant.prices[0].discounted ? `${item.masterData.current.masterVariant.prices[0].discounted.value.currencyCode}` : '',
    centAmount: item.masterData.current.masterVariant.prices[0].discounted ? item.masterData.current.masterVariant.prices[0].discounted.value.centAmount : 0,
    fractionDigits: item.masterData.current.masterVariant.prices[0].discounted ? item.masterData.current.masterVariant.prices[0].discounted.value.fractionDigits : 0,
  }
  return value;
}

async function receivePrices(item: Product): Promise<Prices[]> {
  const prices: Prices[] = [
    {
      value: {
        type: `${item.masterData.current.masterVariant.prices[0].value.type}`,
        currencyCode: `${item.masterData.current.masterVariant.prices[0].value.currencyCode}`,
        centAmount: item.masterData.current.masterVariant.prices[0].value.centAmount,
        fractionDigits: item.masterData.current.masterVariant.prices[0].value.fractionDigits,
      },
      key: `${item.masterData.current.masterVariant.prices[0].key}`,
      discounted: {
        value: await receiveValueDiscounted(item),
      },
    }
  ]
  return prices;
}

async function receiveMasterVariant(item: Product): Promise<MasterVariant> {
  const masterVariant: MasterVariant = {
    id: item.masterData.current.masterVariant.id,
    sku: `${item.masterData.current.masterVariant.sku}`,
    key: `${item.masterData.current.masterVariant.key}`,
    prices: await receivePrices(item),
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

async function createCategoryProductsList(id: string, condition: boolean): Promise<Product[]> {
  const allProductsInfo: ProductResult = await getAllProductsInfo();
  const allProducts: Product[] = allProductsInfo.results;
  const filteredProducts = allProducts.filter((item) => (item.masterData.current.categories[0].id === id) === condition);
  return filteredProducts;
}

async function createCategoryProductsItems(id: string, condition: boolean): Promise<Product[]> {
  const productsList = await createCategoryProductsList(id, condition);
  const productsResultPromises = productsList.map(async (item) => {
    const oneProduct: Product = {
      id: item.id,
      masterData: {
        current: {
          name: await receiveName(item),
          description: await receiveDescription(item),
          categories: await receiveCategories(item),
          slug: await receiveSlug(item),
          metaTitle: await receiveMetaTitle(item),
          metaDescription: await receiveMetaDescription(item),
          masterVariant: await receiveMasterVariant(item),
        },
      },
    };
    return oneProduct;
  });
  return Promise.all(productsResultPromises);
}

export async function createTomatoCategory(): Promise<Product[]> {
  return createCategoryProductsItems("530466fa-689c-4046-be63-4e6e744d4e54", true);
}

export async function createOtherVegetablesCategory(): Promise<Product[]> {
  return createCategoryProductsItems("530466fa-689c-4046-be63-4e6e744d4e54", false);
}

export async function createAllProductsCategory(): Promise<Product[]> {
  return createCategoryProductsItems("", false);
}


async function createCategoryProducts(categoryCreator: () => Promise<Product[]>): Promise<HTMLElement> {
  const allProductsCards = document.createElement('div');
  allProductsCards.classList.add('catalog__items-wrapper');

  const productsInCategory = await categoryCreator();

  await Promise.all(productsInCategory.map(async (elem) => {
    const newElem = priceWithDiscount(elem);
    allProductsCards.appendChild(newElem);
  })).then(() => {
    const appContainer = document.getElementById('app');
    appContainer?.append(paginationView(productsInCategory));
  })

  return allProductsCards;
}

export async function createTomatoCorn(): Promise<HTMLElement> {
  return createCategoryProducts(createTomatoCategory);
}

export async function createOtherSeeds(): Promise<HTMLElement> {
  return createCategoryProducts(createOtherVegetablesCategory);
}

export async function createAllProducts(): Promise<HTMLElement> {
  return createCategoryProducts(createAllProductsCategory);
}

