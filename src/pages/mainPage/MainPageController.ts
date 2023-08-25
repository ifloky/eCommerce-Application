import { mainPageView } from './mainPageView';

export async function MainPageController(): Promise<string> {
  try {
    return mainPageView("Title", "Description"); 
  } catch (error) {
    throw new Error(`Error in MainPageController:`+ error);
  }
}