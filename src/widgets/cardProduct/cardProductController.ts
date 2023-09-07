import { getAnonymousFlow, postAnonymousFlow } from "../../shared/API";

export interface CartResponse {
  results: {
    id: string;
    version: string
  }[];
}

const getCartData = async (): Promise<CartResponse> => {
  try {
    const response: CartResponse = await getAnonymousFlow(`/carts`);
    return response
  } catch (error) {
    throw Error('' + error);
  }
};

export async function addToCart(data: object): Promise<void> {
  const cartId = (await getCartData()).results[0].id;
  await postAnonymousFlow(`/carts/${cartId}`, data)
}

export async function addToCartFunction(e: Event): Promise<void> {
  const target = e.target as HTMLElement;

  const parentId = target.closest('[data-id]')?.getAttribute('data-id');
  const [cartDataVersion] = (await getCartData()).results[0].version;

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
      },
    }]
  }

  addToCart(data)
}

// render item in cart:
// document.body.append(await returnCartItem());



