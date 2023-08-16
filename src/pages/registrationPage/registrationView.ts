import '../../../css/main.min.css'
import { FieldsInfo, registrationFeildsInfo } from './RegistrationController';

let registrationFieldForm: string = '';

export function createRegistrationFields(array: FieldsInfo[]): string {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].for === 'password') {
      registrationFieldForm += `
        <div class="login-form__input-password">
        <label for="${array[i].for}" class="form-label">${array[i].text}</label>
        <input type="${array[i].type}" name="${array[i].id}" id="${array[i].id}" class="form-input input-${array[i].class}">
        <a href='' class="password-control"></a>
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

createRegistrationFields(registrationFeildsInfo);

const registrationUser = document.createElement('div');
      registrationUser.innerHTML = `<h2 class="registration-title">Registration</h2>
      <form class="registration-form" action=''>
      ${registrationFieldForm}
      <input type="checkbox" id="terms" name="terms" value="terms">
      <label for="terms">You need to agree to <a href=''>Terms and conditions</a></label><br>
      <button class="btn btn-registration" type="submit">Register</button>
      <p>Already have an account? <a href=''>Sign in</a></p>
      </form>
      `;

export function RegistrationPageView(): void {
  document.body.append(registrationUser);
}
RegistrationPageView();
