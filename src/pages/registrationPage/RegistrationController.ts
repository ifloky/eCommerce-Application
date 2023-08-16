// import { apiRoot } from "../../utils/AdminClient";
// import { RegistrationPageView } from "./registrationView";
// import { ctpClient, projectKey } from "../../utils/BuildClient";

export interface FieldsInfo {
  for: string,
  text: string,
  type: string,
  id: string,
  class: string
}

export const registrationFeildsInfo: FieldsInfo[] = [
  {for: 'email', text: 'E-mail', type: 'email', id: 'email', class: 'email' },
  {for: 'password', text: 'Password', type: 'password', id: 'password', class: 'password' },
  {for: 'firstname', text: 'First name', type: 'text', id: 'firstname', class: 'firstname' },
  {for: 'lastname', text: 'Last name', type: 'text', id: 'lastname', class: 'lastname' },
  {for: 'date', text: 'Date of Birth', type: 'date', id: 'dateOfBirth', class: 'date' },
  {for: 'street', text: 'Street', type: 'text', id: 'street', class: 'street' },
  {for: 'city', text: 'City', type: 'text', id: 'city', class: 'city' },
  {for: 'post', text: 'Postal code', type: 'text', id: 'postcode', class: 'post' },
  {for: 'country', text: 'Country', type: 'text', id: 'country', class: 'country' }];

export function showHidePassword(): void {
   const passEye = document.querySelector('.password-control');
   const input = document.querySelector('.input-password');

   passEye?.addEventListener('click', () => {
     // eslint-disable-next-line no-console
     console.log(passEye);
     // eslint-disable-next-line no-alert
     if (input?.getAttribute('type') === 'password') {
       passEye?.classList.add('no-view');
       input.setAttribute('type', 'text');
      } else {
       passEye?.classList.remove('no-view');
       input?.setAttribute('type', 'password');
      }
   })

 }

  interface CustomerRegistrationInfo {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  street: string;
  city: string;
  postcode: string;
  country: string;

  }

  const registrationInfo: CustomerRegistrationInfo = {
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  dateOfBirth: '',
  street: '',
  city: '',
  postcode: '',
  country: '',
  };

  export function receiveInfoAfterSubmit(): void {
  const submitButton = document.querySelector('.btn-registration') as HTMLButtonElement;
  //  const form = document.querySelector('.registration-form');

  submitButton.addEventListener('click', (event: Event) => {
    // eslint-disable-next-line no-console
    //  console.log(submitButton);
    event.preventDefault();
    const filledForm = document.querySelectorAll('.form-input') as NodeList;
    filledForm.forEach((inputField) => {
      const input = inputField as HTMLInputElement;
      Object.defineProperty(registrationInfo, input.id, { value: input.value });
      // eslint-disable-next-line no-console
      console.log(input.value);
    })
    // eslint-disable-next-line no-console
    console.log(registrationInfo);
  })
  }


  //  https://api.{region}.commercetools.com
  //  /{projectKey}/customers