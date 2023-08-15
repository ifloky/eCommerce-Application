// import { get } from './shared/API';
import { RegistrationPageView } from './pages/registrationPage/registrationView';
import { startRouting } from './shared/router';
import { showHidePassword } from './pages/registrationPage/registrationView';
export async function initializeApp(): Promise<void> {
  try {
    RegistrationPageView()
    showHidePassword()
    startRouting()
  } catch (error) {
    // console.error('Error fetching customers:', error);
  }
}



