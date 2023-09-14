import { Product } from "../../types/interfaces/Product"
import { priceWithDiscount } from "../../widgets/cardProduct/cardProductView"
import { getProductCategory } from "./catalogPageModelPanakir"

/* eslint-disable no-console */
export const selectCategory = (event: Event): void => {
  const { target } = event
  if (target instanceof HTMLButtonElement) {
    const id = target.getAttribute('data-id')
    if (id) {
      getProductCategory(id)
    }
  }
}

export const renderSelectedCategory = (data: Product[]): void => {
  console.log(data);
  const catalogPage = document.querySelector('.catalog__container')
  while (catalogPage?.firstChild) {
    catalogPage.firstChild.remove()
  }
  data.forEach(product => {
    const productCard = priceWithDiscount(product)
    catalogPage?.append(productCard)
  })
}