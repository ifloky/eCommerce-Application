import { MainPageController } from "./pages/mainPage/MainPageController"
import { getCookie } from "./shared/API";
import { startRouting } from "./shared/router";
import Header from "./widgets/header/headerView";


export async function initializeApp(): Promise<void> {
  try {
    const headerContainer = document.createElement('div');
    headerContainer.className = "header__wrapper";
    document.body.append(headerContainer);
    const access = getCookie('access_token');
    const shouldRender = !!access;
    Header.render(shouldRender);
    const appContainer = document.createElement('div');
    appContainer.id = "app";
    document.body.append(appContainer);

    const savedState = localStorage.getItem('appState');
    if (!savedState) {
      appContainer.innerHTML += MainPageController();
    }
    startRouting();
  } catch (error) {
    throw new Error();
  }
}