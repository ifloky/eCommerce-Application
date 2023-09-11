import { createElement } from "../../utils/abstract";
import { getAnonymousFlow, getPasswordFlow } from "../../shared/API";
import { CartResponse, checkAuthorization, sendDeleteProductFromCart } from "./basketPageController";
import { redirectToCatalog } from "../../shared/router";
export interface CartResponseItem {
  id: string;
  lineItems?: {
    id: string;
    name: {
      "en-US": string;
    };
    price: {
      value: {
        centAmount: string;
      };
    };
    totalPrice: {
      centAmount: string;
    };
    quantity: number;
    variant: {
      images: {
        url: string;
      }[];
    };
  }[];
  totalPrice?: {
    centAmount: string;
  };
}


export async function getProductInCart(): Promise<CartResponseItem> {
  if (checkAuthorization()) {
    const cartResult: CartResponse = await getPasswordFlow(`/me/carts`)
    return cartResult.results[0]
  }
  const cartResult: CartResponse = await getAnonymousFlow(`/carts`)
  return cartResult.results[0]
}

function clickDelete(e: Event, productsInCart: HTMLElement): void {
  const productElements = Array.from(productsInCart.getElementsByClassName('product__delete-button'));

  productElements.forEach(async (elem) => {
    if (elem === e.target) {
      await sendDeleteProductFromCart(e);
    }
  });
}

const entryBasket = createElement('div', ['product-none']);

export async function returnCartItem(): Promise<HTMLElement> {
  const cardItem = createElement('div', ['basket__cart-items']);
  const productsInCart = await getProductInCart();
  if (!productsInCart.lineItems?.length) {
    entryBasket.innerHTML = "";
    entryBasket.innerHTML = `<h2>basket is empty</h2>`
    const buttonToCatalog = createElement('button', ['button']);
    buttonToCatalog.innerHTML = 'Go to catalog'
    buttonToCatalog.onclick = (): void => redirectToCatalog();
    entryBasket.append(buttonToCatalog);
    return entryBasket;
  }
  const cartAllPrice = createElement('div', ['basket__cart-all-price']);
  const totalPriceAmount = Number(productsInCart.totalPrice?.centAmount) || 0;
  cartAllPrice.innerHTML = 'Total cost:' + (totalPriceAmount / 1000) + '$' || 'Total cost:';
  productsInCart.lineItems?.forEach(item => {
    const productElement = createElement('div', ['product']);
    productElement.setAttribute('data-id', item.id)
    productElement.addEventListener('click', (e: Event): void => clickDelete(e, cardItem))
    productElement.innerHTML = `
      <img src="${item.variant.images[0].url}" width="200" class="product__image" alt="product-image">
      <div class="product__info">
        <div class="product__name">Name: ${item.name["en-US"]}</div>
        <div class="product__price">Price: ${Number(item.price.value.centAmount) / 1000} $</div>
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
  basketWrapper.append(await returnCartItem() || "basket is entry");
  return basketWrapper;
}