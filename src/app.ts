import {get, post} from './shared/API';
import { startRouting } from './shared/router';

export async function initializeApp() {
  try {
    const customers = await get('/customers');
    console.log(customers);
    startRouting()
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}

