import { createElement } from '../../../utils/abstract';

const createHeaderBlock = (): HTMLDivElement => createElement('div', ['login-page__header']);

const createLogoBlock = (): HTMLDivElement => createElement('div', ['login-page__logo', 'logo']);

const createHeadingLoginPage = (): HTMLHeadingElement => {
  const heading = createElement('h2', ['login-page__title']);
  heading.textContent = 'welcome, friend! sign in';
  return heading;
};

export const generateHeaderBlock = (): HTMLDivElement => {
  const header = createHeaderBlock();
  const logo = createLogoBlock();
  const title = createHeadingLoginPage();
  header.append(logo, title);
  return header;
};
