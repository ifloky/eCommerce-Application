import { mainPageView } from './mainPageView';

export async function MainPageController(): Promise<HTMLElement> {
  try {
    return mainPageView('Hello, dear customer', 'Welcome to our store');
  } catch (error) {
    throw new Error(`Error in MainPageController:` + error);
  }
}
