import { redirectToHomePage, redirectToRegisterPage } from '../../shared/router';
import Header from '../../widgets/header/headerView';
import { checkUser, getAllTokens } from './loginPageModel';

export const redirectToRegistrationPage = (event: Event): void => {
  const { target } = event;
  if (target instanceof HTMLButtonElement && target.type === 'button') {
    redirectToRegisterPage();
  }
};

export const loginUser = async (event: Event): Promise<void> => {
  const { target } = event;
  const isValidData = sessionStorage.getItem('isValid');
  if (isValidData) {
    if (target instanceof HTMLButtonElement && target.type === 'submit') {
      const emailField = document.getElementById('email');
      const passwordField = document.getElementById('password');
      let email = '';
      let password = '';
      if (emailField instanceof HTMLInputElement && passwordField instanceof HTMLInputElement) {
        email = emailField.value;
        password = passwordField.value;
      }
      event.preventDefault();
      getAllTokens(email, password);
      const isCorrectUserData = (await checkUser(email, password)).customer;
      if (isCorrectUserData) {
        const { id } = isCorrectUserData;
        localStorage.setItem('id', id);
        localStorage.setItem('login', 'true');
        Header.refresh(true);
        redirectToHomePage();
      }
    }
  }
  sessionStorage.removeItem('isValid');
};
