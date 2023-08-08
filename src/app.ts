import { MainPageController } from "./pages/mainPage/MainPageController"
import { startRouting } from "./shared/router"

export async function initializeApp(): Promise<void> {
  try {
    MainPageController()
    startRouting() 
  } catch (error) {
    // 'Error fetching customers:', error
  }
}



