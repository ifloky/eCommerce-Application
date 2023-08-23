import { receiveInfoAfterSubmit, registrationFieldsInfo } from './RegistrationController';
import { FieldsInfo } from '../../types/interfaces/interfaces';

let registrationFieldForm: string = '';

export function createRegistrationFields(array: FieldsInfo[]): string {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].for === 'password') {
      registrationFieldForm += `
        <div class="registration-form__input-password">
          <label for="${array[i].for}" class="form-label">${array[i].text}</label>
          <input type="${array[i].type}" name="${array[i].id}" id="${array[i].id}" class="form-input input-${array[i].class}">
          <div href='' class="password-control"></div>
        </div>`;
    } else {
      registrationFieldForm += `
      <div class="registration-form__input">
        <label for="${array[i].for}" class="form-label">${array[i].text}</label>
        <input type="${array[i].type}" name="${array[i].id}" id="${array[i].id}" class="form-input input-${array[i].class}">
      </div>`;
    }
  }
  return registrationFieldForm;
}

const registrationUser = document.createElement('div');
registrationUser.className = 'registration'
registrationUser.innerHTML = `<h2 class="registration-title">Registration</h2>
      <form class="registration-form" action=''>
      ${createRegistrationFields(registrationFieldsInfo)}
      <div class="registration-form__address-wrapper">
        <div class="registration-form__billing-address">
          <p class="registration-form__address-name">Billing address</p>
          <div class="registration-form-default">
            <input type="checkbox" id="default" name="default" value="default">
            <label for="terms">Make default</label>          
          </div> 
          <div class="registration-form__input">
            <label for="billing-street" class="form-label">Street</label>
            <input type="text" name="billing-street" id="billing-street" class="form-input input-address">
          </div>
          <div class="registration-form__input">
            <label for="billing-city" class="form-label">City</label>
            <input type="text" name="billing-city" id="billing-city" class="form-input input-city">
          </div>
          <div class="registration-form__input">
            <label for="billing-postal-code" class="form-label">Postal-code</label>
            <input type="text" name="billing-postal-code" id="billing-postal-code" class="form-input input-postal-code">
          </div>
          <div class="registration-form__input">
            <label for="billing-country" class="form-label">Country</label>
            <select  name="billing-country" id="billing-country" list="list" class="form-input input-country">
              <option value="US" selected>USA</option>
              <option value="US">United States</option>
            </select>
          </div>
        </div>
        <div class="registration-form__shipping-address">
          <p class="registration-form__address-name">Shipping address</p>
          <div class="registration-form-default">
            <input type="checkbox" id="default" name="default" value="default">
            <label for="terms">Make default</label>          
          </div> 
          <div class="registration-form__input">
            <label for="shipping-street" class="form-label">Street</label>
            <input type="text" name="shipping-street" id="shipping-street" class="form-input input-address">
          </div>
          <div class="registration-form__input">
            <label for="shipping-city" class="form-label">City</label>
            <input type="text" name="shipping-city" id="shipping-city" class="form-input input-city">
          </div>
          <div class="registration-form__input">
            <label for="shipping-postal-code" class="form-label">Postal-code</label>
            <input type="text" name="shipping-postal-code" id="shipping-postal-code" class="form-input input-postal-code">
          </div>
          <div class="registration-form__input">
            <label for="shipping-country" class="form-label">Country</label>
            <select  name="shipping-country" id="shipping-country" list="list" class="form-input input-country">
              <option value="US" selected>USA</option>
              <option value="US">United States</option>
            </select> 
          </div>
        </div>
      </div>
      <input type="checkbox" id="terms" name="terms" value="terms">
      <label for="terms">Use billing as shipping</label>
      <button class="btn btn-registration" type="submit">Register</button>
      <p>Already have an account? <a href=''>Sign in</a></p>
      </form>
      `;


const passEye = registrationUser.querySelector('.password-control');
const input = registrationUser.querySelector('.input-password');
  passEye?.addEventListener('click', () => {
    if (input?.getAttribute('type') === 'password') {
      passEye?.classList.add('no-view');
      input.setAttribute('type', 'text');
    } else {
      passEye?.classList.remove('no-view');
      input?.setAttribute('type', 'password');
    }
  })

const submitButton = registrationUser.querySelector('.btn-registration') as HTMLButtonElement;
const form = registrationUser.querySelector('.registration-form') as HTMLFormElement;

export default function RegistrationPageView(): HTMLElement {
  receiveInfoAfterSubmit(submitButton);
  return registrationUser;
}

function validationEmail(): void {
  const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailInput.addEventListener('input', () => {
    if (!emailRegex.test(emailInput.value)) {
      emailInput.classList.add('invalid-input');
    } else {
      emailInput.classList.remove('invalid-input');
    }
  });
}

function validationPassword(): void {
  const passwordInput = form.querySelector('input[name="password"]') as HTMLInputElement;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  passwordInput.addEventListener('input', () => {
    if (!passwordRegex.test(passwordInput.value)) {
      passwordInput.classList.add('invalid-input');
    } else {
      passwordInput.classList.remove('invalid-input');
    }
  });
}

function validationName(): void {
  const firstNameInput = form.querySelector('input[name="firstName"]') as HTMLInputElement;
  const lastNameInput = form.querySelector('input[name="lastName"]') as HTMLInputElement;
  const nameRegex = /^[a-zA-Z]+$/;
  firstNameInput.addEventListener('input', () => {
    if (!nameRegex.test(firstNameInput.value)) {
      firstNameInput.classList.add('invalid-input');
    } else {
      firstNameInput.classList.remove('invalid-input');
    }
  });
  lastNameInput.addEventListener('input', () => {
    if (!nameRegex.test(lastNameInput.value)) {
      lastNameInput.classList.add('invalid-input');
    } else {
      lastNameInput.classList.remove('invalid-input');
    }
  });
}

function validationDate(): void {
  const dateOfBirthInput = form.querySelector('input[name="dateOfBirth"]') as HTMLInputElement;
  const today = new Date();
  const minAgeDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
  dateOfBirthInput.addEventListener('input', () => {
    const selectedDate = new Date(dateOfBirthInput.value);
    if (selectedDate > minAgeDate) {
      dateOfBirthInput.classList.add('invalid-input');
    } else {
      dateOfBirthInput.classList.remove('invalid-input');
    }
  });
}

validationEmail();
validationPassword();
validationName();
validationDate();