import { createElement, displayMessage } from '../../utils/abstract';
import { sendDeleteProductFromCart, deleteAllProductsFromCartController } from './basketPageController';
import { getProductInCart } from './basketPageModel';
import { redirectToCatalog } from '../../shared/router';

function clickDelete(e: Event, productsInCart: HTMLElement): void {
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
deleteAllProductButton.addEventListener('click', deleteAllProductsFromCartController);

export async function returnCartItem(): Promise<HTMLElement> {
  const cardItem = createElement('div', ['basket__cart-items']);
  const productsInCart = await getProductInCart();

  if (!productsInCart || !productsInCart.lineItems?.length) {
    emptyBasket.innerHTML = '';
    emptyBasket.innerHTML = `<h2>basket is empty</h2>`;
    const buttonToCatalog = createElement('button', ['button'], 'Go to catalog');
    buttonToCatalog.onclick = (): void => redirectToCatalog();
    emptyBasket.append(buttonToCatalog);
    return emptyBasket;
  }
  const cartAllPrice = createElement('div', ['basket__cart-all-price']);
  const totalPriceAmount = Number(productsInCart.totalPrice?.centAmount) || 0;
  cartAllPrice.innerHTML = 'Total cost:' + totalPriceAmount / 100 + '$' || 'Total cost:';
  cardItem.appendChild(deleteAllProductButton);
  productsInCart.lineItems?.forEach((item) => {
    const productElement = createElement('div', ['product']);
    productElement.setAttribute('data-id', item.id);
    productElement.addEventListener('click', (e: Event): void => clickDelete(e, cardItem));
    productElement.innerHTML = `
      <img src="${item.variant.images[0].url}" width="200" class="product__image" alt="product-image">
      <div class="product__info">
        <div class="product__name">Name: ${item.name['en-US']}</div>
        <div class="product__price">Price: ${Number(item.price.value.centAmount) / 100} $</div>
        <div class="product__count">Count: ${item.quantity}</div>
      </div>
      <button class="product__delete-button button-light">DELETE</button>
    `;
    cardItem.appendChild(productElement);
    cardItem.appendChild(cartAllPrice);
  });
  return cardItem;
}

export async function basketPageView(): Promise<HTMLElement> {
  const basketWrapper = createElement('div', ['basket__card-wrapper']);
  basketWrapper.innerHTML = '';
  basketWrapper.append(await returnCartItem());
  return basketWrapper;
}
