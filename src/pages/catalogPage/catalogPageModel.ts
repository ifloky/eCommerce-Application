import { getAnonymousFlow } from '../../shared/API';
import { Category, CategoryData, responseTypeCategory, responseTypeProduct } from '../../types/interfaces/catalogPage';
import { generatePaginationForSelectedCategory, renderSelectedCategory } from './catalogPageController';

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

export const getProductCategory = async (id: string, offset = 0): Promise<responseTypeProduct> => {
  const path = `/product-projections/search?filter=categories.id:"${id}"&limit=${LIMIT}&offset=${offset}`;
  const response: responseTypeProduct = await getAnonymousFlow(path);
  const productsOfSelectedCategory = response.results;
  sessionStorage.setItem('productCount', `${response.total}`);
  if (sessionStorage.getItem('categoryId') !== id) {
    generatePaginationForSelectedCategory();
    sessionStorage.setItem('categoryId', `${id}`);
  }
  renderSelectedCategory(productsOfSelectedCategory);
  return response;
};
