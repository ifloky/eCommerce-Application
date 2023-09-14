export interface ValuePrices {
  type: string,
  currencyCode: string,
  centAmount: number,
  fractionDigits: number,
}
interface ValueForDiscounted {
  value: ValuePrices,
}

export interface Prices {
  value: ValuePrices,
  key: string,
  discounted?: ValueForDiscounted,
}

export interface TypeIdAndId {
  typeId: string,
  id: string,
}
interface ImageDimensions {
  w: number,
  h: number,
}
interface Image {
  url: string,
  dimensions: ImageDimensions,
}
export interface ThreeLanguages {
  'en-US': string,
  ru: string,
  'be-BY': string,
}
export interface MasterVariant {
  id: number,
  sku: string,
  key: string,
  prices: Prices[],
  images: Image[],
}
interface Current {
  name: ThreeLanguages,
  description: ThreeLanguages,
  categories: TypeIdAndId[],
  slug: ThreeLanguages,
  metaTitle: ThreeLanguages,
  metaDescription: ThreeLanguages,
  masterVariant: MasterVariant,

}
interface MasterData {
  current: Current
}

export interface Product {
  id: string,
  masterData: MasterData,
}

export interface ProductResult {
  results: Product[];
}


export interface ProductDetail {
  id: string;
  masterData: {
    current: {
      metaTitle: { [key: string]: string };
      description: { [key: string]: string };
      masterVariant: {
        images: [
          {
            url: ''
          },
        ];
        prices: {
          value: {
            centAmount: number;
          };
          discounted: {
            value: {
              centAmount: number;
            };
          };
        }[];
      };
    };
  };
}
