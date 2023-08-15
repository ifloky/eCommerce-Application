import '../../../css/main.min.css'

interface FieldsInfo {
  for: string,
  text: string,
  type: string,
  id: string,
  class: string
}

let registrationFieldForm: string = '';

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