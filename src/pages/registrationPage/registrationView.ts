export function registrationView(title: string): string {
  return  `
  <div>
  <h2 class="login-title">${title}</h2>
  <form class="login-form">
    <div class="login-form__input">
      <label for="email" class="label">E-mail</label>
      <input type="email" id="email" class="input-password" required>
    </div>
    <div class="login-form__input">
      <label for="password" class="label">Password</label>
      <input type="password" id="password" class="input-password" required>
    </div>
    <div class="login-form__input">
      <label for="firstname" class="label">First name</label>
      <input type="text" id="firstname" class="input-firstname" required>
    </div>
    <div class="login-form__input">
      <label for="lastname" class="label">Last name</label>
      <input type="text" id="lastname" class="input-password" required>
    </div>
    <div class="login-form__input">
      <label for="username" class="input-username">Username</label>
      <input type="text" id="username" class="input" required>
    </div>
    <div class="login-form__input">
      <label for="date" class="input-username">Date of birth</label>
      <input type="date" id="date" class="input" required>
    </div>
    <br>
    <h4>Address:</h4>
    <br>
    <div class="login-form__input">
      <label for="street" class="input-username">Street</label>
      <input type="text" id="street" class="input" required>
    </div>
    <div class="login-form__input">
      <label for="city" class="input-username">City</label>
      <input type="text" id="city" class="input" required>
    </div>
    <div class="login-form__input">
      <label for="spost" class="input-username">Postal code</label>
      <input type="text" id="street" class="post" required>
    </div>
    <div class="login-form__input">
      <label for="country" class="input-username">Country</label>
      <input type="text" id="country" class="input" required>
    </div>
    <button class="button" type="submit">Login</button>
  </form>
</div>`
}