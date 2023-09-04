import { createElement } from "../../../utils/abstract";

const navItemsArray = [
  'personal details',
  'billing address',
  'shipping address',
  'edit profile',
  'sign out'
]

const createMenuBlock = (): HTMLDivElement => createElement('div', ['profile__menu', 'menu'])

const createHeadingElement = (): HTMLHeadingElement => {
  const title = createElement('h2', ['menu__title'])
  title.textContent = 'my profile'
  return title
}

const createNavigationBlock = (): HTMLElement => createElement('nav', ['profile__navigation', 'nav'])

const createNavigationList = (): HTMLUListElement => createElement('ul', ['nav__list'])

const createListItemElement = (): HTMLLIElement => createElement('li', ['nav__item'])

const generateNavList = (): HTMLUListElement => {
  const list = createNavigationList()
  navItemsArray.forEach(item => {
    const element = createListItemElement()
    element.textContent = item
    element.setAttribute('data-type', item.split(' ')[0])
    list.append(element)
  })
  return list
}

export const generateMenuBlock = (): HTMLElement => {
  const menu = createMenuBlock()
  const title = createHeadingElement()
  const navigation = createNavigationBlock()
  const list = generateNavList()
  navigation.append(list)
  menu.append(title, navigation)
  return menu
} 