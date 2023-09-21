import { createElement, displayMessage } from '../../utils/abstract';
import {
  sendDeleteProductFromCart,
  deleteAllProductsFromCartController,
  changeProductAmount,
  cartResponse,
} from './basketPageController';
import { getProductInCart } from './basketPageModel';
import { redirectToCatalog } from '../../shared/router';
import { CartResponseItem, lineItem } from '../../types/interfaces/basketPage';
import { postAnonymousFlow } from '../../shared/API';

function clickProduct(e: Event, productsInCart: HTMLElement): void {
  const target = e.target as HTMLElement;
  const quantityParentElement = target.closest('[data-id]');
  const quantityElement = quantityParentElement?.querySelector('.product__count-amount');
  const quantity = Number(quantityElement?.innerHTML) || 0;

  if (e.target === target && target.classList.contains('button__add-amount')) {
    const newAddQuantity = quantity + 1;
    changeProductAmount(e, newAddQuantity);
  }
  if (e.target === target && target.classList.contains('button__minus-amount')) {
    const newMinusQuantity = quantity - 1;
    changeProductAmount(e, newMinusQuantity);
  }
  const productElements = Array.from(productsInCart.getElementsByClassName('product__delete-button'));
  productElements.forEach(async (elem) => {
    if (elem === e.target) {
      await sendDeleteProductFromCart(e);
      displayMessage('product was deleted', true);
    }
  });
}

const emptyBasket = createElement('div', ['product-none']);
const deleteAllProductButton = createElement('button', ['button-light', 'basket__delete-all-button'], 'Delete all');
const addAmount = createElement('button', ['button-light', 'button__add-amount'], '+');
const minusAmount = createElement('button', ['button-light', 'button__minus-amount'], '-');

function checkEmptyBasket(): HTMLElement {
  emptyBasket.innerHTML = '';
  emptyBasket.innerHTML = `<h2>basket is empty</h2>`;
  const buttonToCatalog = createElement('button', ['button'], 'Go to catalog');
  buttonToCatalog.onclick = (): void => redirectToCatalog();
  emptyBasket.append(buttonToCatalog);
  return emptyBasket;
}

function returnTemplate(item: lineItem): string {
  const template = `
      <img src="${item.variant.images[0].url}" width="200" class="product__image" alt="product-image">
      <div class="product__info">
        <div class="product__name">Name: ${item.name['en-US']}</div>
        <div class="product__price">Price: <span class="product__price-amount"> ${
          Number(item.totalPrice.centAmount) / 100
        } </span>$</div>
          ${minusAmount.outerHTML}
          <div class="product__count">Count: <span class="product__count-amount"> ${item.quantity} </span> </div>
          ${addAmount.outerHTML}
      </div>
      <button class="product__delete-button button-light">DELETE</button>
    `;
  return template;
}

function returnProductElement(item: lineItem, cardItemWrapper: HTMLElement): HTMLElement {
  const productElement = createElement('div', ['product']);
  productElement.setAttribute('data-id', item.id);
  productElement.setAttribute('data-productId', item.productId);
  productElement.addEventListener('click', (e: Event): void => clickProduct(e, cardItemWrapper));
  productElement.innerHTML = returnTemplate(item);
  return productElement;
}

export async function productList(productsInCart: CartResponseItem): Promise<HTMLElement> {
  const cardItemWrapper = createElement('div', ['basket__cart-items']);
  const cartAllPrice = createElement('div', ['basket__cart-all-price']);
  const totalPriceAmount = Number(productsInCart.totalPrice?.centAmount) || 0;
  cartAllPrice.innerHTML = 'Total cost:' + totalPriceAmount / 100 + '$' || 'Total cost:';
  deleteAllProductButton.addEventListener('click', deleteAllProductsFromCartController);
  cardItemWrapper.appendChild(deleteAllProductButton);
  productsInCart.lineItems?.forEach((item) => {
    cardItemWrapper.append(returnProductElement(item, cardItemWrapper));
    cardItemWrapper.appendChild(cartAllPrice);
  });
  return cardItemWrapper;
}

export async function returnCartItem(): Promise<HTMLElement> {
  const productsInCart = await getProductInCart();
  if (!productsInCart || !productsInCart.lineItems?.length) {
    return checkEmptyBasket();
  }
  return productList(productsInCart);
}

async function applyPromoCode(): Promise<void> {
  const { cartId, cartDataVersion } = await cartResponse();
  const data = {
    version: cartDataVersion,
    actions: [
      {
        action: 'addDiscountCode',
        code: 'weOpened',
      },
    ],
  };
  await postAnonymousFlow(`/carts/${cartId}`, data);
}

const bindEvents = (parent: HTMLElement): void => {
  const buttons = parent.querySelector('.button');
  buttons?.addEventListener('click', () => applyPromoCode());
};

function returnPromoCodeEnterElement(): HTMLElement {
  const promoCodeEnderWrapper = createElement('div', ['promo-code__wrapper']);
  const inputPromoCode = createElement('input', ['promo-code__input']);
  inputPromoCode.setAttribute('placeholder', 'enter your promo code');
  const buttonApplyPromoCode = createElement('button', ['button', 'promo-code__button'], 'Apply');
  promoCodeEnderWrapper.innerHTML = `
    <div class="promo-code__title">Enter your promo code</div>
    ${inputPromoCode.outerHTML}
    ${buttonApplyPromoCode.outerHTML} 
  `;
  bindEvents(promoCodeEnderWrapper);
  return promoCodeEnderWrapper;
}

export async function basketPageView(): Promise<HTMLElement> {
  const basketWrapper = createElement('div', ['basket__card-wrapper']);
  basketWrapper.innerHTML = '';
  basketWrapper.append(returnPromoCodeEnterElement());
  basketWrapper.append(await returnCartItem());
  return basketWrapper;
}
