import { createElement } from "../../utils/abstract";
import { createSliderElement, showModal } from "../../widgets/Slider/sliderView";
import { ProductDetail } from "./productPageController";

export const productContainer = createElement('div', ['product__container'])

export function productPageView(product: ProductDetail): HTMLElement {
  const arrayOfImageLinks: string[] = product.masterData.current.masterVariant.images.map(
    (image) => image.url
  );

  productContainer.innerHTML = `
    <h1 class="product__title">${product.masterData.current.metaTitle['en-US']}</h1>
    <div class="product__wrapper" data-id="${product.id}">
      <div class="product__image"></div>
      <div class="product__buy-wrapper">
        <div class="product__price-wrapper">
          <p class="product__price">${(product.masterData.current.masterVariant.prices[0].value.centAmount) / 100} USD</p>
          <p class="product__price-sale">${(product.masterData.current.masterVariant.prices[0].discounted.value.centAmount) / 100} USD</p>
        </div>
        <button class="btn product__to-cart" id="toCart">add to cart</button>
      </div>
    </div>
    <p class="product__description">${product.masterData.current.description['en-US']}</p>
    <p class="product__sub-info">warranty 30 days</p>
  `;

  const sliderElement = createSliderElement(arrayOfImageLinks);
  productContainer.querySelector('.product__image')?.append(sliderElement);
  productContainer.addEventListener('click', (e) => {
    
    if ((e.target as HTMLElement).nodeName === 'BUTTON') {
      // TODO: add to cart func'
    }
    if ((e.target as HTMLElement).classList.contains("slider__img")) {
      showModal(e, arrayOfImageLinks);
    }
  });
  return productContainer;
}
