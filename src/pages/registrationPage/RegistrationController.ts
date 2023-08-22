import { post } from "../../shared/API";
import { FieldsInfo } from "../../types/interfaces/interfaces";
import { CustomerRegistrationInfo } from "../../types/interfaces/interfaces";

export const registrationInfo: CustomerRegistrationInfo = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  street: '',
  city: '',
  postcode: '',
  country: '',
  version: '1',
  addresses: [],
  authenticationMode: "Password",
  isEmailVerified: false
}

export const registrationFieldsInfo: FieldsInfo[] = [
  { for: 'email', text: 'E-mail', type: 'email', id: 'email', class: 'email' },
  { for: 'password', text: 'Password', type: 'password', id: 'password', class: 'password' },
  { for: 'firstName', text: 'First name', type: 'text', id: 'firstName', class: 'firstName' },
  { for: 'lastName', text: 'Last name', type: 'text', id: 'lastName', class: 'lastName' },
  { for: 'date', text: 'Date of Birth', type: 'date', id: 'dateOfBirth', class: 'date' },
  { for: 'street', text: 'Street', type: 'text', id: 'street', class: 'street' },
  { for: 'city', text: 'City', type: 'text', id: 'city', class: 'city' },
  { for: 'post', text: 'Postal code', type: 'text', id: 'postcode', class: 'post' },
  { for: 'country', text: 'Country', type: 'text', id: 'country', class: 'country' }
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

export function receiveInfoAfterSubmit(submitButton: HTMLButtonElement): void {
  submitButton.addEventListener('click', async (event: Event) => {
    event.preventDefault();
    const filledForm = document.querySelectorAll('.form-input') as NodeList;
    filledForm.forEach((inputField) => {
      const input = inputField as HTMLInputElement;
      registrationInfo[input.id] = input.value;
    });
    const response = await post('/customers', registrationInfo);
    return response;
  });
}

export function validationForm(registrationUser: HTMLElement):void {
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



const validationEmail = (target: HTMLInputElement): void => {
  const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})$/
  if (!target.value.match(emailPattern)) {
    target.setCustomValidity('')
    if (target.value.indexOf(' ') !== -1) {
      target.setCustomValidity('')
      target.setCustomValidity('Please, check your email. It must not contain whitespace.')
      if (target.value === '') {
        target.setCustomValidity('')
      } else {
        target.setCustomValidity('')
        target.setCustomValidity('Please, check your email. It must be properly formatted (e.g., user@example.com).')
      }
    }
  } else {
    target.setCustomValidity('')
  }
}

const validationPassword = (target: HTMLInputElement): void => {
  const { value } = target
  if (!/(?=.[a-z])/.test(value)) {
    target.setCustomValidity('')
    target.setCustomValidity('Password must contain at least one lowercase letter (a-z).')
  } else if (!/(?=.[A-Z])/.test(value)) {
    target.setCustomValidity('')
    target.setCustomValidity('Password must contain at least one uppercase letter (A-Z).')
  } else if (!/(?=.[0-9])/.test(value)) {
    target.setCustomValidity('')
    target.setCustomValidity('Password must contain at least one digit (0-9).')
  } else if (!/(?=.[!@#$%^&*])/.test(value)) {
    target.setCustomValidity('')
    target.setCustomValidity('Password must contain at least one special character (e.g., !@#$%^&*).')
  } else if (value.includes(' ')) {
    target.setCustomValidity('')
    target.setCustomValidity('Password must not contain whitespace.')
  }
  else {
    target.setCustomValidity('')
  }
}

export const isValid = (event: Event): void => {
  const { target } = event
  if (target instanceof HTMLInputElement) {
    if (target.id === 'email') {
      validationEmail(target)
    }
    if (target.id === 'password') {
      validationPassword(target)
    }
  }
}


export const bindEvents = (elements: HTMLElement[]): void => {
  const [form] = elements;  
  form.addEventListener('input', isValid)
}

