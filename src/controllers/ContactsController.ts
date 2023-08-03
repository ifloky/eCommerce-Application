import { loadPage } from '../utils/router';
import { contactsView } from '../views/contactsView';
import { ContactsData } from '../models/Contancts';
import API from '../utils/API';

export function ContactsController() {
  const pageTitle = 'Contacts';
  const content = contactsView(pageTitle);
  loadPage(content);
}

import { mainView } from '../views/mainView';


export async function MainController() {
  try {
    //const data: MainData = await API.get<MainData>('');
    const data: ContactsData = { title: 'Contacts', description: 'This is the Contacts page.' }
    const content = mainView(data.title, data.description);
    loadPage(content);
  } catch (error) {
    console.error('Error fetching home data:', error);
    loadPage('Error loading data');
  }
}
