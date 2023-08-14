import { MainPageController } from "./pages/mainPage/MainPageController"
import { startRouting } from "./shared/router";
import Header from "./widgets/Header/headerController";


export async function initializeApp(): Promise<void> {
  try {
    const headerContainer = document.createElement('div');
    headerContainer.className = "header__wrapper";
    document.body.append(headerContainer);
    Header.render();  
    const appContainer = document.createElement('div');
    appContainer.id = "app";
    document.body.append(appContainer);
    appContainer.innerHTML += MainPageController();
    startRouting()
  } catch (error) {
    throw new Error();
  }
}



