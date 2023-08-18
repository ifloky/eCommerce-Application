// import { get } from '../../shared/API';
// import { CardListView } from './CardListView';

// export interface Product {
//   key: string;
//   name: string;
// }

// export interface ProductItems {
//   results: Product[];
// }

// export async function cardListController(): Promise<string> {
//   try {
//     const prodItems: ProductItems = await get('/products');
//     const productListView = CardListView(prodItems.results);
//     return productListView;
//   } catch (error) {
//     const errorMessage = (error as Error).message || 'i dont know';
//     throw new Error(`Error in MainPageController: ${errorMessage}`);
//   }
// }
