import { ProductPage } from "../../pages/productPage/productPageController";
import { Product } from "../../types/interfaces/Product";
import { createElement } from "../../utils/abstract";



export function priceWithDiscount(elem: Product): HTMLElement {
  const cardProductWrapper = createElement('div', ['product-card__wrapper']);
  const price = elem.masterData.current.masterVariant.prices[0].value.centAmount / 100;

  let discountedPrice;
  if(elem.masterData.current.masterVariant.prices[0].discounted?.value.centAmount) {
    discountedPrice = elem.masterData.current.masterVariant.prices[0].discounted.value.centAmount / 100;
  }
  cardProductWrapper?.addEventListener('click', (e)=> {
    const productCardImage = cardProductWrapper.querySelector('.product-card__image');  
   if ( productCardImage ) {  
    e.preventDefault()
    ProductPage.update(elem.id)
   }
  })
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
    <div class="product-card__price"><span class="product-card__price product-card__sale">${discountedPrice ? discountedPrice +' $': ''}</span>${price ? price + ' $' : ''}</div>
  </div>`
  return cardProductWrapper
}

