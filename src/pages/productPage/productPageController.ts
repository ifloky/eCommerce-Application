// import { getAnonymousFlow } from "../../shared/API";
import { productPageView } from "./productPageView";

export interface ProductDetail {
  [key: string]: string;
};

const productTest: ProductDetail = {
  'id': 'ididididididid',
  'name': 'Seed eprst',
  'link': 'link',
  'price': 'price',
  'sale': 'sale',
  'description': 'description'
}

// const product = async (): Promise<ProductDetail> => {
//  return await getAnonymousFlow('/products/0');
// }

export const ProductPage = {
  render: (): HTMLElement => {return productPageView(productTest)},
  // update: async (): Promise<HTMLElement> => {
  //  const productData = await product();
  //  return productPageView(productData);
  // },
};

