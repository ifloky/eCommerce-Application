/* eslint-disable no-console */

import { Product } from '../../types/interfaces/Product';
import { priceWithDiscount } from '../../widgets/cardProduct/cardProductView';
import { getAllProducts, getProductCategory } from './catalogPageModel';

export const selectCategory = (event: Event): void => {
  const { target } = event;
  if (target instanceof HTMLButtonElement) {
    const id = target.getAttribute('data-id');
    if (id) {
      getProductCategory(id);
    }
  }
};

export const renderSelectedCategory = (data: Product[]): void => {
  const catalogPage = document.querySelector('.catalog__container');
  while (catalogPage?.firstChild) {
    catalogPage.firstChild.remove();
  }
  data.forEach((product) => {
    const productCard = priceWithDiscount(product);
    catalogPage?.append(productCard);
  });
};

const moveToSelectedPage = async (event: Event): Promise<void> => {
  const { target } = event;
  if (target instanceof HTMLButtonElement) {
    const allButtons = document.querySelector('.pagination__buttons')?.querySelectorAll('.button');
    allButtons?.forEach((button) => {
      button.classList.remove('active');
    });
    target.classList.add('active');
    if (target.textContent) {
      const selectedPage = +target.textContent;
      const products = (await getAllProducts((selectedPage - 1) * 3)).results;
      renderSelectedCategory(products);
    }
  }
};

export const changePage = (event: Event): void => {
  const { target } = event;
  if (target instanceof HTMLButtonElement) {
    if (target.closest('.pagination__buttons')) {
      moveToSelectedPage(event);
    }
  }
};
