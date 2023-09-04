import { createElement } from "../../../utils/abstract";
import { isSignOut } from "../userProfilePageController";

const createWrapper = (): HTMLDivElement => createElement('div', ['sign-out'])
const createButtonElement = (): HTMLButtonElement => createElement('button', ['button', 'button_sign-out'])
const createButtonsBlock = (): HTMLDivElement => {
  const block = createElement('div', ['sign-out__buttons'])
  const agreeButton = createButtonElement()
  agreeButton.textContent = 'yes, please'
  const disagreeButton = createButtonElement()
  disagreeButton.textContent = 'no, thanks'
  block.append(agreeButton, disagreeButton)
  return block
}

const createTitleElement = (): HTMLHeadingElement => {
  const title = createElement('h3', ['sign-out__title'])
  title.textContent = 'Are you sure you want to sign out?'
  return title
}

const bindEvents = (): void => {
  const signOutButtons = document.querySelectorAll('.button_sign-out')
  signOutButtons.forEach(button => {
    button.addEventListener('click', isSignOut)
  })
}

export const renderSignOutBlock = (): void => {
  const information = document.querySelector('.information')
  const wrapper = createWrapper()
  const title = createTitleElement()
  const buttonsBlock = createButtonsBlock()
  wrapper.append(title, buttonsBlock)
  information?.append(wrapper)
  bindEvents()
}