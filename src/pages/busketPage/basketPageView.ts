import { createElement } from "../../utils/abstract";
import { getAnonymousFlow, getPasswordFlow } from "../../shared/API";
import { CartResponse, checkAuthorization } from "../../widgets/cardProduct/cardProductController";

export interface CartResponseItem {
  id: string,
  lineItems?: {
    id: string;
    name: {
      "en-US": string;
    };
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
  const cardItem = createElement('div', ['basket__cart-items']);

  productsInCart.lineItems?.forEach(item => {
    const productElement = createElement('div', ['product']);
    productElement.innerHTML = `
      <img src="${item.variant.images[0].url}" width="200" class="product__image" alt="product-image">
      <div class="product__info">
        <div class="product__name">Name: ${item.name["en-US"]}</div>
        <div class="product__price">Price: ${Number(item.price.value.centAmount) / 1000} $</div>
        <div class="product__count">Count: ${item.quantity}</div>
      </div>
    `;
    cardItem.appendChild(productElement);
  });

  return cardItem;
}

export async function basketPageView(): Promise<HTMLElement> {
  const basketWrapper = createElement('div', ['basket__card-wrapper']);
  basketWrapper.append(await returnCartItem());
  return basketWrapper;
}