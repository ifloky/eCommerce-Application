import { postAnonymousFlow } from "../../shared/API";
import { redirectToHomePage } from "../../shared/router";
import { FieldsInfo } from "../../types/interfaces/interfaces";
import { RegistrationInfo, Address } from "../../types/interfaces/interfaces";

export const registrationInfo: RegistrationInfo = {
  id: '',
  version: 1,
  versionModifiedAt: new Date(),
  lastMessageSequenceNumber: 1,
  createdAt: new Date(),
  lastModifiedAt: new Date(),
  lastModifiedBy: {
    "clientId": "",
    "isPlatformClient": false
  },
  createdBy: {
    clientId: "",
    isPlatformClient: false
  },
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  addresses: [],
  defaultShippingAddressId: '',
  defaultBillingAddressId: '',
  shippingAddressIds: [],
  billingAddressIds: [],
  isEmailVerified: false,
  stores: [],
  authenticationMode: "Password",
}

export const registrationFieldsInfo: FieldsInfo[] = [
  { for: 'email', text: 'E-mail', type: 'email', id: 'email', class: 'email' },
  { for: 'password', text: 'Password', type: 'password', id: 'password', class: 'password' },
  { for: 'firstName', text: 'First name', type: 'text', id: 'firstName', class: 'firstName' },
  { for: 'lastName', text: 'Last name', type: 'text', id: 'lastName', class: 'lastName' },
  { for: 'date', text: 'Date of Birth', type: 'date', id: 'dateOfBirth', class: 'date' },
];


export function showHidePassword(): void {
  const passEye = document.querySelector('.password-control');
  const input = document.querySelector('.input-password');
  passEye?.addEventListener('click', () => {
    if (input?.getAttribute('type') === 'password') {
      passEye?.classList.add('no-view');
      input.setAttribute('type', 'text');
    } else {
      passEye?.classList.remove('no-view');
      input?.setAttribute('type', 'password');
    }
  })
}

export function getBillingAddresses(): Address[] {
  const billingStreetInput: HTMLInputElement | null = document.querySelector('input[name="billing-street"]');
  const billingCityInput: HTMLInputElement | null = document.querySelector('input[name="billing-city"]');
  const billingPostalCodeInput: HTMLInputElement | null = document.querySelector('input[name="billing-postal-code"]');
  const billingCountryInput: HTMLInputElement | null = document.querySelector('select[name="billing-country"]');
  const defaultBillingCheckbox = document.getElementById('defaultBilling') as HTMLInputElement;
  const billingAddresses: Address[] = [];

  if (defaultBillingCheckbox.checked) {
    billingAddresses.push({
      addressId: "BA",
      street: billingStreetInput?.value || '',
      city: billingCityInput?.value || '',
      postalCode: billingPostalCodeInput?.value || '',
      country: billingCountryInput?.value || '',
    });
  }

  return billingAddresses;
}

export function getShippingAddresses(): Address[] {
  const shippingStreetInput: HTMLInputElement | null = document.querySelector('input[name="shipping-street"]');
  const shippingCityInput: HTMLInputElement | null = document.querySelector('input[name="shipping-city"]');
  const shippingPostalCodeInput: HTMLInputElement | null = document.querySelector('input[name="shipping-postal-code"]');
  const shippingCountryInput: HTMLInputElement | null = document.querySelector('select[name="shipping-country"]');
  const defaultShippingCheckbox = document.getElementById('defaultShipping') as HTMLInputElement;
  const shippingAddresses: Address[] = [];

  if (defaultShippingCheckbox.checked) {
    shippingAddresses.push({
      addressId: "SA",
      street: shippingStreetInput?.value || '',
      city: shippingCityInput?.value || '',
      postalCode: shippingPostalCodeInput?.value || '',
      country: shippingCountryInput?.value || '',
    });
  }

  return shippingAddresses;
}

export function receiveInfoAfterSubmit(submitButton: HTMLButtonElement): void {
  submitButton.addEventListener('click', async (event: Event) => {
    event.preventDefault();
    const filledForm = document.querySelectorAll('.form-input') as NodeList;

    filledForm.forEach((inputField) => {
      const input = inputField as HTMLInputElement;
      if (input.id === 'email' || input.id === 'password' || input.id === 'firstName' || input.id === 'lastName' || input.id === 'dateOfBirth') {
        registrationInfo[input.id] = input.value;
      }
    });

    const billingAddresses = getBillingAddresses();
    const shippingAddresses = getShippingAddresses();

    registrationInfo.addresses = [...billingAddresses, ...shippingAddresses];
    registrationInfo.defaultBillingAddressId = registrationInfo.addresses[0].addressId;
    registrationInfo.defaultShippingAddressId = registrationInfo.addresses[1].addressId
    const response = await postAnonymousFlow('/customers', registrationInfo);
    try {
      redirectToHomePage()
    } catch (error) {
      throw Error('' + error)
    }
    return response;
  });
}

export function validationForm(registrationUser: HTMLElement): void {
  const formInputs = registrationUser.querySelectorAll('.form-input');
  registrationUser.querySelector('.registration-form')?.addEventListener('submit', (event) => {
    let isValid = true;
    formInputs.forEach((input) => {
      isValid = false;
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.textContent = 'This field is required.';
      input.parentElement?.appendChild(errorMessage);
    });

    if (!isValid) {
      event.preventDefault();
    }
  });
}
