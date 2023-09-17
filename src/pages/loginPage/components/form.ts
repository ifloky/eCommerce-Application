import { createElement } from '../../../utils/abstract';

const createFormElement = (): HTMLFormElement => createElement('form', ['login-page__form', 'form']);

const createWrapper = (): HTMLDivElement => createElement('div', ['form__wrapper']);

const createTextElement = (): HTMLSpanElement => createElement('span', ['form__error-text'])

const createInputElement = (): HTMLInputElement => createElement('input', ['form__input']);

const createLabelElement = (): HTMLLabelElement => createElement('label', ['form__label']);

const createButtonElement = (): HTMLButtonElement => createElement('button', ['form__button', 'button']);

const generateButtonsBlock = (): HTMLDivElement => {
  const buttonsBlock = createElement('div', ['form__buttons']);
  buttonsBlock.textContent = 'or';
  const submitBtn = createButtonElement();
  submitBtn.textContent = 'sign in';
  const redirectBtn = createButtonElement();
  redirectBtn.textContent = 'sign up';
  redirectBtn.type = 'button'
  buttonsBlock.prepend(submitBtn);
  buttonsBlock.append(redirectBtn);
  return buttonsBlock;
};

const generateShowPasswordCheckbox = (): HTMLDivElement => {
  const wrapper = createWrapper();
  wrapper.classList.add('form__wrapper_toggle');
  const label = createLabelElement();
  label.setAttribute('for', 'toggle');
  const input = createInputElement();
  input.setAttribute('id', 'toggle-password');
  input.type = 'checkbox';
  wrapper.append(label, input);
  return wrapper;
};

const generateEmailField = (): HTMLDivElement => {
  const wrapper = createWrapper();
  const errorText = createTextElement()
  errorText.classList.add('form__error-text_email')
  const label = createLabelElement();
  label.setAttribute('for', 'email');
  label.textContent = '* Email ';
  const input = createInputElement();
  input.setAttribute('id', 'email');
  input.classList.add('input', 'input_email');
  input.type = 'email';
  input.pattern = '^\\S$'
  input.required = true
  wrapper.append(label, input, errorText);
  return wrapper;
};

const generatePasswordField = (): HTMLDivElement => {
  const wrapper = createWrapper();
  wrapper.classList.add('form__wrapper_password');
  const errorText = createTextElement()
  errorText.classList.add('form__error-text_password')
  const label = createLabelElement();
  label.setAttribute('for', 'password');
  label.textContent = '* Password';
  const input = createInputElement();
  input.classList.add('input', 'input_pass');
  input.setAttribute('id', 'password');
  input.required = true;
  input.type = 'password';
  input.minLength = 8
  const showPassword = generateShowPasswordCheckbox();
  wrapper.append(label, input, showPassword, errorText);
  return wrapper;
};

export const generateForm = (): HTMLFormElement => {
  const form = createFormElement();
  const emailField = generateEmailField();
  const passwordField = generatePasswordField();
  const buttonsBlock = generateButtonsBlock();
  form.append(emailField, passwordField, buttonsBlock);
  return form;
};