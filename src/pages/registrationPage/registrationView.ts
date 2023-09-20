import { receiveInfoAfterSubmit, registrationFieldsInfo } from './RegistrationController';
import { FieldsInfo } from '../../types/interfaces/interfaces';
import { createElement } from '../../utils/abstract';

let registrationFieldForm: string = '';

export function createRegistrationFields(array: FieldsInfo[]): string {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].for === 'password') {
      registrationFieldForm += `
        <div class="registration-form__input-password">
          <label for="${array[i].for}" class="form-label">${array[i].text}*</label>
          <input type="${array[i].type}" name="${array[i].id}" id="${array[i].id}" class="form-input input-${array[i].class}">
          <div href='' class="password-control"></div>
        </div>`;
    } else {
      registrationFieldForm += `
      <div class="registration-form__input">
        <label for="${array[i].for}" class="form-label">${array[i].text}*</label>
        <input type="${array[i].type}" name="${array[i].id}" id="${array[i].id}" class="form-input input-${array[i].class}">
      </div>`;
    }
  }
  return registrationFieldForm;
}

function returnBillingAddressTemplate(): string {
  const template = `<div class="registration-form__billing-address">
          <p class="registration-form__address-name">Billing address</p>
          <div class="registration-form-default">
            <input type="checkbox" id="defaultBilling" name="defaultBilling" value="defaultBilling">
            <label for="defaultBilling">Make default</label>          
          </div> 
          <div class="registration-form__input">
            <label for="billing-street" class="form-label">Street*</label>
            <input type="text" name="billing-street" id="billing-street" class="form-input input-address">
          </div>
          <div class="registration-form__input">
            <label for="billing-city" class="form-label">City*</label>
            <input type="text" name="billing-city" id="billing-city" class="form-input input-city">
          </div>
          <div class="registration-form__input">
            <label for="billing-postal-code" class="form-label">Postal-code*</label>
            <input type="text" name="billing-postal-code" id="billing-postal-code" class="form-input input-postal-code">
          </div>
          <div class="registration-form__input">
            <label for="billing-country" class="form-label">Country*</label>
            <select  name="billing-country" id="billing-country" list="list" class="form-input input-country">
              <option value="US" selected>USA</option>
              <option value="US">United States</option>
            </select>
          </div>
        </div>`;
  return template;
}

function returnShippingAddressTemplate(): string {
  const template = `<div class="registration-form__shipping-address">
          <p class="registration-form__address-name">Shipping address</p>
          <div class="registration-form-default">
            <input type="checkbox" id="defaultShipping" name="defaultShipping" value="defaultShipping">
            <label for="defaultShipping">Make default</label>          
          </div> 
          <div class="registration-form__input">
            <label for="shipping-street" class="form-label">Street*</label>
            <input type="text" name="shipping-street" id="shipping-street" class="form-input input-address">
          </div>
          <div class="registration-form__input">
            <label for="shipping-city" class="form-label">City*</label>
            <input type="text" name="shipping-city" id="shipping-city" class="form-input input-city">
          </div>
          <div class="registration-form__input">
            <label for="shipping-postal-code" class="form-label">Postal-code*</label>
            <input type="text" name="shipping-postal-code" id="shipping-postal-code" class="form-input input-postal-code">
          </div>
          <div class="registration-form__input">
            <label for="shipping-country" class="form-label">Country*</label>
            <select  name="shipping-country" id="shipping-country" list="list" class="form-input input-country">
              <option value="US" selected>USA</option>
              <option value="US">United States</option>
            </select> 
          </div>
        </div>`;
  return template;
}

const registrationUser = document.createElement('div');
registrationUser.className = 'registration';
registrationUser.innerHTML = `<h2 class="registration-title">Registration</h2>
      <form class="registration-form" action=''>
      ${createRegistrationFields(registrationFieldsInfo)}
      <div class="registration-form__address-wrapper">
        ${returnBillingAddressTemplate()}
        ${returnShippingAddressTemplate()}
      </div>
      <input type="checkbox" id="oneAddress" name="oneAddress" value="oneAddress">
      <label for="oneAddress">Use billing as shipping</label>
      <button class="button btn-registration" type="submit">Register</button>
      <p>Already have an account? <a href='/login'>Sign in</a></p>
      </form>
      `;

function switchEye(passEye: Element): void {
  const input = registrationUser.querySelector('.input-password');
  if (input?.getAttribute('type') === 'password') {
    passEye?.classList.add('no-view');
    input.setAttribute('type', 'text');
  } else {
    passEye?.classList.remove('no-view');
    input?.setAttribute('type', 'password');
  }
}

const passEye = registrationUser.querySelector('.password-control');
passEye?.addEventListener('click', () => switchEye(passEye));

const submitButton = registrationUser.querySelector('.btn-registration') as HTMLButtonElement;
const form = registrationUser.querySelector('.registration-form') as HTMLFormElement;

export default function RegistrationPageView(): HTMLElement {
  receiveInfoAfterSubmit(submitButton);
  return registrationUser;
}

function validationEmail(): void {
  const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errorElement = createElement('div', ['error-message']);
  emailInput.parentNode?.appendChild(errorElement);

  emailInput.addEventListener('input', () => {
    if (!emailRegex.test(emailInput.value)) {
      emailInput.classList.add('invalid-input');
      errorElement.textContent = 'Email should look like user @gmail.com';
    } else {
      emailInput.classList.remove('invalid-input');
      errorElement.textContent = '';
    }
  });
}

function validationPassword(): void {
  const passwordInput = form.querySelector('input[name="password"]') as HTMLInputElement;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/;
  const errorElement = createElement('div', ['error-message']);
  passwordInput.parentNode?.appendChild(errorElement);

  passwordInput.addEventListener('input', () => {
    if (!passwordRegex.test(passwordInput.value)) {
      passwordInput.classList.add('invalid-input');
      errorElement.textContent = 'Password must contain uppercase, lowercase, and a number. No spaces allowed.';
    } else {
      passwordInput.classList.remove('invalid-input');
      errorElement.textContent = '';
    }
  });
}

function validationDate(): void {
  const dateOfBirthInput = form.querySelector('input[name="dateOfBirth"]') as HTMLInputElement;
  const today = new Date();
  const minAgeDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
  const errorElement = createElement('div', ['error-message']);
  dateOfBirthInput.parentNode?.appendChild(errorElement);

  dateOfBirthInput.addEventListener('input', () => {
    const selectedDate = new Date(dateOfBirthInput.value);
    if (selectedDate > minAgeDate) {
      dateOfBirthInput.classList.add('invalid-input');
      errorElement.textContent = 'You must be at least 13 years old';
    } else {
      dateOfBirthInput.classList.remove('invalid-input');
      errorElement.textContent = '';
    }
  });
}

function validationTextArea([...arg]): void {
  for (let i = 0; i < arg.length; i++) {
    const element = arg[i];
    const errorElement = createElement('div', ['error-message']);
    element.parentNode?.appendChild(errorElement);
    const nameRegex = /^[a-zA-Z]+$/;
    element.addEventListener('input', () => {
      if (!nameRegex.test(element.value)) {
        element.classList.add('invalid-input');
        errorElement.textContent = 'The field must not contain any special characters or numbers';
      } else {
        element.classList.remove('invalid-input');
        errorElement.textContent = '';
      }
    });
  }
}

const oneAddressCheckbox = registrationUser.querySelector('#oneAddress') as HTMLInputElement;

oneAddressCheckbox.addEventListener('change', () => {
  const billingStreetInput = form.querySelector('input[name="billing-street"]') as HTMLInputElement;
  const shippingStreetInput = form.querySelector('input[name="shipping-street"]') as HTMLInputElement;
  if (oneAddressCheckbox.checked) {
    shippingStreetInput.value = billingStreetInput.value;
  }
});

function validationStart(): void {
  const firstNameInput = form.querySelector('input[name="firstName"]') as HTMLInputElement;
  const lastNameInput = form.querySelector('input[name="lastName"]') as HTMLInputElement;
  const billingStreetInput = form.querySelector('input[name="billing-street"]') as HTMLInputElement;
  const billingCityInput = form.querySelector('input[name="billing-city"]') as HTMLInputElement;
  const shippingStreetInput = form.querySelector('input[name="shipping-street"]') as HTMLInputElement;
  const shippingCityInput = form.querySelector('input[name="shipping-city"]') as HTMLInputElement;
  validationTextArea([
    firstNameInput,
    lastNameInput,
    billingCityInput,
    billingStreetInput,
    shippingCityInput,
    shippingStreetInput,
  ]);
}

validationStart();
validationEmail();
validationPassword();
validationDate();
