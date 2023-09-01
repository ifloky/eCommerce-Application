import { Product } from "../../types/interfaces/Product";
//  import { ProductCard } from "../../types/interfaces/widgets/ProductCard";
import { createElement } from "../../utils/abstract";

// TO DO: add this to call function
// const productCard: ProductCard = {
//   'img': 'masterData.current.masterVariant.images[0]',
//   'name': 'masterData.current.name["en-US"]',
//   'info': 'masterData.current.description["en-US"]',
//   'price': 'masterData.current.masterVariant.prices.value.centAmount',
//   'sale': 'masterData.current.masterVariant.prices.discounted.centAmount'
// }

export function priceWithDiscount(elem: Product): HTMLElement {
  const cardProductWrapper = createElement('div', ['product-card__wrapper']);
  let price;
  let discountedPrice;
  if(elem.masterData.current.masterVariant.prices[0].value.centAmount && elem.masterData.current.masterVariant.prices[0].discounted?.value.centAmount) {
    price = elem.masterData.current.masterVariant.prices[0].value.centAmount / 100;
    discountedPrice = elem.masterData.current.masterVariant.prices[0].discounted.value.centAmount / 100;
  }
  cardProductWrapper.innerHTML = `
  <div class="product-card__image">
    <a href="#">
      <img src="${elem.masterData.current.masterVariant.images[0].url}">
      <div class="product-card__shadow"></div>
    </a>
    <a class="product-card__detail-link" href="#"></a>
    <div class="product-card__actions">
      <div class="product-card__actions-btn">
        <a class="product-card__add-to-cart" href="" title="add to cart"></a>
        <a class="product-card__add-to-wishlist" href="" title="add to favorite"></a>
      </div>
    </div>
  </div>
  <div class="product-card__list">
    <h3>"${elem.masterData.current.name["en-US"]}"</h3>
    <p class="product-card__sub-info">"${elem.masterData.current.description["en-US"]}"</p>
    <div class="product-card__price"><span class="product-card__price product-card__sale">"$   ${discountedPrice}"</span> $   "${price}"</div>
  </div>`
  return cardProductWrapper
}

export function priceWithoutDiscount(elem: Product): HTMLElement {
  const cardProductWrapper = createElement('div', ['product-card__wrapper']);
  let price;
  if(elem.masterData.current.masterVariant.prices[0].value.centAmount) {
    price = elem.masterData.current.masterVariant.prices[0].value.centAmount / 100;
  }
  cardProductWrapper.innerHTML = `
  <div class="product-card__image">
    <a href="#">
      <img src="${elem.masterData.current.masterVariant.images[0].url}">
      <div class="product-card__shadow"></div>
    </a>
    <a class="product-card__detail-link" href="#"></a>
    <div class="product-card__actions">
      <div class="product-card__actions-btn">
        <a class="product-card__add-to-cart" href="" title="add to cart"></a>
        <a class="product-card__add-to-wishlist" href="" title="add to favorite"></a>
      </div>
    </div>
  </div>
  <div class="product-card__list">
    <h3>"${elem.masterData.current.name["en-US"]}"</h3>
    <p class="product-card__sub-info">"${elem.masterData.current.description["en-US"]}"</p>
    <div class="product-card__price">"$   ${price}"</div>
  </div>`
  return cardProductWrapper;
}

