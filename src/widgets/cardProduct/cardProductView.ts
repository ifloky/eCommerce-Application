import { ProductCard } from "../../types/interfaces/widgets/ProductCard";
import { createElement } from "../../utils/abstract";

// TO DO: add this to call function
const productCard: ProductCard = {
  'img': 'masterData.current.masterVariant.images[0]',
  'name': 'masterData.current.name["en-US"]',
  'info': 'masterData.current.description["en-US"]',
  'price': 'masterData.current.masterVariant.prices.value.centAmount',
  'sale': 'masterData.current.masterVariant.prices.discounted.centAmount'
}

export async function cardProductView(): Promise<HTMLElement> {
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