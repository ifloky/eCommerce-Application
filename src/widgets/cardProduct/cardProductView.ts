import { createElement } from "../../utils/abstract";

interface ProductCard {
  [key: string]: string;
}

const productCard: ProductCard = {
  'img': 'link-to-image',
  'name': 'Name',
  'price': 'Price',
  'sale': 'Sale-Price'
}

export async function cardProductView(): Promise<HTMLElement> {
  const cardProductWrapper = createElement('div', ['product-card__wrapper']);

  cardProductWrapper.innerHTML = ` 
    <div class="product-image">
      <a href="">
        <img src="${productCard.img}">
        <div class="shadow"></div>
      </a>
      <a class="detail-link" href="" title="fast show"></a>
      <div class="actions">
        <div class="actions-btn">
          <a class="add-to-cart" href="" title="add to cart"></a>
          <a class="add-to-wishlist" href="" title="add to favorite"></a>
        </div>
      </div> 
    </div>
    <div class="product-list">
      <h3>${productCard.name}</h3>
      <div class="price"><span class="price sale">${productCard.sale}</span> ${productCard.price}</div>
    </div>`

  return cardProductWrapper;
}