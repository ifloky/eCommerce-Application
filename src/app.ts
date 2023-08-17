import { MainPageController } from "./pages/mainPage/MainPageController"
import { startRouting } from "./shared/router";
import { cardListController } from "./widgets/CardList/cardListController";
import Header from "./widgets/header/headerController";


export async function initializeApp(): Promise<void> {
  try {
    const headerContainer = document.createElement('div');
    headerContainer.className = "header__wrapper";
    document.body.append(headerContainer);
    Header.render();
    const appContainer = document.createElement('div');
    appContainer.id = "app";
    document.body.append(appContainer);


    const savedState = localStorage.getItem('appState');
    if (!savedState) {
      appContainer.innerHTML += MainPageController();
    }

    startRouting();
    cardListController()
  } catch (error) {
    throw new Error();
  }
}