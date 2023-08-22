import { receiveInfoAfterSubmit, registrationFieldsInfo } from './RegistrationController';
import { FieldsInfo } from '../../types/interfaces/interfaces';

let registrationFieldForm: string = '';

export function createRegistrationFields(array: FieldsInfo[]): string {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].for === 'password') {
      registrationFieldForm += `
        <div class="login-form__input-password">
        <label for="${array[i].for}" class="form-label">${array[i].text}</label>
        <input type="${array[i].type}" name="${array[i].id}" id="${array[i].id}" class="form-input input-${array[i].class}">
        <div href='' class="password-control"></div>
      </div>`;
    } else {
      registrationFieldForm += `
      <div class="login-form__input">
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
      <input type="checkbox" id="terms" name="terms" value="terms">
      <label for="terms">You need to agree to <a href=''>Terms and conditions</a></label><br>
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



export default function RegistrationPageView(): HTMLElement {
  receiveInfoAfterSubmit(submitButton);
  return registrationUser;
}


