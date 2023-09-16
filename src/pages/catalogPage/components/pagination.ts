import { createElement } from '../../../utils/abstract';
import { LIMIT } from '../catalogPageModel';

const createButtonElement = (): HTMLButtonElement => createElement('button', ['pagination__button', 'button']);

const createNavigationButtonsBlock = (): HTMLDivElement => {
  const navigation = createElement('div', ['pagination__buttons']);
  const total = Math.ceil(Number(sessionStorage.getItem('productCount')) / LIMIT);
  for (let i = 1; i <= total; i++) {
    const button = createButtonElement();
    button.classList.add('button_nav');
    if (i === 1) {
      button.classList.add('active');
    }
    button.textContent = `${i}`;

    navigation.append(button);
  }
  return navigation;
};

const createPrevButton = (): HTMLButtonElement => {
  const prevButton = createButtonElement();
  prevButton.classList.add('button_prev');
  prevButton.disabled = true
  prevButton.textContent = '<<';
  return prevButton;
};
const createNextButton = (): HTMLButtonElement => {
  const nextButton = createButtonElement();
  nextButton.classList.add('button_next');
  nextButton.textContent = '>>';
  return nextButton;
};

const createPaginationBlock = (): HTMLDivElement => {
  const pagination = createElement('div', ['pagination']);
  return pagination;
};

export const generatePaginationView = (): HTMLDivElement => {
  const pagination = createPaginationBlock();
  const navigation = createNavigationButtonsBlock();
  const prevButton = createPrevButton();
  const nextButton = createNextButton();
  pagination.append(prevButton, navigation, nextButton);
  return pagination;
};
