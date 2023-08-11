import { MainPageController } from "./pages/mainPage/MainPageController"
import { startRouting } from "./shared/router";
import Header from "./widgets/Header/headerController";


export async function initializeApp(): Promise<void> {
  try {
    const appContainer = document.createElement('div');
    appContainer.id = "app";
    document.body.append(appContainer);
    Header.render();    
    appContainer.innerHTML += MainPageController();
    startRouting()
  } catch (error) {
    throw new Error();
  }
}



