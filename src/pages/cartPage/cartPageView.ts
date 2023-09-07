import { getAnonymousFlow, getPasswordFlow } from "../../shared/API";
import { createElement } from "../../utils/abstract";
import { CartResponse, checkAuthorization } from "../../widgets/cardProduct/cardProductController";

export interface CartResponseItem {
  id: string,
  lineItems?: {
    id: string;
    name: string;
    price: {
      value: {
        centAmount: string
      }
    }
    totalPrice: {
      centAmount: string
    }
    quantity: number,
    variant: {
      images: {
        url: string
      }[]
    }
  }[];
}



export async function getProductInCart(): Promise<CartResponseItem> {
  if (checkAuthorization()) {
    const cartResult: CartResponse = await getPasswordFlow(`/me/carts`)
    return cartResult.results[0]
  }
  const cartResult: CartResponse = await getAnonymousFlow(`/carts`)
  return cartResult.results[0]
}

export async function returnCartItem(): Promise<HTMLElement> {
  const productsInCart = await getProductInCart();
  const cardItem = createElement('div', ['cart-item']);

  productsInCart.lineItems?.forEach(item => {
    const productElement = createElement('div', ['product']);
    productElement.innerHTML = `
      <img src="${item.variant.images[0].url}" width="200" class="product__image" alt="product-image">
      <div class="product__info">
        <div class="product__name">${item.name}</div>
        <div class="product__price">${item.price.value.centAmount}</div>
        <div class="product__count">${item.quantity}</div>
      </div>
    `;
    cardItem.appendChild(productElement);
  });

  return cardItem;
}