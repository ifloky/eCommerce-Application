import { CartResponse, lineItem } from '../../types/interfaces/basketPage';

export async function checkItemInBasketForCatalog(elemId: string, cartData: CartResponse): Promise<boolean> {
  const [resultsData] = cartData.results;
  const { lineItems: lineItemsData } = resultsData;
  const targetItem: lineItem | undefined = lineItemsData?.find((item) => item.productId === elemId);
  return !targetItem;
}
