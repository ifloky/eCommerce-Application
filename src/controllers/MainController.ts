import { loadPage } from '../utils/router';
import { mainView } from '../views/mainView';
import { MainData } from '../models/Main';
import API from '../utils/API';

export async function MainController() {
  try {
    //const data: MainData = await API.get<MainData>('');
    const data: MainData = {title: 'MainPage',  description: ''}
    const content = mainView(data.title, data.description);
    loadPage(content);
  } catch (error) {
    console.error('Error fetching home data:', error);
    loadPage('Error loading data');
  }
}
