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

// interface CustomerRegistrationInfo {
//   email: string;
//   password: string;
//   firstname: string;
//   lastname: string;
//   dateOfBirth: string;
//   street: string;
//   city: string;
//   postcode: string;
//   country: string;

// }

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

// export function ReceiveInfoAfterSubmit(): void {
//   // const submitButton = document.querySelector('.btn-registration') as HTMLButtonElement;
//   const form = document.querySelector('.registration-form');
//   const filledForm = document.querySelectorAll('.form-input') as NodeList;
//   // submitButton.addEventListener('submit', () => {
//   //   // eslint-disable-next-line no-console
//   //   console.log(filledForm);
//   // })
//   form?.addEventListener('submit', (event: Event) => {
//      event.preventDefault();
//      Array.from(filledForm).forEach((elem) => {
//         registrationInfo.email: Element.value;
//      });
//   })

// }

// ReceiveInfoAfterSubmit();






