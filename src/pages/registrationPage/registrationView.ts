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

export function final(): void {
  return `<div><h2 class="registration-title">Registration</h2>
  <form class="registration-form">
  ${registrationFieldForm}
  <button class="button registration" type="submit">Register</button>
  </form>
  </div>`;
}

//  export function registrationView(title: string): string {
//  return  `
//  <div>
//  <h2 class="registration-title">${title}</h2>
//  <form class="registration-form">
//    <div class="registration-form__input">
//      <label for="email" class="label">E-mail</label>
//      <input type="email" id="email" class="input-password" required>
//    </div>
//    <div class="registration-form__input">
//      <label for="password" class="label">Password</label>
//      <input type="password" id="password" class="input-password" required>
//    </div>
//    <div class="registration-form__input">
//      <label for="firstname" class="label">First name</label>
//      <input type="text" id="firstname" class="input-firstname" required>
//    </div>
//    <div class="registration-form__input">
//      <label for="lastname" class="label">Last name</label>
//      <input type="text" id="lastname" class="input-password" required>
//    </div>
//    <div class="registration-form__input">
//      <label for="date" class="label">Date of birth</label>
//      <input type="date" id="date" class="input-date" required>
//    </div>
//    <br>
//    <h4>Address:</h4>
//    <br>
//    <div class="registration-form__input">
//      <label for="street" class="label">Street</label>
//      <input type="text" id="street" class="input-street" required>
//    </div>
//    <div class="registration-form__input">
//      <label for="city" class="label">City</label>
//      <input type="text" id="city" class="input-city" required>
//    </div>
//    <div class="registration-form__input">
//      <label for="post" class="label">Postal code</label>
//      <input type="text" id="post" class="input-post" required>
//    </div>
//    <div class="registration-form__input">
//      <label for="country" class="label">Country</label>
//      <input type="text" id="country" class="input-country" required>
//    </div>
//    <button class="button registration" type="submit">Register</button>
//  </form>
//  </div>`
//  }

//  console.log(registrationFieldForm);
//  console.log(finalFieldForm);
