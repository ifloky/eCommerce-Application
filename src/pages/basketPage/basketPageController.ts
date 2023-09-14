import { deleteAnonymousFlow, deletePasswordFlow, getAnonymousFlow, getCookie, getPasswordFlow, postAnonymousFlow, postPasswordFlow } from "../../shared/API";

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

async function createCart(): Promise<void> {
  if (checkAuthorization()) {
    await postPasswordFlow(`/me/carts`, {
      "currency": "USD"
    })
  }
  await postAnonymousFlow(`/carts`, {
    "currency": "USD"
  })
}

export async function getCartData(): Promise<CartResponse> {
  if (checkAuthorization()) {
    const response: CartResponse = await getPasswordFlow(`/me/carts`);
    return response
  }
  const response: CartResponse = await getAnonymousFlow(`/carts`);
  return response
};

export async function addProductToCart(data: object, cartId: string): Promise<void> {
  if (checkAuthorization()) {
    await postPasswordFlow(`/me/carts/${cartId}`, data)
  }
  await postAnonymousFlow(`/carts/${cartId}`, data)
}

export async function deleteProductFromCart(data: object, cartId: string, cartDataVersion: string): Promise<void> {
  if (checkAuthorization()) {
    await deletePasswordFlow(`/me/carts/${cartId}?version=${cartDataVersion}`, data)
  }
  await deleteAnonymousFlow(`/carts/${cartId}?version=${cartDataVersion}`, data)
}

export async function sendDataToCart(e: Event): Promise<void> {
  let cartExists = await getCartData();
  if (cartExists.count < 1) {
    await createCart();
    cartExists = await getCartData();
  }
  const target = e.target as HTMLElement;
  const parentId = target.closest('[data-id]')?.getAttribute('data-id');
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
        "centAmount": 4000
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
    "action": "removeLineItem",
    "lineItemId": parentId
  }
  deleteProductFromCart(data, cartId, cartDataVersion)
}