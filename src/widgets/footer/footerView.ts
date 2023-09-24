import { createElement } from '../../utils/abstract';

const createFooterElement = (): HTMLElement => createElement('footer', ['footer']);

const createAuthorsElement = (): HTMLDivElement => {
  const element = createElement('div', ['footer__authors']);
  const title = createElement('span', ['footer__title'], 'Our dream team:');
  const linkTeamLead = createElement('a', ['footer__link'], 'Maksim Petrenko (Team Lead)');
  linkTeamLead.setAttribute('href', 'https://github.com/ifloky');
  const developerVictor = createElement('a', ['footer__link'], 'Viktar Brutsis');
  developerVictor.setAttribute('href', 'https://github.com/viktarbrutsis');
  const developerKiryl = createElement('a', ['footer__link'], 'Kiryl Panamarou');
  developerKiryl.setAttribute('href', 'https://github.com/panakir');
  element.append(title, linkTeamLead, developerVictor, developerKiryl);
  return element;
};

const createLogoBlock = (): HTMLDivElement => {
  const logoBlock = createElement('div', ['footer__logo']);
  const link = createElement('a', ['footer__link']);
  link.setAttribute('href', 'https://rs.school/');
  const logo = createElement('img', ['footer__logo-image']);
  logo.setAttribute('src', 'assets/rs_school_js212047cfd6bf59b808257.svg');
  link.append(logo);
  logoBlock.append(link);
  return logoBlock;
};

const generateFooterView = (): HTMLElement => {
  const footer = createFooterElement();
  const wrapper = createElement('div', ['footer__wrapper']);
  const authors = createAuthorsElement();
  const year = createElement('p', ['footer__text'], '2023');
  const logo = createLogoBlock();
  wrapper.append(authors, year, logo);
  footer.append(wrapper);
  return footer;
};

export const getFooterView = generateFooterView();
