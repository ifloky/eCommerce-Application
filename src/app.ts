import { getFooterView } from './widgets/footer/footerView';
import { setCountProductInBasket } from './pages/basketPage/basketPageController';
import { MainPageController } from './pages/mainPage/MainPageController';
import { getCookie } from './shared/API';
import { startRouting } from './shared/router';
import Header from './widgets/header/headerView';

export async function initializeApp(): Promise<void> {
  try {
    const access = getCookie('access_token');
    const shouldRender = !!access;
    Header.render(shouldRender);
    const appContainer = document.createElement('div');
    appContainer.id = 'app';
    document.body.append(appContainer);
    document.body.append(getFooterView);
    const savedState = localStorage.getItem('appState');
    if (!savedState) {
      appContainer.innerHTML += MainPageController();
    }
    await setCountProductInBasket();
    startRouting();
  } catch (error) {
    throw new Error();
  }
}
