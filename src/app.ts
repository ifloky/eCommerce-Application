// import { get } from './shared/API';
import { showHidePassword, receiveInfoAfterSubmit, registrationFeildsInfo } from './pages/registrationPage/RegistrationController';
import { RegistrationPageView, createRegistrationFields} from './pages/registrationPage/registrationView';
import { startRouting } from './shared/router';
// import { createCustomer} from './utils/Client/ClientUser';

export async function initializeApp(): Promise<void> {
  try {
    createRegistrationFields(registrationFeildsInfo);
    RegistrationPageView()
    showHidePassword()
    receiveInfoAfterSubmit()
    // createCustomer(registrationInfo)
    startRouting()
  } catch (error) {
    // console.error('Error fetching customers:', error);
  }
}



