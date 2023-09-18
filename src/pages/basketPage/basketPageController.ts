import { getCookie } from "../../shared/API";
import { basketButtonController } from "../../shared/router";
import { CartResponse, lineItem } from "../../types/interfaces/basketPage";
import { confirmPopUp } from "../../utils/abstract";
import { addProductToCart, createCart, deleteAllProductsFromCart, deleteProductFromCart, getCartData } from "./basketPageModel";

export function checkAuthorization(): boolean {
  const user = getCookie('access_token');
  if (user) {
    return true
  }
  return false
}

export async function cartResponse(): Promise<[string, number]> {
  const [cartResponseResults] = (await getCartData()).results;
  const cartId = cartResponseResults.id;
  const cartDataVersion = cartResponseResults.version;
  return [cartId, cartDataVersion];
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
  if (parentElement) {
    parentId = parentElement.getAttribute('data-id');
  }
  const [cartId, cartDataVersion] = await cartResponse();
  const data = {
    "version": cartDataVersion,
    "actions": [{
      "action": "addLineItem",
      "productId": parentId,
      "variantId": 1,
      "quantity": 1,
    }]
  }
  addProductToCart(data, cartId)
}

export async function sendDeleteProductFromCart(e: Event): Promise<void> {
  const target = e.target as HTMLElement;
  const parentId = target.closest('[data-id]')?.getAttribute('data-id');
  const [cartId, cartDataVersion] = await cartResponse();
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
  const [cartId, cartDataVersion] = await cartResponse();
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

export async function deleteAllProductsFromCartController(): Promise<void> {
  const [cartId, cartDataVersion] = await cartResponse();
  const confirm = await confirmPopUp.confirm('Are you sure you want to do this?');
  if (confirm) {
    await deleteAllProductsFromCart(cartId, cartDataVersion);
    await basketButtonController()
  }
}

export async function sendMinusProductAmount(e: Event): Promise<void> {
  const target = e.target as HTMLElement;
  const targetParentID = target.closest('[data-id]')?.getAttribute('data-id');
  const [cartId, cartDataVersion] = await cartResponse();
  const data = {
    "version": cartDataVersion,
    "actions": [{
      "action": "removeLineItem",
      "lineItemId": targetParentID,
      "variantId": 1,
      "quantity": 1,
    }]
  }
  await deleteProductFromCart(data, cartId, cartDataVersion);
}

export async function changeProductAmount(e: Event, quantity: number): Promise<void> {
  const target = e.target as HTMLElement;
  const parentElement = target.closest('[data-id]');
  let parentId
  if (parentElement) {
    parentId = parentElement.getAttribute('data-id');
  }
  const [cartId, cartDataVersion] = await cartResponse();
  const data = {
    "version": cartDataVersion,
    "actions": [{
      "action": "changeLineItemQuantity",
      "lineItemId": parentId,
      "quantity": quantity,
    }],
  }
  await addProductToCart(data, cartId);
  basketButtonController()
}
