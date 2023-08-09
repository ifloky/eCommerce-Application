import { MainPageController } from "./pages/mainPage/MainPageController"
import { startRouting } from "./shared/router"
import { headerController } from "./widgets/header/headerController"

export async function initializeApp(): Promise<void> {
  try {
    document.body.innerHTML = headerController()
    document.body.innerHTML += MainPageController()
    startRouting() 
  } catch (error) {
    // 'Error fetching customers:', error
  }
}



