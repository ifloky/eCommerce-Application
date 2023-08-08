import { get } from './shared/API';
import { startRouting } from './shared/router';
import { final } from './pages/registrationPage/registrationView';
export async function initializeApp(): Promise<void> {
  try {
    const customers = await get('/customers');
    document.body.innerText += customers
    startRouting()
  } catch (error) {
    // console.error('Error fetching customers:', error);
  }
}
final.render();


