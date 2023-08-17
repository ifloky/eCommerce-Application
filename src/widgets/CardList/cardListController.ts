/* eslint-disable no-console */
import { get } from '../../shared/API';
import { CardListView } from './CardListView';

export interface Product {
  key: string;
  name: string;
}

export interface ProductItems {
  results: Product[];
}

export async function cardListController(): Promise<string> {
  try {
    const prodItems: ProductItems = await get('/products');
    const productListView = CardListView(prodItems.results);
    return productListView;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
}