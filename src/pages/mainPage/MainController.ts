import { mainView } from '../views/mainView';
import { MainData } from '../models/Main';
import API from '../../shared/API';

interface CustomerData {
  results: { email: string }[];
}

export async function MainController() {
  try {
    const data: MainData = { title: 'MainPage', description: '' }
    const content = mainView(data.title, data.description);

    let button = document.querySelector('#button');
    if (button) {
      document.addEventListener('click', async () => {
        try {
          const response = await API.get<CustomerData>('/customers');
          const email = response.results[0].email;
          console.log('First email:', email);
        } catch (error) {
          console.error('Error fetching customer data:', error);
        }
      })
    }
  } catch (error) {
    console.error('Error fetching home data:', error);
  }
}
