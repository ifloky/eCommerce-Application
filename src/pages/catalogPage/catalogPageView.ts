import { getAnonymousFlow } from "../../shared/API";
import { MasterVariant, Product, ThreeLanguages, TypeIdAndId, Prices, ValuePrices } from "../../types/interfaces/Product";

const getAllProductsInfo: Promise<Product[]> = getAnonymousFlow('/products?limit=25');

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

async function receiveName(item: Product): Promise<ThreeLanguages>{
  const name: ThreeLanguages = {
        'en-US': `${item.masterData.current.name['en-US']}`,
        ru: `${item.masterData.current.name.ru}`,
        'be-BY': `${item.masterData.current.name['be-BY']}`,
  }
  return name;;
}

async function receiveDescription(item: Product): Promise<ThreeLanguages> {
  const description: ThreeLanguages = {
      'en-US': `${item.masterData.current.description['en-US']}`,
      ru: `${item.masterData.current.description.ru}`,
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
      ru: `${item.masterData.current.slug.ru}`,
      'be-BY': `${item.masterData.current.slug['be-BY']}`,
  }
  return slug;
}

async function receiveMetaTitle(item: Product): Promise<ThreeLanguages> {
  const metaTitle: ThreeLanguages = {
      'en-US': `${item.masterData.current.metaTitle['en-US']}`,
      ru: `${item.masterData.current.metaTitle.ru}`,
      'be-BY': `${item.masterData.current.metaTitle['be-BY']}`,
  }
  return metaTitle;
}

async function receiveMetaDescription(item: Product): Promise<ThreeLanguages> {
  const metaDescription: ThreeLanguages = {
      'en-US': `${item.masterData.current.metaDescription['en-US']}`,
      ru: `${item.masterData.current.metaDescription.ru}`,
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

async function processProducts(): Promise<void> {
  try {
    const allProducts = await getAllProductsInfo;
    allProducts.forEach(async (item) => {
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
        }
      };
      productsResult.push(oneProduct);
    });
  } catch (error) {
    throw Error('' + error);
  }
}

processProducts();


