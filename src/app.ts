import API from './shared/API';

export async function initializeApp() {
  try {
    const customers = await API.get('/customers');
    console.log(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}