import { getAnonymousFlow, getCookie, getPasswordFlow, postAnonymousFlow, postPasswordFlow } from "../../shared/API";

export interface CartResponse {
  count: number
  results: {
    id: string;
    version: string
  }[];
}

export function checkAuthorization(): boolean {
  const user = getCookie('access_token');
  if (user) {
    return true
  }
  return false
}

async function checkCart(): Promise<boolean> {
  if (checkAuthorization()) {
    const response: CartResponse = await getPasswordFlow(`/me/carts`);
    return !!response.count
  }
  const response: CartResponse = await getAnonymousFlow(`/carts`);
  return !!response.count
}

async function createCart(): Promise<void> {
  if (checkAuthorization()) {
    await postPasswordFlow(`/me/carts`, {})
  }
  await postAnonymousFlow(`/carts`, {})
}


export async function getCartData(): Promise<CartResponse> {
  if (checkAuthorization()) {
    const response: CartResponse = await getPasswordFlow(`/me/carts`);
    return response
  }
  const response: CartResponse = await getAnonymousFlow(`/carts`);
  return response
};


export async function addProductToCart(data: object): Promise<void> {
  const cartId = (await getCartData()).results[0].id;
  if (checkAuthorization()) {
    await postPasswordFlow(`/me/carts/${cartId}`, data)
  }
  await postAnonymousFlow(`/carts/${cartId}`, data)
}


export async function sendDataToCart(e: Event): Promise<void> {
  const cartExists = await checkCart();
  if (cartExists) {
    createCart();
  }
  const target = e.target as HTMLElement;
  const parentId = target.closest('[data-id]')?.getAttribute('data-id');
  const cartDataVersion = (await getCartData()).results[0].version;
  const data = {
    "version": cartDataVersion,
    "actions": [{
      "action": "addLineItem",
      "productId": parentId,
      "variantId": 1,
      "quantity": 1,
      "externalPrice": {
        "currencyCode": "EUR",
        "centAmount": 4000
      }
    }]
  }
  addProductToCart(data)
}

// render item in cart:


