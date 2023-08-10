// import { get } from './shared/API';
import { RegistrationPageView } from './pages/registrationPage/registrationView';
import { startRouting } from './shared/router';
export async function initializeApp(): Promise<void> {
  try {
    RegistrationPageView()
    startRouting()
  } catch (error) {
    // console.error('Error fetching customers:', error);
  }
}



