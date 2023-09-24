import { redirectToHomePage, redirectToLoginPage } from '../../shared/router';
import { AddressesData, PersonalData, RegistrationData } from '../../types/interfaces/customerData';
import { validationEmail, validationPassword } from '../../widgets/forms/forms';
import { createNewCustomer } from './registrationPageModel';

/* eslint-disable no-console */

export const moveForm = (event: Event): void => {
  const { target } = event;
  if (target instanceof HTMLButtonElement) {
    const movedElement = document.querySelector('.form');
    const prev = target.parentElement?.querySelector('.registration__form-button_prev');
    const next = target.parentElement?.querySelector('.registration__form-button_next');
    let slideCount = Number(movedElement?.getAttribute('data-slide'));
    if (prev instanceof HTMLButtonElement && next instanceof HTMLButtonElement) {
      if (target.textContent === 'back' && slideCount !== 1) {
        next.disabled = false;
        slideCount--;
        movedElement?.setAttribute('data-slide', `${slideCount}`);
        if (slideCount === 1) {
          target.disabled = true;
        }
      }
      const countAllChildren = movedElement?.children;
      if (countAllChildren && target.textContent === 'next' && slideCount <= countAllChildren.length) {
        [...countAllChildren].forEach((child) => {
          if (child.classList.contains('hidden')) {
            target.disabled = true;
          }
        });
        if (!movedElement?.getAttribute('data-slide')) {
          slideCount = 1;
        }
        slideCount++;
        prev.disabled = false;
        movedElement?.setAttribute('data-slide', `${slideCount}`);
        if (slideCount === countAllChildren.length) target.disabled = true;
      }
    }
  }
};

const validationText = (element: HTMLInputElement): boolean => {
  let isValid = false;
  const name = element.value;
  const namePattern = /^[A-Za-z]*$/;
  const parent = element.parentElement;
  const errorMessage = parent?.querySelector('.form__error-text');
  if (errorMessage) {
    errorMessage.textContent = '';
    if (!name.match(namePattern)) {
      errorMessage.textContent = 'Must contain at least one character and no special characters or numbers';
      return isValid;
    }
    isValid = !isValid;
  }
  return isValid;
};

const validationPostalCode = (element: HTMLInputElement): boolean => {
  let isValid = false;
  const parentForm = element.closest('.form__fieldset');
  const country = parentForm?.querySelector('select');
  const errorText = element.parentElement?.querySelector('.form__error-text');
  if (country instanceof HTMLSelectElement) {
    if (country.value === 'US') {
      const { value } = element;
      const postalCodePattern = /^\d{5}$/;
      if (!value.match(postalCodePattern) && errorText)
        errorText.textContent = 'Postal code must contain five digits (e.g. 12345)';
      if (value.match(postalCodePattern) && errorText) {
        errorText.textContent = '';
        isValid = !isValid;
      }
    }
  }
  return isValid;
};

const validationDate = (element: HTMLElement): boolean => {
  let isValid = false;
  const parent = element.parentElement;
  const errorText = parent?.querySelector('.form__error-text');
  if (element instanceof HTMLInputElement && errorText) {
    const inputDate = Number(new Date(element.value).getTime());
    const currentDate = new Date().getTime();
    const diffDate = (currentDate - inputDate) / (1000 * 3600 * 24 * 365.25);
    isValid = diffDate >= 13;
    if (!isValid) {
      errorText.textContent = 'Our store can`t provide access to anyone under 13 y.o.';
    } else {
      errorText.textContent = '';
    }
  }
  return isValid;
};

const checkInput = (input: HTMLInputElement): boolean => {
  const isValid = false;
  const parent = input.parentElement;
  const error = parent?.querySelector('.form__error-text');
  if (input.required) {
    if (input.value.length && !error?.textContent) {
      return !isValid;
    }
  } else {
    return !isValid;
  }
  return isValid;
};

const getPersonalData = (): PersonalData => {
  const personalData = new Map();
  const personalBlock = document.querySelector('.form__fieldset_personal');
  const allInputs = personalBlock?.querySelectorAll('.form__input');
  allInputs?.forEach((input) => {
    if (input instanceof HTMLInputElement) {
      const isValid = checkInput(input);
      if (isValid && input.type !== 'checkbox') {
        const key = input.id;
        const { value } = input;
        personalData.set(key, value);
      }
    }
  });
  return Object.fromEntries(personalData);
};

export const hideShippingAddressField = (): void => {
  const shippingAddressBlock = document.querySelector('.form__fieldset_shipping');
  if (shippingAddressBlock) shippingAddressBlock.classList.toggle('hidden');
};

const getBillingAddressData = (): AddressesData[] => {
  const billingAddressData = new Map();
  const billingAddressBlock = document.querySelector('.form__fieldset_billing');
  const allInputs = billingAddressBlock?.querySelectorAll('.form__input');
  allInputs?.forEach((input) => {
    if (input instanceof HTMLInputElement) {
      const isValid = checkInput(input);
      if (isValid) {
        const key = input.id;
        const { checked, value } = input;
        if (input.type === 'checkbox') {
          billingAddressData.set(key, checked);
        } else {
          billingAddressData.set(key, value);
        }
      }
    }
  });
  const country = billingAddressBlock?.querySelector('.form__select');
  if (country instanceof HTMLSelectElement) billingAddressData.set('country', country.value);
  const addressDataSource = Object.fromEntries(billingAddressData);
  const billingAddress = [];
  const addressData: AddressesData = {
    id: 'BA',
    streetName: addressDataSource.streetNameBilling,
    city: addressDataSource.cityBilling,
    postalCode: addressDataSource.postalCodeBilling,
    country: addressDataSource.country,
    default: addressDataSource.defaultBilling,
    merge: addressDataSource.mergeAddressesBilling,
  };
  if (addressDataSource.defaultBilling) addressData.default = true;
  billingAddress.push(addressData);
  return billingAddress;
};

const getShippingAddressData = (): AddressesData[] => {
  const shippingAddressData = new Map();
  const shippingAddressBlock = document.querySelector('.form__fieldset_shipping');
  const allInputs = shippingAddressBlock?.querySelectorAll('.form__input');
  allInputs?.forEach((input) => {
    if (input instanceof HTMLInputElement) {
      const isValid = checkInput(input);
      if (isValid) {
        const key = input.id;
        const { checked, value } = input;
        if (input.type === 'checkbox') {
          shippingAddressData.set(key, checked);
        } else {
          shippingAddressData.set(key, value);
        }
      }
    }
  });
  const country = shippingAddressBlock?.querySelector('.form__select');
  if (country instanceof HTMLSelectElement) shippingAddressData.set('country', country.value);
  const addressDataSource = Object.fromEntries(shippingAddressData);
  const shippingAddress: AddressesData[] = [];
  const addressData = {
    id: 'SA',
    streetName: addressDataSource.streetNameShipping,
    city: addressDataSource.cityShipping,
    postalCode: addressDataSource.postalCodeShipping,
    country: addressDataSource.country,
    default: addressDataSource.defaultShipping,
    merge: addressDataSource.mergeAddressesShipping,
  };
  if (addressDataSource.defaultShipping) addressData.default = true;
  shippingAddress.push(addressData);
  return shippingAddress;
};

const getRegistrationData = (): RegistrationData => {
  const personalData = getPersonalData();
  const billingAddressData = getBillingAddressData();
  let shippingAddressData = getShippingAddressData();
  const customerData = Object.assign(personalData);
  billingAddressData.forEach((address) => {
    if (address.default && address.id === 'BA') {
      customerData.defaultBillingAddress = 0;
    }
    if (address.merge === true) {
      shippingAddressData = billingAddressData;
    }
  });
  shippingAddressData.forEach((address) => {
    if (address.default && address.id === 'SA') {
      customerData.defaultShippingAddress = 1;
    }
  });
  customerData.addresses = [...billingAddressData, ...shippingAddressData];
  return customerData;
};

export const sendForm = async (event: Event): Promise<void> => {
  const { target } = event;
  if (target instanceof HTMLButtonElement) {
    if (target.type === 'submit') {
      const registrationData = getRegistrationData();
      const res = await createNewCustomer(registrationData);
      if (res) {
        redirectToHomePage();
      }
    } else {
      redirectToLoginPage();
    }
  }
  event.preventDefault();
};

export const validationPersonalData = (event: Event): void => {
  const { target } = event;
  if (target instanceof HTMLInputElement) {
    if (target.id === 'email') {
      validationEmail(target);
    }
    if (target.id === 'password') {
      validationPassword(target);
    }
    if (target.id === 'firstName' || target.id === 'lastName') {
      validationText(target);
    }
    if (target.id === 'dateOfBirth') {
      validationDate(target);
    }
  }
};

export const validationAddressData = (event: Event): void => {
  const { target } = event;
  if (target instanceof HTMLInputElement) {
    if (target.type === 'text') validationText(target);
    if (target.id === 'postalCodeBilling' || target.id === 'postalCodeShipping') {
      validationPostalCode(target);
    }
  }
};

// import { postAnonymousFlow } from '../../shared/API';
// import { redirectToHomePage } from '../../shared/router';
// import { FieldsInfo } from '../../types/interfaces/interfaces';
// import { RegistrationInfo, Address } from '../../types/interfaces/interfaces';

// export const registrationInfo: RegistrationInfo = {
//   id: '',
//   version: 1,
//   versionModifiedAt: new Date(),
//   lastMessageSequenceNumber: 1,
//   createdAt: new Date(),
//   lastModifiedAt: new Date(),
//   lastModifiedBy: {
//     clientId: '',
//     isPlatformClient: false,
//   },
//   createdBy: {
//     clientId: '',
//     isPlatformClient: false,
//   },
//   email: '',
//   password: '',
//   firstName: '',
//   lastName: '',
//   dateOfBirth: '',
//   addresses: [],
//   defaultShippingAddressId: '',
//   defaultBillingAddressId: '',
//   shippingAddressIds: [],
//   billingAddressIds: [],
//   isEmailVerified: false,
//   stores: [],
//   authenticationMode: 'Password',
// };

// export const registrationFieldsInfo: FieldsInfo[] = [
//   { for: 'email', text: 'E-mail', type: 'email', id: 'email', class: 'email' },
//   { for: 'password', text: 'Password', type: 'password', id: 'password', class: 'password' },
//   { for: 'firstName', text: 'First name', type: 'text', id: 'firstName', class: 'firstName' },
//   { for: 'lastName', text: 'Last name', type: 'text', id: 'lastName', class: 'lastName' },
//   { for: 'date', text: 'Date of Birth', type: 'date', id: 'dateOfBirth', class: 'date' },
// ];

// export function showHidePassword(): void {
//   const passEye = document.querySelector('.password-control');
//   const input = document.querySelector('.input-password');
//   passEye?.addEventListener('click', () => {
//     if (input?.getAttribute('type') === 'password') {
//       passEye?.classList.add('no-view');
//       input.setAttribute('type', 'text');
//     } else {
//       passEye?.classList.remove('no-view');
//       input?.setAttribute('type', 'password');
//     }
//   });
// }

// export function getBillingAddresses(): Address[] {
//   const billingStreetInput: HTMLInputElement | null = document.querySelector('input[name="billing-street"]');
//   const billingCityInput: HTMLInputElement | null = document.querySelector('input[name="billing-city"]');
//   const billingPostalCodeInput: HTMLInputElement | null = document.querySelector('input[name="billing-postal-code"]');
//   const billingCountryInput: HTMLInputElement | null = document.querySelector('select[name="billing-country"]');
//   const defaultBillingCheckbox = document.getElementById('defaultBilling') as HTMLInputElement;
//   const billingAddresses: Address[] = [];

//   if (defaultBillingCheckbox.checked) {
//     billingAddresses.push({
//       addressId: 'BA',
//       street: billingStreetInput?.value || '',
//       city: billingCityInput?.value || '',
//       postalCode: billingPostalCodeInput?.value || '',
//       country: billingCountryInput?.value || '',
//     });
//   }

//   return billingAddresses;
// }

// export function getShippingAddresses(): Address[] {
//   const shippingStreetInput: HTMLInputElement | null = document.querySelector('input[name="shipping-street"]');
//   const shippingCityInput: HTMLInputElement | null = document.querySelector('input[name="shipping-city"]');
//   const shippingPostalCodeInput: HTMLInputElement | null = document.querySelector('input[name="shipping-postal-code"]');
//   const shippingCountryInput: HTMLInputElement | null = document.querySelector('select[name="shipping-country"]');
//   const defaultShippingCheckbox = document.getElementById('defaultShipping') as HTMLInputElement;
//   const shippingAddresses: Address[] = [];

//   if (defaultShippingCheckbox.checked) {
//     shippingAddresses.push({
//       addressId: 'SA',
//       street: shippingStreetInput?.value || '',
//       city: shippingCityInput?.value || '',
//       postalCode: shippingPostalCodeInput?.value || '',
//       country: shippingCountryInput?.value || '',
//     });
//   }

//   return shippingAddresses;
// }

// export function receiveInfoAfterSubmit(submitButton: HTMLButtonElement): void {
//   submitButton.addEventListener('click', async (event: Event) => {
//     event.preventDefault();
//     const filledForm = document.querySelectorAll('.form-input') as NodeList;

//     filledForm.forEach((inputField) => {
//       const input = inputField as HTMLInputElement;
//       if (
//         input.id === 'email' ||
//         input.id === 'password' ||
//         input.id === 'firstName' ||
//         input.id === 'lastName' ||
//         input.id === 'dateOfBirth'
//       ) {
//         registrationInfo[input.id] = input.value;
//       }
//     });

//     const billingAddresses = getBillingAddresses();
//     const shippingAddresses = getShippingAddresses();

//     registrationInfo.addresses = [...billingAddresses, ...shippingAddresses];
//     registrationInfo.defaultBillingAddressId = registrationInfo.addresses[0].addressId;
//     registrationInfo.defaultShippingAddressId = registrationInfo.addresses[1].addressId;
//     const response = await postAnonymousFlow('/customers', registrationInfo);
//     try {
//       redirectToHomePage();
//     } catch (error) {
//       throw Error('' + error);
//     }
//     return response;
//   });
// }

// export function validationForm(registrationUser: HTMLElement): void {
//   const formInputs = registrationUser.querySelectorAll('.form-input');
//   registrationUser.querySelector('.registration-form')?.addEventListener('submit', (event) => {
//     let isValid = true;
//     formInputs.forEach((input) => {
//       isValid = false;
//       const errorMessage = document.createElement('div');
//       errorMessage.className = 'error-message';
//       errorMessage.textContent = 'This field is required.';
//       input.parentElement?.appendChild(errorMessage);
//     });

//     if (!isValid) {
//       event.preventDefault();
//     }
//   });
// }
