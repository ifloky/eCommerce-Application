import { getAnonymousFlow, getCookie, getPasswordFlow, postAnonymousFlow, postPasswordFlow } from "../../shared/API";
import { basketButtonController } from "../../shared/router";
import { CartResponse, CartResponseItem, lineItem } from "../../types/interfaces/basketPage";

export function checkAuthorization(): boolean {
  const user = getCookie('access_token');
  if (user) {
    return true
  }
  return false
}

export async function createCart(): Promise<void> {
  if (checkAuthorization()) {
    await postPasswordFlow(`/me/carts`, {
      "currency": "USD"
    })
  }
  await postAnonymousFlow(`/carts`, {
    "currency": "USD"
  })
}

export async function getProductInCart(): Promise<CartResponseItem> {
  let cartResult: CartResponse
  if (checkAuthorization()) {
    cartResult = await getPasswordFlow(`/me/carts`);
    if (!cartResult.results[0]) {
      createCart()
      cartResult = await getPasswordFlow(`/me/carts`);
    }
  } else {
    cartResult = await getAnonymousFlow(`/carts`)
  }
  return cartResult.results[0]
}

export async function getCartData(): Promise<CartResponse> {
  let response: CartResponse
  if (checkAuthorization()) {
    response = await getPasswordFlow(`/me/carts`);
  } else {
    response = await getAnonymousFlow(`/carts`);
  }
  return response
};

export async function addProductToCart(data: object, cartId: string): Promise<void> {
  if (checkAuthorization()) {
    await postPasswordFlow(`/me/carts/${cartId}`, data)
  } else {
    await postAnonymousFlow(`/carts/${cartId}`, data)
  }
}

export async function deleteProductFromCart(data: object, cartId: string, cartDataVersion: number): Promise<void> {
  if (checkAuthorization()) {
    await postPasswordFlow(`/me/carts/${cartId}?version=${cartDataVersion}`, data)
    return
  }
  await postAnonymousFlow(`/carts/${cartId}?version=${cartDataVersion}`, data)
}

export async function sendDataToCart(e: Event): Promise<void> {
  let cartExists = await getCartData();
  if (cartExists.count < 1) {
    await createCart();
    cartExists = await getCartData();
  }
  const target = e.target as HTMLElement;
  const parentElement = target.closest('[data-id]');
  let parentId
  let productPrice
  let productPriceNumber
  if (parentElement) {
    parentId = parentElement.getAttribute('data-id');
    productPrice = parentElement.querySelector('.product-card__price')?.innerHTML || '';
    productPriceNumber = Number(productPrice.slice(0, -2)) * 1000;
  }
  const [cartResponse] = cartExists.results;
  const cartId = cartResponse.id;
  const cartDataVersion = cartResponse.version;
  const data = {
    "version": cartDataVersion,
    "actions": [{
      "action": "addLineItem",
      "productId": parentId,
      "variantId": 1,
      "quantity": 1,
      "externalPrice": {
        "currencyCode": "USD",
        "centAmount": productPriceNumber
      }
    }]
  }
  addProductToCart(data, cartId)
}

export async function sendDeleteProductFromCart(e: Event): Promise<void> {
  const target = e.target as HTMLElement;
  const parentId = target.closest('[data-id]')?.getAttribute('data-id');
  const [cartResponse] = (await getCartData()).results;
  const cartId = cartResponse.id;
  const cartDataVersion = cartResponse.version;
  const data = {
    "version": cartDataVersion,
    "actions": [{
      "action": "removeLineItem",
      "lineItemId": parentId,
      "variantId": 1,
      "quantity": 1,
    }]
  }
  await deleteProductFromCart(data, cartId, cartDataVersion);
  if (window.location.pathname === '/basket') {
    await basketButtonController();
  }
}

export async function checkItemInBasketForDelete(e: Event): Promise<string | undefined> {
  const cartExists: CartResponse = await getCartData();
  const [f] = cartExists.results;
  const { lineItems } = f;
  const target = e.target as HTMLElement;
  const targetParentID = target.closest('[data-id]')?.getAttribute('data-id');
  const targetItem: lineItem | undefined = lineItems?.find(item => item.productId === targetParentID);
  return targetItem?.id
}

export async function sendDeleteProductFromCartAfterAdd(e: Event): Promise<void> {
  const targetItem = await checkItemInBasketForDelete(e);
  const [cartResponse] = (await getCartData()).results;
  const cartId = cartResponse.id;
  const cartDataVersion = cartResponse.version;
  const data = {
    "version": cartDataVersion,
    "actions": [{
      "action": "removeLineItem",
      "lineItemId": targetItem,
      "variantId": 1,
      "quantity": 1,
    }]
  }
  await deleteProductFromCart(data, cartId, cartDataVersion);
  if (window.location.pathname === '/basket') {
    await basketButtonController();
  }
}
