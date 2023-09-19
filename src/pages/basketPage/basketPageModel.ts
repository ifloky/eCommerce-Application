import {
  deleteAnonymousFlow,
  deletePasswordFlow,
  getAnonymousFlow,
  getPasswordFlow,
  postAnonymousFlow,
  postPasswordFlow,
} from '../../shared/API';
import { CartResponse, CartResponseItem } from '../../types/interfaces/basketPage';
import { cartResponse, isAuthorized } from './basketPageController';

export async function createCart(): Promise<void> {
  if (isAuthorized()) {
    await postPasswordFlow(`/me/carts`, {
      currency: 'USD',
    });
  }
  await postAnonymousFlow(`/carts`, {
    currency: 'USD',
  });
}

export async function getProductInCart(): Promise<CartResponseItem> {
  let cartResult: CartResponse;
  if (isAuthorized()) {
    cartResult = await getPasswordFlow(`/me/carts`);
    if (!cartResult.results[0]) {
      createCart();
      cartResult = await getPasswordFlow(`/me/carts`);
    }
  } else {
    cartResult = await getAnonymousFlow(`/carts`);
  }
  return cartResult.results[0];
}

export async function getCartData(): Promise<CartResponse> {
  let response: CartResponse;
  if (isAuthorized()) {
    response = await getPasswordFlow(`/me/carts`);
  } else {
    response = await getAnonymousFlow(`/carts`);
  }
  return response;
}

export async function addProductToCart(data: object, cartId: string): Promise<void> {
  if (isAuthorized()) {
    await postPasswordFlow(`/me/carts/${cartId}`, data);
  } else {
    await postAnonymousFlow(`/carts/${cartId}`, data);
  }
}

export async function deleteProductFromCart(data: object, cartId: string, cartDataVersion: number): Promise<void> {
  if (isAuthorized()) {
    await postPasswordFlow(`/me/carts/${cartId}?version=${cartDataVersion}`, data);
  } else {
    await postAnonymousFlow(`/carts/${cartId}?version=${cartDataVersion}`, data);
  }
}

export async function deleteAllProductsFromCart(cartId: string, version: number): Promise<void> {
  if (isAuthorized()) {
    await deletePasswordFlow(`/me/carts/${cartId}?version=${version}`, {});
  } else {
    await deleteAnonymousFlow(`/carts/${cartId}?version=${version}`, {});
  }
}

export async function sendMinusProductAmount(e: Event): Promise<void> {
  const target = e.target as HTMLElement;
  const targetParentID = target.closest('[data-id]')?.getAttribute('data-id');
  const { cartId, cartDataVersion } = await cartResponse();
  const data = {
    version: cartDataVersion,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId: targetParentID,
        variantId: 1,
        quantity: 1,
      },
    ],
  };
  await deleteProductFromCart(data, cartId, cartDataVersion);
}
