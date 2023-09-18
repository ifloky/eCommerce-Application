import { createElement } from '../../utils/abstract';
import { isValidForm } from './registrationPageController';

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
    id: 'first-name',
    label: 'First name *:',
    required: true,
  },
  {
    id: 'middle-name',
    label: 'Middle name:',
  },
  {
    id: 'last-name',
    label: 'Last name *:',
    required: true,
  },
  {
    type: 'date',
    id: 'date-of-birth',
    label: 'Date of birth *:',
    required: true,
  },
];

const addressesDataFields = [
  {
    id: 'street-number',
    text: 'Street number:',
  },
  {
    id: 'street-name',
    text: 'Street name *:',
    required: true,
  },
  {
    id: 'building',
    text: 'Building *:',
  },
  {
    id: 'apartment',
    text: 'Apartment/Suite *:',
    required: true,
  },
  {
    id: 'city',
    text: 'City *:',
    required: true,
  },
  {
    id: 'postal-code',
    text: 'Postal code *:',
    required: true,
  },
  {
    id: 'region',
    text: 'Region:',
  },
  {
    id: 'state',
    text: 'State:',
  },
  {
    id: 'country',
    text: 'Country *:',
    required: true,
  },
];

const typesOfAddresses = [
  'Choose type of your address',
  'Billing',
  'Shipping',
  'Shipping and Billing',
  'Billing default',
  'Shipping default',
  'Shipping and Billing default',
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
  label.setAttribute('for', 'toggle');
  const input = createInputElement('');
  input.setAttribute('id', 'toggle-password');
  input.type = 'checkbox';
  wrapper.append(label, input);
  return wrapper;
};

const createPersonalDataBlock = (): HTMLFieldSetElement => {
  const personalDataBlock = createFieldsetElement();
  const headingOfBlock = createLegendElement('personal data');
  personalDataFields.forEach((field) => {
    const { label, id, type, required } = field;
    const personalField = createWrapperFieldElement();
    const labelElement = createLabelElement(label, id);
    const input = createInputElement(id, required, type);
    const errorText = createElement('span', ['form__error-text']);
    if (id === 'email') {
      errorText.classList.add('form__error-text_email');
      personalField.append(labelElement, input, errorText);
    }
    if (id === 'password') {
      errorText.classList.add('form__error-text_password');
      const showPassword = generateShowPasswordCheckbox();
      personalField.append(labelElement, input, showPassword, errorText);
    }
    personalField.append(labelElement, input, errorText);
    personalDataBlock.append(personalField);
  });
  personalDataBlock.append(headingOfBlock);
  return personalDataBlock;
};

const generateSelectAddressesElement = (): HTMLDivElement => {
  const wrapperForSelect = createWrapperFieldElement();
  const labelForSelect = createLabelElement('Choose type of your address *:', 'select-address');
  const select = createElement('select', ['form__select']);
  select.id = 'select-address';
  select.required = true;
  typesOfAddresses.forEach((typeOfAddress) => {
    const option = createElement('option', ['form__option']);
    if (typeOfAddress === 'Choose type of your address') {
      option.disabled = true;
      option.selected = true;
    }
    option.textContent = typeOfAddress;
    select.append(option);
  });
  wrapperForSelect.append(labelForSelect, select);
  return wrapperForSelect;
};

const createAddressesDataBlock = (): HTMLFieldSetElement => {
  const addressesDataBlock = createFieldsetElement();
  const legend = createLegendElement('addresses data');
  const selectAddressType = generateSelectAddressesElement();
  addressesDataFields.forEach((addressData) => {
    const { id, text } = addressData;
    const label = createLabelElement(text, id);
    const input = createInputElement(id, true);
    const addressField = createWrapperFieldElement();
    addressField.append(label, input);
    addressesDataBlock.append(addressField);
  });
  addressesDataBlock.prepend(legend, selectAddressType);
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

const generateFormView = (): HTMLFormElement => {
  const form = createElement('form', ['registration__form', 'form']);
  const personalData = createPersonalDataBlock();
  const addressesData = createAddressesDataBlock();
  const buttonsBlock = createFormButtonsBlock();
  form.append(personalData, addressesData, buttonsBlock);
  return form;
};

const bindEvents = (parentElement: HTMLElement): void => {
  parentElement.addEventListener('input', isValidForm);
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
