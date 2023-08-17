import { mainPageView } from './mainPageView';
import { cardListController } from '../../widgets/CardList/cardListController';

export async function MainPageController(): Promise<string> {
  try {
    const productListView = await cardListController(); 
    return mainPageView("Title", "Description", productListView); 
  } catch (error) {
    throw new Error('Error in MainPageController:');
  }
}