import { createElement } from '../../../utils/abstract';

const createFormElement = (): HTMLFormElement => createElement('form', ['login-page__form', 'form']);

const createWrapper = (): HTMLDivElement => createElement('div', ['form__wrapper']);

const createInputElement = (): HTMLInputElement => createElement('input', ['form__input']);

const createLabelElement = (): HTMLLabelElement => createElement('label', ['form__label']);

const createAnchorElement = (): HTMLAnchorElement => createElement('a', ['form__link-button', 'button']);

const createButtonElement = (): HTMLButtonElement => createElement('button', ['form__button', 'button']);

const generateButtonsBlock = (): HTMLDivElement => {
  const buttonsBlock = createElement('div', ['form__buttons']);
  buttonsBlock.textContent = 'or';
  const submitBtn = createButtonElement();
  submitBtn.textContent = 'sign in';
  const redirectBtn = createAnchorElement();
  redirectBtn.textContent = 'sign up';
  buttonsBlock.prepend(submitBtn);
  buttonsBlock.append(redirectBtn);
  return buttonsBlock;
};

const generateShowPasswordChecbox = (): HTMLDivElement => {
  const wrapper = createWrapper();
  const label = createLabelElement();
  label.setAttribute('for', 'toggle');
  const input = createInputElement();
  input.setAttribute('id', 'toggle');
  input.type = 'checkbox';
  wrapper.append(label, input);
  wrapper.hidden = true;
  return wrapper;
};

const generteEmailField = (): HTMLDivElement => {
  const wrapper = createWrapper();
  const label = createLabelElement();
  label.setAttribute('for', 'email');
  label.textContent = '* Email ';
  const input = createInputElement();
  input.setAttribute('id', 'email');
  input.classList.add('input', 'input_email');
  input.required = true;
  input.type = 'email';
  wrapper.append(label, input);
  return wrapper;
};

const genertePasswordField = (): HTMLDivElement => {
  const wrapper = createWrapper();
  wrapper.classList.add('form__wrapper_password');
  const label = createLabelElement();
  label.setAttribute('for', 'password');
  label.textContent = '* Password';
  const input = createInputElement();
  input.classList.add('input', 'input_pass');
  input.setAttribute('id', 'password');
  input.required = true;
  input.type = 'password';
  const showPassword = generateShowPasswordChecbox();
  wrapper.append(label, input, showPassword);
  return wrapper;
};

export const generateForm = (): HTMLFormElement => {
  const form = createFormElement();
  const emailField = generteEmailField();
  const passwordField = genertePasswordField();
  const buttonsBlock = generateButtonsBlock();
  form.append(emailField, passwordField, buttonsBlock);
  return form;
};
