import { createElement } from '../../utils/abstract';
import { cardProductViewElement } from '../../widgets/cardProduct/cardProductView';
import { selectCategory } from './catalogPageController';
import { getAllProducts, getCategoriesData } from './catalogPageModel';
import { generatePaginationView } from './components/pagination';

const createHeadingElement = (): HTMLHeadingElement => {
  const title = createElement('h2', ['catalog__title']);
  title.textContent = 'Our catalog';
  return title;
};

const createButtonElement = (): HTMLButtonElement => {
  const button = createElement('button', ['catalog__button', 'button']);
  return button;
};

const createButtonsForCategories = async (): Promise<HTMLDivElement> => {
  const buttonsWrapper = createElement('div', ['catalog__buttons']);
  const allCategories = await getCategoriesData();
  const allCategoriesButton = createButtonElement();
  allCategoriesButton.classList.add('catalog__button_all', 'button_active');
  allCategoriesButton.textContent = 'All categories';
  buttonsWrapper.append(allCategoriesButton);
  allCategories.forEach((category) => {
    const name = category.categoryName;
    const button = createButtonElement();
    button.textContent = name;
    button.setAttribute('data-id', category.id);
    buttonsWrapper.append(button);
  });
  return buttonsWrapper;
};

export const generateAllProductsCard = async (): Promise<HTMLElement> => {
  const wrapper = createElement('div', ['catalog__container']);
  const products = (await getAllProducts()).results;
  products.forEach((product) => {
    const productCard = cardProductViewElement(product);
    wrapper.append(productCard);
  });
  return wrapper;
};

const bindEvents = (parent: HTMLElement): void => {
  const buttons = parent.querySelector('.catalog__buttons');
  buttons?.addEventListener('click', selectCategory);
};

const generateCatalogView = async (): Promise<HTMLElement> => {
  const section = createElement('section', ['catalog']);
  const sectionWrapper = createElement('div', ['catalog__wrapper']);
  const title = createHeadingElement();
  const productWrapper = await generateAllProductsCard();
  const buttonsBlock = await createButtonsForCategories();
  const pagination = generatePaginationView();
  sectionWrapper.append(title, buttonsBlock, productWrapper, pagination);
  section.append(sectionWrapper);
  bindEvents(section);
  return section;
};

export const getCatalogView = async (): Promise<HTMLElement> => generateCatalogView();
