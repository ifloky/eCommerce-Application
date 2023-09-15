/* eslint-disable no-console */
import { getAnonymousFlow } from '../../shared/API';
import { Product } from '../../types/interfaces/Product';

type Category = {
  ancestors?: string[];
  assets?: string[];
  createdAt: string;
  createdBy: {
    isPlatformClient: boolean;
    user: {
      id: string;
      typeId: string;
    };
  };
  description: Record<string, string>;
  externalId: string;
  id: string;
  key: string;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: true;
    user: {
      id: string;
      typeId: string;
    };
  };
  metaDescription: Record<string, string>;
  metaTitle: Record<string, string>;
  name: Record<string, string>;
  orderHint: string;
  slug: Record<string, string>;
  parent: {
    typeId: string;
    id: string;
  };
  version: number;
  versionModifiedAt: string;
};

type responseTypeProduct = {
  count: number;
  limit: number;
  offset: number;
  total: number;
  results: Product[];
};

type responseTypeCategory = {
  count: number;
  limit: number;
  offset: number;
  total: number;
  results: Category[];
};

type CategoryData = {
  categoryName: string;
  id: string;
};

export const LIMIT = 3;

export const getAllProducts = async (offset = 0): Promise<responseTypeProduct> => {
  const path = `/products?limit=${LIMIT}&offset=${offset}`;
  const response: responseTypeProduct = await getAnonymousFlow(path);
  sessionStorage.setItem('productCount', `${response.total}`);
  return response;
};

const getAllCategories = async (): Promise<responseTypeCategory> => getAnonymousFlow('/categories');

export const getCategoriesData = async (): Promise<CategoryData[]> => {
  const data = await getAllCategories();
  const categories: Category[] = data.results;
  const categoriesData: CategoryData[] = [];
  categories.forEach((category) => {
    if (!category.parent) {
      const { name, id } = category;
      const categoryName = name['en-US'];
      categoriesData.push({ categoryName, id });
    }
  });
  return categoriesData;
};

export const getProductCategory = async (id: string): Promise<void> => {
  const response: responseTypeProduct = await getAnonymousFlow(
    `/product-projections/search?filter=categories.id:"${id}"`,
  );
  const productsOfSelectedCategory = response.results;
  console.log(productsOfSelectedCategory);
};
