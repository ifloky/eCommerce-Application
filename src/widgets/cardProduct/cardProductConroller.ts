import { postAnonymousFlow } from "../../shared/API";

export function addToCart(data: object): void {
  postAnonymousFlow('/carts/0', data)
}

export function addToCartFunction(e: Event): void {
  const target = e.target as HTMLElement;
  const parentWithId = target.closest('[data-id]');
  if (parentWithId) {
    const data = {"id": parentWithId.getAttribute('data-id')}
    addToCart(data)
  }
}


