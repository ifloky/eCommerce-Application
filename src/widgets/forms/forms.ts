export const validationEmail = (target: HTMLInputElement): boolean => {
  const isValid = false;
  const email = target.value;
  const parent = target.parentElement;
  const emailPattern = /^\S\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})$/;
  const errorText = parent?.querySelector('.form__error-text');
  if (!email.match(emailPattern) && errorText) {
    if (!email.includes('@')) {
      errorText.textContent = 'Email address must contain an "@" symbol separating local part and domain name.';
    } else {
      errorText.textContent = 'Email address must be properly formatted (e.g., user@example.com).';
    }
    if (email === '') errorText.textContent = 'Please, enter your email address';
  } else if (errorText) {
    errorText.textContent = '';
  }
  if (errorText && errorText.textContent !== '') return isValid;
  return !isValid;
};

export const validationPassword = (target: HTMLInputElement): boolean => {
  const password = target.value;
  const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,100}$/;
  const parent = target.parentElement;
  const errorText = parent?.querySelector('.form__error-text');
  const isValid = false;
  if (!password.match(passwordPattern) && errorText) {
    errorText.textContent =
      'Password must be at least 8 characters long and must contain at least one of (A-Z), (a-z), (0-9), (!@#$%^&*).';
  } else if (errorText) {
    errorText.textContent = '';
  }
  if (errorText && errorText.textContent !== '') return isValid;
  return !isValid;
};

export const isShowed = (event: Event): void => {
  const { target } = event;
  const passwordField = document.getElementById('password') as HTMLInputElement;
  if (target instanceof HTMLLabelElement && target.classList.contains('form__label')) {
    target.classList.toggle('form__label_show-pass');
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
    } else {
      passwordField.type = 'password';
    }
  }
};

export const isValid = (event: Event): void => {
  const { target } = event;
  let isValidEmail = false;
  let isValidPassword = false;
  if (target instanceof HTMLInputElement) {
    isValidEmail = validationEmail(target);
    isValidPassword = validationPassword(target);
    if (target.id === 'email') {
      validationEmail(target);
    }
    if (target.id === 'password') {
      validationPassword(target);
    }
  }
  sessionStorage.setItem('isValid', `${isValidEmail && isValidPassword}`);
};
