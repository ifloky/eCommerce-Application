import { MainPageController } from "./pages/mainPage/MainPageController"

export async function initializeApp(): Promise<void> {
  try {
    MainPageController()
  } catch (error) {
    throw new Error();
  }
}



