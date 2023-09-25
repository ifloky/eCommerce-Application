export interface Product {
  key: string;
  name: string;
}

export function CardListView(productList: Product[]): string {
  return `
    <div class="card-container">
      ${productList
        .map(
          (product) => `
        <div class="card">
          <img src="" class="card__img"> 
          <div class="card__name-product">Tomato name:${product.key}</div>
          <button class="card__buy-btn">to Cart</button>
        </div>
      `,
        )
        .join('')}
    </div>
  `;
}
