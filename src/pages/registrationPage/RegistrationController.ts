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

