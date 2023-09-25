import { createElement } from '../../utils/abstract';
import { isShowed } from '../../widgets/forms/forms';
import {
  hideShippingAddressField,
  moveForm,
  sendForm,
  validationAddressData,
  validationPersonalData,
} from './registrationPageController';
import { getCountries } from './registrationPageModel';

const personalDataFields = [
  {
    type: 'email',
    id: 'email',
    label: 'Email *:',
    required: true,
  },
  {
    type: 'password',
    id: 'password',
    label: 'Password *:',
    required: true,
  },
  {
    id: 'firstName',
    label: 'First name *:',
    required: true,
  },
  {
    id: 'middleName',
    label: 'Middle name:',
  },
  {
    id: 'lastName',
    label: 'Last name *:',
    required: true,
  },
  {
    type: 'date',
    id: 'dateOfBirth',
    label: 'Date of birth *:',
    required: true,
  },
];

const addressesDataFields = [
  {
    id: 'streetName',
    name: 'street',
    text: 'Street name *:',
    required: true,
  },
  {
    id: 'city',
    text: 'City *:',
    required: true,
  },
  {
    id: 'postalCode',
    text: 'Postal code *:',
    required: true,
  },
  {
    id: 'country',
    text: 'Country *:',
    required: true,
  },
  {
    id: 'default',
    text: 'Use as default address',
  },
  {
    id: 'mergeAddresses',
    text: 'Use billing address also as the shipping address',
  },
];

const createHeadingElement = (): HTMLHeadingElement => {
  const element = createElement('h2', ['registration__title']);
  element.textContent = 'Registration form';
  return element;
};

const createFieldsetElement = (): HTMLFieldSetElement => createElement('fieldset', ['form__fieldset']);

const createLegendElement = (textContent: string): HTMLLegendElement => {
  const element = createElement('legend', ['form__legend']);
  element.textContent = textContent;
  return element;
};

const createWrapperFieldElement = (): HTMLDivElement => createElement('div', ['form__wrapper-field']);

const createLabelElement = (textContent: string, textFor: string): HTMLLabelElement => {
  const element = createElement('label', ['form__label']);
  element.textContent = textContent;
  element.setAttribute('for', `${textFor}`);
  return element;
};

const createInputElement = (id: string, required = false, type = 'text'): HTMLInputElement => {
  const element = createElement('input', ['form__input', 'input', 'input_small']);
  element.id = id;
  element.type = type;
  element.required = required;
  return element;
};

const generateShowPasswordCheckbox = (): HTMLDivElement => {
  const wrapper = createWrapperFieldElement();
  wrapper.classList.add('form__wrapper_toggle');
  const label = createLabelElement('', '');
  label.setAttribute('for', 'toggle-password');
  const input = createInputElement('');
  input.setAttribute('id', 'toggle-password');
  input.type = 'checkbox';
  wrapper.append(label, input);
  return wrapper;
};

const createPersonalDataBlock = (): HTMLFieldSetElement => {
  const personalDataBlock = createFieldsetElement();
  personalDataBlock.classList.add('form__fieldset_personal');
  const headingOfBlock = createLegendElement('personal data');
  personalDataFields.forEach((field) => {
    const { label, id, type, required } = field;
    const personalField = createWrapperFieldElement();
    const labelElement = createLabelElement(label, id);
    const input = createInputElement(id, required, type);
    const errorText = createElement('span', ['form__error-text']);
    if (id === 'password') {
      const showPassword = generateShowPasswordCheckbox();
      personalField.append(labelElement, input, showPassword, errorText);
    }
    personalField.append(labelElement, input, errorText);
    personalDataBlock.append(personalField);
  });
  personalDataBlock.append(headingOfBlock);
  return personalDataBlock;
};

const createSelectCountryElement = async (typeAddress: string): Promise<HTMLDivElement> => {
  const wrapper = createWrapperFieldElement();
  const select = createElement('select', ['form__select']);
  select.id = `${typeAddress}-countries`;
  const label = createLabelElement('Country:', select.id);
  const countries = await getCountries();
  countries.forEach((country) => {
    const option = createElement('option', ['form__option']);
    option.textContent = country;
    select.append(option);
  });
  wrapper.append(label, select);
  return wrapper;
};

const createAddressesDataBlock = (type: string): HTMLFieldSetElement => {
  const addressesDataBlock = createFieldsetElement();
  const classForAddress = type === 'Billing' ? 'form__fieldset_billing' : 'form__fieldset_shipping';
  addressesDataBlock.classList.add(`${classForAddress}`);
  const legend = createLegendElement(`${type} address data`);
  addressesDataFields.forEach(async (addressData) => {
    const addressField = createWrapperFieldElement();
    const { id, text, required } = addressData;
    const label = createLabelElement(text, `${id}${type}`);
    const input = createInputElement(`${id}${type}`, required);
    const errorText = createElement('span', ['form__error-text']);
    if (id === 'country') {
      const selectCountryElement = await createSelectCountryElement(type);
      addressField.classList.add('form__wrapper-field_countries');
      addressField.append(selectCountryElement);
    } else if (id === 'default' || id === 'mergeAddresses') {
      input.type = 'checkbox';
      addressField.classList.add('form__wrapper-field_checkbox');
      addressField.append(label, input);
      if (type === 'Shipping' && id === 'mergeAddresses') {
        addressField.hidden = true;
      }
    } else if (input.type === 'checkbox') {
      input.removeAttribute('required');
      addressField.classList.add('form__wrapper-field_checkbox');
    } else {
      addressField.append(label, input, errorText);
    }
    addressesDataBlock.append(addressField);
  });
  addressesDataBlock.append(legend);
  return addressesDataBlock;
};

const createSubmitButton = (): HTMLButtonElement => {
  const button = createElement('button', ['button', 'form__button']);
  button.textContent = 'sign up';
  return button;
};

const createRedirectButton = (): HTMLButtonElement => {
  const button = createElement('button', ['button', 'form__button']);
  button.type = 'button';
  button.textContent = 'sign in';
  return button;
};

const createFormButtonsBlock = (): HTMLDivElement => {
  const block = createElement('div', ['form__buttons']);
  const submitButton = createSubmitButton();
  const toLoginButton = createRedirectButton();
  block.textContent = 'OR';
  block.append(toLoginButton);
  block.prepend(submitButton);
  return block;
};

const createNavButtonsBlock = (): HTMLDivElement => {
  const block = createElement('div', ['registration__form-buttons']);
  const prevButton = createElement('button', ['button', 'registration__form-button', 'registration__form-button_prev']);
  prevButton.textContent = 'back';
  prevButton.type = 'button';
  prevButton.disabled = true;
  const nextButton = createElement('button', ['button', 'registration__form-button', 'registration__form-button_next']);
  nextButton.textContent = 'next';
  nextButton.type = 'button';
  block.append(prevButton, nextButton);
  return block;
};

const generateFormView = (): HTMLDivElement => {
  const wrapper = createElement('div', ['registration__form-wrapper']);
  const form = createElement('form', ['registration__form', 'form']);
  const personalData = createPersonalDataBlock();
  const billingAddressesData = createAddressesDataBlock('Billing');
  const shippingAddressesData = createAddressesDataBlock('Shipping');
  const buttonsBlock = createFormButtonsBlock();
  const navButtonsBlock = createNavButtonsBlock();
  form.append(personalData, billingAddressesData, shippingAddressesData, buttonsBlock);
  wrapper.append(form, navButtonsBlock);
  return wrapper;
};

const bindEvents = (parentElement: HTMLElement): void => {
  const personalData = parentElement.querySelector('.form__fieldset_personal');
  personalData?.addEventListener('input', validationPersonalData);
  personalData?.addEventListener('click', isShowed);
  const billingAddressData = parentElement.querySelector('.form__fieldset_billing');
  billingAddressData?.addEventListener('input', validationAddressData);
  const shippingAddressData = parentElement.querySelector('.form__fieldset_shipping');
  shippingAddressData?.addEventListener('input', validationAddressData);
  const sendButtons = parentElement.querySelector('.form__buttons');
  sendButtons?.addEventListener('click', sendForm);
  const mergeAddresses = parentElement.querySelector('#mergeAddressesBilling');
  mergeAddresses?.addEventListener('click', hideShippingAddressField);
  parentElement.querySelector('.registration__form-buttons')?.addEventListener('click', moveForm);
};

const generateRegistrationPageView = (): HTMLElement => {
  const section = createElement('section', ['registration']);
  const title = createHeadingElement();
  const form = generateFormView();
  section.append(title, form);
  bindEvents(form);
  return section;
};

export const getRegistrationPageView = generateRegistrationPageView();
