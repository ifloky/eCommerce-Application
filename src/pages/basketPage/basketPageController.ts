import { basketPageRender } from '../../shared/router';
import { CartInfo, CartResponse, lineItem } from '../../types/interfaces/basketPage';
import { confirmPopUp } from '../../utils/abstract';
import {
  addProductToCart,
  createCart,
  deleteAllProductsFromCart,
  deleteProductFromCart,
  getCartData,
} from './basketPageModel';

export const dataObj = function dataObj(
  cartDataVersion: number,
  action: string,
  parentId: string,
  quantity = 1,
): object {
  const dataObject = {
    version: cartDataVersion,
    actions: [
      {
        action: action,
        lineItemId: parentId,
        productId: parentId,
        variantId: 1,
        quantity: quantity,
      },
    ],
  };
  return dataObject;
};

export async function countProductInBasket(): Promise<string> {
  const countProductInCart = (await getCartData()).results[0]?.lineItems.length.toString() || '';
  return countProductInCart;
}

export async function setCountProductInBasket(): Promise<void> {
  const countItemElement = document.querySelector('.basket__count-item');
  if (countItemElement) {
    countItemElement.innerHTML = (await countProductInBasket()) || '0';
  }
}

export async function cartResponse(): Promise<CartInfo> {
  const [cartResponseResults] = (await getCartData()).results;
  const cartId = cartResponseResults.id;
  const cartDataVersion = cartResponseResults.version;
  return { cartId, cartDataVersion };
}

export async function sendDataToCart(e: Event): Promise<void> {
  let cartExists = await getCartData();
  if (cartExists.count < 1) {
    await createCart();
    cartExists = await getCartData();
  }
  const target = e.target as HTMLElement;
  const parentElement = target.closest('[data-id]');
  const parentId = parentElement?.getAttribute('data-id') || '';
  const { cartId, cartDataVersion } = await cartResponse();
  const data = dataObj(cartDataVersion, 'addLineItem', parentId);
  await addProductToCart(data, cartId);
  await setCountProductInBasket();
}

export async function sendDeleteProductFromCart(e: Event): Promise<void> {
  const target = e.target as HTMLElement;
  const parentId = target.closest('[data-id]')?.getAttribute('data-id') || '';
  const { cartId, cartDataVersion } = await cartResponse();
  const data = dataObj(cartDataVersion, 'removeLineItem', parentId, 9999);
  await deleteProductFromCart(data, cartId, cartDataVersion);
  await setCountProductInBasket();
  await basketPageRender();
}

export async function checkItemInBasketForDelete(e: Event): Promise<string | undefined> {
  const cartExists: CartResponse = await getCartData();
  const [cartResults] = cartExists.results;
  const { lineItems } = cartResults;
  const target = e.target as HTMLElement;
  const targetParentID = target.closest('[data-id]')?.getAttribute('data-id');
  const targetItem: lineItem | undefined = lineItems?.find((item) => item.productId === targetParentID);
  return targetItem?.id;
}

export async function sendDeleteProductFromCartAfterAdd(e: Event): Promise<void> {
  const targetItem = (await checkItemInBasketForDelete(e)) || '';
  const { cartId, cartDataVersion } = await cartResponse();
  const data = dataObj(cartDataVersion, 'removeLineItem', targetItem);
  await deleteProductFromCart(data, cartId, cartDataVersion);
  await setCountProductInBasket();
  await basketPageRender();
}

export async function deleteAllProductsFromCartController(): Promise<void> {
  const { cartId, cartDataVersion } = await cartResponse();
  const confirm = await confirmPopUp.confirm('Are you sure you want to do this?');
  if (confirm) {
    await deleteAllProductsFromCart(cartId, cartDataVersion);
    await setCountProductInBasket();
    await basketPageRender();
  }
}

export async function changeProductAmount(e: Event, quantity: number): Promise<void> {
  const target = e.target as HTMLElement;
  const parentElement = target.closest('[data-id]');
  const parentId = parentElement?.getAttribute('data-id') || '';
  const { cartId, cartDataVersion } = await cartResponse();
  const data = dataObj(cartDataVersion, 'changeLineItemQuantity', parentId, quantity);
  const countItemElement = document.querySelector('.basket__count-item');
  if (countItemElement) {
    countItemElement.innerHTML = await countProductInBasket();
  }
  await addProductToCart(data, cartId);
  await setCountProductInBasket();
  await basketPageRender();
}
