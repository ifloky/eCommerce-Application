import { redirectToCatalog } from '../../shared/router';
import { ProductDetail } from '../../types/interfaces/Product';
import { CartResponse, lineItem } from '../../types/interfaces/basketPage';
import { createElement, displayMessage } from '../../utils/abstract';
import { createSliderElement, showModal } from '../../widgets/Slider/sliderView';
import { sendDataToCart, sendDeleteProductFromCartAfterAdd } from '../basketPage/basketPageController';
import { getCartData } from '../basketPage/basketPageModel';
import { ProductPage } from './productPageController';

async function buttonToCardClick(e: Event): Promise<void> {
  const button: HTMLElement | null = e.target as HTMLElement;
  const id = button.closest('[data-id]')?.getAttribute('data-id');
  if (button && button.innerHTML !== `delete from cart`) {
    button.innerHTML = `delete from cart`;
    sendDataToCart(e);
  } else if (button) {
    button.innerHTML = `add to cart`;
    await sendDeleteProductFromCartAfterAdd(e);
    displayMessage('product was deleted', true);
    if (id) {
      ProductPage.update(id);
    }
  }
}

const buttonBack = createElement('button', ['button-light', 'button__back'], '&#11178; go to back');
export const productContainer = createElement('div', ['product__container']);

const buildPriceText = (price: number, discountedPrice?: number): string => {
  if (discountedPrice) {
    return `${discountedPrice} $`;
  }
  return `${price} $`;
};

const createProductDescription = (description: string): string => {
  return `
    <p class="product__description">${description}</p>
    <p class="product__sub-info">warranty 30 days</p>
  `;
};

const createProductWrapper = (product: ProductDetail, targetItem: lineItem | undefined): string => {
  const price = product.masterData.current.masterVariant.prices[0].value.centAmount / 100;
  let discountedPrice;
  if (product.masterData.current.masterVariant.prices[0].discounted?.value.centAmount) {
    discountedPrice = product.masterData.current.masterVariant.prices[0].discounted.value.centAmount / 100;
  }

  return `
    <div class="product__wrapper" data-id="${product.id}">
      <div class="product__image"></div>
      <div class="product__buy-wrapper">
        <div class="product__price-wrapper">
          <p class="product__price-sale">${discountedPrice ? buildPriceText(discountedPrice) : ''}</p>
          <p class="${discountedPrice ? 'product__price' : 'product__price-sale'}">${buildPriceText(price)}</p>
        </div>
        <button class="button product__to-cart" id="toCart">${!targetItem ? 'add to cart' : 'delete from cart'}</button>
      </div>
    </div>
  `;
};

function addListeners(): void {
  const addToCartButton = productContainer.querySelector('#toCart');
  addToCartButton?.addEventListener('click', (e: Event) => buttonToCardClick(e));
  const buttonBackElement = productContainer.querySelector('.button__back');
  buttonBackElement?.addEventListener('click', redirectToCatalog);
}

export async function productPageView(product: ProductDetail): Promise<HTMLElement> {
  const cartExists: CartResponse = await getCartData();
  const [resultsData] = cartExists.results;
  const { lineItems: lineItemsData } = resultsData;
  const targetItem: lineItem | undefined = lineItemsData?.find((item: lineItem) => item.productId === product.id);
  const arrayOfImageLinks: string[] = product.masterData.current.masterVariant.images.map((image) => image.url);
  productContainer.innerHTML = `
  ${buttonBack.outerHTML}
    <h1 class="product__title">${product.masterData.current.metaTitle['en-US']}</h1>
  `;
  productContainer.innerHTML += createProductWrapper(product, targetItem);
  productContainer.innerHTML += createProductDescription(product.masterData.current.description['en-US']);
  const sliderElement = createSliderElement(arrayOfImageLinks);
  const productImage = productContainer.querySelector('.product__image');
  productImage?.append(sliderElement);
  productImage?.addEventListener('click', (e) => {
    if (e instanceof MouseEvent && e.target instanceof HTMLElement) {
      if (e.target.classList.contains('slider__img')) {
        showModal(e, arrayOfImageLinks);
      }
    }
  });
  addListeners();
  return productContainer;
}
