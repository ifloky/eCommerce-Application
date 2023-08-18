import { mainPageView } from './mainPageView';

export async function MainPageController(): Promise<string> {
  try {
    return mainPageView("Title", "Description"); 
  } catch (error) {
    const errorMessage = (error as Error).message || 'i dont know';
    throw new Error(`Error in MainPageController: ${errorMessage}`);
  }
}