import { createElement } from "../../utils/abstract";
import { createSliderElement, showModal } from "../../widgets/Slider/sliderView";
import { ProductDetail } from "./productPageController";

export const productContainer = createElement('div', ['product__container'])

export function productPageView(product: ProductDetail): HTMLElement {
  const arrayOfImageLinks: string[] = product.masterData.current.masterVariant.images.map(
    (image) => image.url
  );
  const discountedPrice = (product.masterData.current.masterVariant.prices[0].value.centAmount) / 100;
  let oldPrice;
  if(product.masterData.current.masterVariant.prices[0].discounted?.value.centAmount) {
    oldPrice = product.masterData.current.masterVariant.prices[0].discounted.value.centAmount / 100;
  }
  productContainer.innerHTML = `
    <h1 class="product__title">${product.masterData.current.metaTitle['en-US']}</h1>
    <div class="product__wrapper" data-id="${product.id}">
      <div class="product__image"></div>
      <div class="product__buy-wrapper">
        <div class="product__price-wrapper">
          <p class="product__price">${oldPrice ? oldPrice + ' $' : ''}</p>
          <p class="product__price-sale">${discountedPrice ? discountedPrice + ' $' : ''}</p>
        </div>
        <button class="button product__to-cart" id="toCart">add to cart</button>
      </div>
    </div>
    <p class="product__description">${product.masterData.current.description['en-US']}</p>
    <p class="product__sub-info">warranty 30 days</p>
  `;

  const sliderElement = createSliderElement(arrayOfImageLinks);
  const productImage = productContainer.querySelector('.product__image');
  productImage?.append(sliderElement);
  productImage?.addEventListener('click', (e) => {
    if (e instanceof MouseEvent && e.target instanceof HTMLElement) {
      if (e.target.classList.contains("slider__img")) {
        showModal(e, arrayOfImageLinks);
      }
    }
  });
  
  return productContainer;
}
