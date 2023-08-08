import { LoginPageView } from './loginPageView';
import { get } from '../../shared/API';

interface CustomerData {
  results: { email: string }[];
}

export async function LoginPageController(): Promise<void> {
  try {
    document.body.innerHTML = ''
    LoginPageView();
        
    const errorDisplay = document.querySelector('#error');
    const emailDisplay = document.querySelector('#email');
    try {
      const response = await get<CustomerData>('/customers');
      const [firstResult] = response.results;
      const { email } = firstResult;
      if (emailDisplay) {
        emailDisplay.textContent = `Customer email: ${email}`;
        document.body.append(emailDisplay)
      }
    } catch (error) {
      if (errorDisplay) {
        errorDisplay.textContent = `Error fetching customer data: ${error}`;
      }
    }
  } catch (error) {
    // Handle the main controller error (if needed)
  }
}
