import { ProductCard } from "../../types/interfaces/widgets/ProductCard";
import { createElement } from "../../utils/abstract";

// TO DO: add this to call function
const productCard: ProductCard = {
  'img': 'link-to-image',
  'name': 'Name',
  'info': 'Super puper cool plants for your garden',
  'price': 'Price',
  'sale': 'Sale-Price'
}

export function cardProductView(): HTMLElement {
  const cardProductWrapper = createElement('div', ['product-card__wrapper']);

  cardProductWrapper.innerHTML = ` 
    <div class="product-card__image">
      <a href="${productCard.link}">
        <img src="${productCard.img}">
        <div class="product-card__shadow"></div>
      </a>
      <a class="product-card__detail-link" href="${productCard.link}"></a>
      <div class="product-card__actions">
        <div class="product-card__actions-btn">
          <a class="product-card__add-to-cart" href="" title="add to cart"></a>
          <a class="product-card__add-to-wishlist" href="" title="add to favorite"></a>
        </div>
      </div> 
    </div>
    <div class="product-card__list">
      <h3>${productCard.name}</h3>
      <p class="product-card__sub-info">${productCard.info}</p>
      <div class="product-card__price"><span class="product-card__price product-card__sale">${productCard.sale}</span> ${productCard.price}</div>
    </div>`

  return cardProductWrapper;
}