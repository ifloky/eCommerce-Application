import { RegistrationPageView } from "./registrationView";
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

// const registrationInfo: CustomerRegistrationInfo = {
//   email: '',
//   password: '',
//   firstname: '',
//   lastname: '',
//   dateOfBirth: '',
//   street: '',
//   city: '',
//   postcode: '',
//   country: '',
// }
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

RegistrationPageView();

receiveInfoAfterSubmit();