import { sendDataToCart, sendDeleteProductFromCartAfterAdd } from "../../pages/basketPage/basketPageController";
import { ProductPage } from "../../pages/productPage/productPageController";
import { Product } from "../../types/interfaces/Product";
import { createElement, displayMessage } from "../../utils/abstract";

function cardProductClick(e: Event, cardProductWrapper: HTMLElement, elem: Product): void {
  const productCardImage = cardProductWrapper.querySelector('.product-card__image');
  const productAddToCartButton = cardProductWrapper.querySelector('.product-card__add-to-cart');
  if (productCardImage && e.target !== productAddToCartButton) {
    e.preventDefault()
    e.stopPropagation()
    ProductPage.update(elem.id)
  }
  if (productAddToCartButton && e.target === productAddToCartButton) {
    if (productAddToCartButton.innerHTML !== `delete from cart`) {
      productAddToCartButton.innerHTML = `delete from cart`;
      sendDataToCart(e);
    } else {
      productAddToCartButton.innerHTML = `add to cart`;
      sendDeleteProductFromCartAfterAdd(e)
      displayMessage('product was deleted', true)
    }
  }
}

export function cardProductViewElement(elem: Product, inCart: boolean): HTMLElement {
  const cardProductWrapper = createElement('div', ['product-card__wrapper']);
  cardProductWrapper.setAttribute('data-id', elem.id)
  const price = elem.masterData.current.masterVariant.prices[0].value.centAmount / 100;
  const discountedPrice = Number(elem.masterData.current.masterVariant.prices[0].discounted?.value.centAmount) / 100;
  cardProductWrapper?.addEventListener('click', (e): void => cardProductClick(e, cardProductWrapper, elem))
  cardProductWrapper.innerHTML = `
  <div class="product-card__image">
    <a href="#">
      <img src="${elem.masterData.current.masterVariant.images[0].url}">
      <div class="product-card__shadow"></div>
    </a>
    <a class="product-card__detail-link" href="#"></a>
    <div class="product-card__actions">
      <div class="product-card__actions-btn">
        <a class="product-card__add-to-wishlist" href="" title="add to favorite"></a>
      </div>
    </div>
  </div>
  <div class="product-card__list">
    <h3>"${elem.masterData.current.name["en-US"]}"</h3>
    <p class="product-card__sub-info">"${elem.masterData.current.description["en-US"]}"</p>
    <div class="product-card__price-wrapper">
      <span class="${discountedPrice ? "product-card__sale" : "product-card__price"}">${price ? price + ' $' : ''}</span>
      <span class="product-card__price">${discountedPrice ? discountedPrice + ' $' : ''}</span>
    </div>
    <button class="button-light product-card__add-to-cart " id="addToCart">${inCart ? 'add to cart' : 'delete from cart'}</button>
  </div>`
  return cardProductWrapper
}