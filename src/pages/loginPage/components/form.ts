import { createElement } from "../../../utils/abstract"

const createFormElement = (): HTMLFormElement => createElement('form', ['login-page__form', 'form'])

const createWrapper = (): HTMLDivElement => createElement('div', ['form__wrapper'])

const createInputElement = (): HTMLInputElement => createElement('input', ['form__input'])

const createLabelElement = (): HTMLLabelElement => createElement('label', ['form__label'])

const createAnchorElement = (): HTMLAnchorElement => createElement('a', ['form__link-button', 'button'])

const createButtonElement = (): HTMLButtonElement => createElement('button', ['form__button', 'button'])


const generateButtonsBlock = (): HTMLDivElement => {
  const buttonsBlock = createWrapper()
  buttonsBlock.textContent = 'or'
  const submitBtn = createButtonElement()
  submitBtn.textContent = "sign in"
  const redirectBtn = createAnchorElement()
  redirectBtn.textContent = 'sign up'
  buttonsBlock.prepend(submitBtn)
  buttonsBlock.append(redirectBtn)
  return buttonsBlock
}

const generateShowPasswordChecbox = (): HTMLLabelElement => {
  const label = createLabelElement()
  const input = createInputElement()
  input.type = 'checkbox'
  label.append(input)
  return label
}

const generteEmailField = (): HTMLElement => {
  const label = createLabelElement()
  label.textContent = '* Email '
  const input = createInputElement()
  input.required = true
  input.placeholder = 'This is a required field'
  input.type = 'email'
  label.append(input)
  return label
}
const genertePasswordField = (): HTMLElement => {
  const label = createLabelElement()
  label.innerHTML = '<span>* Password</span> '
  const input = createInputElement()
  input.required = true
  input.type = 'password'
  input.placeholder = 'This is a required field'
  label.append(input)
  return label
}

export const generateForm = (): HTMLFormElement => {
  const form = createFormElement()
  const emailField = generteEmailField()
  const passwordField = genertePasswordField()
  const showPassword = generateShowPasswordChecbox()
  const buttonsBlock = generateButtonsBlock()
  form.append(emailField, passwordField, showPassword, buttonsBlock)
  return form
}