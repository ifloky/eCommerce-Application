interface FieldsInfo {
  for: string,
  text: string,
  type: string,
  id: string,
  class: string
}

let registrationFieldForm: string = '';

const registrationFeildsInfo: FieldsInfo[] = [{for: 'email', text: 'E-mail', type: 'email', id: 'email', class: 'email' }, {for: 'password', text: 'Password', type: 'password', id: 'password', class: 'password' }, {for: 'firstname', text: 'First name', type: 'text', id: 'firstname', class: 'firstname' }, {for: 'lastname', text: 'Last name', type: 'text', id: 'lastname', class: 'lastname' }, {for: 'date', text: 'Date of Birth', type: 'date', id: 'date', class: 'date' }, {for: 'street', text: 'Street', type: 'text', id: 'street', class: 'street' }, {for: 'city', text: 'City', type: 'text', id: 'city', class: 'city' }, {for: 'post', text: 'Postal code', type: 'text', id: 'post', class: 'post' }, {for: 'country', text: 'Country', type: 'text', id: 'country', class: 'country' }]; 

function createRegistrationFields(array: FieldsInfo[]): string {
  for (let i = 0; i < array.length; i += 1) {
    registrationFieldForm += `
  <div class="login-form__input">
  <label for="${array[i].for}" class="label">${array[i].text}</label>
  <input type="${array[i].type}" id="${array[i].id}" class="input-${array[i].class}" required>
</div>`;
  }
return registrationFieldForm;
}

createRegistrationFields(registrationFeildsInfo);

// const finalFieldForm = `<div><h2 class="registration-title">Registration</h2>
// <form class="registration-form">
// ${registrationFieldForm}
// <button class="button registration" type="submit">Register</button>
// </form>
// </div>`;

//  export function final(): void {
//  return `<div><h2 class="registration-title">Registration</h2>
//  <form class="registration-form">
//  ${registrationFieldForm}
//  <button class="button registration" type="submit">Register</button>
//  </form>
//  </div>`;
//  }

const registrationUser = document.createElement('div');
      registrationUser.innerHTML = `<h2 class="registration-title">Registration</h2>
      <form class="registration-form">
      ${registrationFieldForm}
      <button class="btn registration" type="submit">Register</button>
      </form>
      `;

export function RegistrationPageView(): void {
  document.body.append(registrationUser);
}

