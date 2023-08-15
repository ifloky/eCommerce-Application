// import { get } from './shared/API';
import { showHidePassword, receiveInfoAfterSubmit} from './pages/registrationPage/RegistrationController';
import { RegistrationPageView} from './pages/registrationPage/registrationView';
import { startRouting } from './shared/router';

export async function initializeApp(): Promise<void> {
  try {
    RegistrationPageView()
    showHidePassword()
    receiveInfoAfterSubmit()
    startRouting()
  } catch (error) {
    // console.error('Error fetching customers:', error);
  }
}



