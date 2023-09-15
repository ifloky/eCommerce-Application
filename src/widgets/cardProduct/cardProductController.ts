import { CartResponse, lineItem } from "../../types/interfaces/basketPage";

export async function checkItemInBasketForCatalog(elemId: string, cartData: CartResponse): Promise<boolean> {
  const [f] = cartData.results;
  const { lineItems } = f;
  const targetItem: lineItem | undefined = lineItems?.find(item => item.productId === elemId);
  return !targetItem;
}
