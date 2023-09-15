/* eslint-disable no-console */
import { createElement } from "../../utils/abstract"
import { priceWithDiscount } from "../../widgets/cardProduct/cardProductView"
import { selectCategory } from "./catalogPageController"
import { getAllProducts, getCategoriesData } from "./catalogPageModelPanakir"

const createHeadingElement = (): HTMLHeadingElement => {
  const title = createElement('h2', ['catalog__title'])
  title.textContent = 'Our catalog'
  return title
}

const createButtonElement = (): HTMLButtonElement => {
  const button = createElement('button', ['catalog__button', 'button'])
  return button
}

const createButtonsForCategories = async (): Promise<HTMLDivElement> => {
  const buttonsWrapper = createElement('div', ['catalog__buttons'])
  const allCategories = await getCategoriesData()
  allCategories.forEach(category => {
    const name = category.categoryName
    const button = createButtonElement()
    button.textContent = name
    button.setAttribute('data-id', category.id)
    buttonsWrapper.append(button)
  });
  return buttonsWrapper
}

const generateAllProductsCart = async (): Promise<HTMLElement> => {
  const wrapper = createElement('div', ['catalog__container'])
  const products = await (await getAllProducts()).results
  products.forEach(product => {
    const productCard = priceWithDiscount(product)
    wrapper.append(productCard)
  })
  return wrapper
}

const generateCatalogView = async (): Promise<HTMLElement> => {
  const section = createElement('section', ['catalog'])
  const sectionWrapper = createElement('div', ['catalog__wrapper'])
  const title = createHeadingElement()
  const productWrapper = await generateAllProductsCart()
  const buttonsBlock = await createButtonsForCategories()
  sectionWrapper.append(title, buttonsBlock, productWrapper)
  section.append(sectionWrapper)
  return section
}

const bindEvents = (parent: HTMLElement): void => {
  const buttons = parent.querySelector('.catalog__buttons')
  buttons?.addEventListener('click', selectCategory)
}

export const getCatalogView = async (): Promise<HTMLElement> => {
  const view = await generateCatalogView()
  bindEvents(view)
  return view
}