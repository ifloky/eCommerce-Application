import { Product } from '../../types/interfaces/Product';
import { cardProductViewElement } from '../../widgets/cardProduct/cardProductView';
import { getAllProducts, getProductCategory } from './catalogPageModel';
import { generateAllProductsCard } from './catalogPageView';
import { generatePaginationView } from './components/pagination';

export const selectCategory = async (event: Event): Promise<void> => {
  const { target } = event;
  if (target instanceof HTMLButtonElement) {
    const parent = document.querySelector('.catalog__buttons');
    parent?.querySelectorAll('.catalog__button').forEach((button) => {
      button.classList.remove('button_active');
    });
    const id = target.getAttribute('data-id');
    if (id) {
      getProductCategory(id);
    }
    if (target.classList.contains('catalog__button_all')) {
      document.querySelector('.catalog__container')?.remove();
      document.querySelector('.pagination')?.remove();
      sessionStorage.removeItem('categoryId');
      const allProducts = await generateAllProductsCard();
      const pagination = generatePaginationView();
      document.querySelector('.catalog__wrapper')?.append(allProducts, pagination);
    }
    target.classList.add('button_active');
  }
};

export const renderSelectedCategory = (data: Product[]): void => {
  const catalogPage = document.querySelector('.catalog__container');
  while (catalogPage?.firstChild) {
    catalogPage.firstChild.remove();
  }
  data.forEach((product) => {
    const productCard = cardProductViewElement(product);
    catalogPage?.append(productCard);
  });
};

export const generatePaginationForSelectedCategory = (): void => {
  const catalogWrapper = document.querySelector('.catalog__wrapper');
  if (catalogWrapper?.querySelector('.pagination')) {
    catalogWrapper?.querySelector('.pagination')?.remove();
  }
  const pagination = generatePaginationView();
  catalogWrapper?.append(pagination);
};

const checkDisabled = (element: Element, parent: Element): void => {
  const prevButton = parent.querySelector('.button_prev');
  const nextButton = parent.querySelector('.button_next');
  const navigation = parent.querySelector('.pagination__buttons');
  if (prevButton instanceof HTMLButtonElement && nextButton instanceof HTMLButtonElement) {
    if (element === navigation?.firstChild) {
      prevButton.disabled = true;
    }
    if (element === navigation?.lastChild) {
      nextButton.disabled = true;
    }
    if (element.textContent !== navigation?.firstChild?.textContent) {
      prevButton.disabled = false;
    }
    if (element.textContent !== navigation?.lastChild?.textContent) {
      nextButton.disabled = false;
    }
  }
};

const moveToSelectedPage = async (event: Event): Promise<void> => {
  const { target } = event;
  const parent = document.querySelector('.pagination');
  if (target instanceof HTMLButtonElement && parent) {
    const allButtons = parent?.querySelectorAll('.button');
    allButtons?.forEach((button) => {
      button.classList.remove('button_active');
    });
    target.classList.add('button_active');
    if (target.textContent) {
      checkDisabled(target, parent);
      const selectedPage = +target.textContent;
      let products: Product[] = [];
      if (sessionStorage.getItem('categoryId')) {
        const id = sessionStorage.getItem('categoryId');
        if (typeof id === 'string') {
          products = (await getProductCategory(id, (selectedPage - 1) * 3)).results;
        }
      } else {
        products = (await getAllProducts((selectedPage - 1) * 3)).results;
      }
      renderSelectedCategory(products);
    }
  }
};

const moveToNextOrPrevPage = (event: Event): void => {
  const { target } = event;
  if (target instanceof HTMLButtonElement) {
    const parent = target.closest('.pagination');
    const navigation = document.querySelector('.pagination__buttons');
    const activePage = parent?.querySelector('.button_active');
    const activePageNumber = Number(activePage?.textContent);
    const prevButton = parent?.querySelector('.button_prev');
    const nextButton = parent?.querySelector('.button_next');
    let shiftNumber: number;
    if (target === prevButton) {
      shiftNumber = activePageNumber - 1;
    }
    if (target === nextButton) {
      shiftNumber = activePageNumber + 1;
    }
    navigation?.querySelectorAll('.button_nav').forEach(async (button) => {
      button.classList.remove('button_active');
      if (Number(button.textContent) === shiftNumber) {
        if (prevButton instanceof HTMLButtonElement && nextButton instanceof HTMLButtonElement && parent) {
          checkDisabled(button, parent);
        }
        button.classList.add('button_active');
        const products = (await getAllProducts((shiftNumber - 1) * 3)).results;
        renderSelectedCategory(products);
      }
    });
  }
};

export const changePage = (event: Event): void => {
  const { target } = event;
  if (target instanceof HTMLButtonElement) {
    if (target.closest('.pagination__buttons')) {
      moveToSelectedPage(event);
    }
    if (target.closest('.button_prev') || target.closest('.button_next')) {
      moveToNextOrPrevPage(event);
    }
  }
};
