import { postPasswordFlow } from "../../shared/API";
import { createElement } from "../../utils/abstract";
import { ProductDetail } from "./productPageController";



interface DataOfProduct {
  id: string;
  productId: string;
  name: string; 
  productType: {
    typeId: string;
    id: Element | null;
  };
  variantId: number;
  quantity: number;
  addedAt: string;
}


const productContainer = createElement('div', ['product__container'])

function getDataOfProduct(): DataOfProduct {
  const productTitleElement = productContainer.querySelector('.product__title');
  const productTypeElement = productContainer.querySelector('div[data-id]');

  const item: DataOfProduct = {
    id: "ade85d60-736b-4ca8-87ed-01fde78f92c5",
    productId: "077bb11b-0d00-4e00-aced-48f493a79da0",
    name: productTitleElement?.textContent || "",
    productType: {
      typeId: "product-type",
      id: productTypeElement,
    },
    variantId: 2,
    quantity: 3,
    addedAt: "2022-08-22T14:11:03.572Z"
  };

  return item;
}

productContainer.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).nodeName === 'BUTTON') {
    const data = getDataOfProduct();
    postPasswordFlow('/me/shopping-lists', data)
  }
});

export function productPageView(product: ProductDetail): HTMLElement {
  productContainer.innerHTML = `
    <h1 class="product__title">${product.name}</h1>
    <div class="product__wrapper" data-id="${product.id}">
      <img src="${product.link}" class="product__image">
      <div class="product__buy-wrapper">
        <div class="product__price-wrapper">
          <p class="product__price">${product.price}</p>
          <p class="product__price-sale">${product.sale}</p>
        </div>
        <button class="btn product__to-cart" id="toCart">add to cart</button>
      </div>
    </div>
    <p class="product__description">${product.description}</p>
    <p class="product__sub-info">warranty 30 days</p>
  `
  return productContainer;
}

