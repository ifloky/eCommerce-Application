import { createElement } from '../../utils/abstract';
import { generateForm } from './components/form';
import { generateHeaderBlock } from './components/header';

const createLoginPage = (): HTMLElement => createElement('section', ['login-page']);

const createLoginPageWrapper = (): HTMLDivElement => createElement('div', ['login-page__wrapper']);
const createLoginPageView = (): HTMLElement => {
  const loginPage = createLoginPage();
  const wrapper = createLoginPageWrapper();
  const header = generateHeaderBlock();
  const form = generateForm();
  wrapper.append(header, form);
  loginPage.append(wrapper);
  return loginPage;
};

export const getLoginPageView = createLoginPageView();
