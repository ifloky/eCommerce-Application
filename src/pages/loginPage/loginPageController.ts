import { setCookie } from "../../shared/API"
import Header from "../../widgets/header/headerView"

export const isShowed = (event: Event): void => {
  const { target } = event

  const passwordFeild = document.getElementById('password') as HTMLInputElement
  if (target instanceof HTMLLabelElement && target.classList.contains('form__label')) {
    target.classList.toggle('form__label_show-pass')
    if (passwordFeild.type === 'password') {
      passwordFeild.type = 'text'
    } else {
      passwordFeild.type = 'password'
    }
  }
}

const validationEmail = (target: HTMLInputElement): void => {
  const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})$/
  if (!target.value.match(emailPattern)) {
    target.setCustomValidity('')
    if (target.value.indexOf(' ') !== -1) {
      target.setCustomValidity('')
      target.setCustomValidity('Please, check your email. It must not contain whitespace.')
      if (target.value === '') {
        target.setCustomValidity('')
      } else {
        target.setCustomValidity('')
        target.setCustomValidity('Please, check your email. It must be properly formatted (e.g., user@example.com).')
      }
    }
  } else {
    target.setCustomValidity('')
  }
}

const validationPassword = (target: HTMLInputElement): void => {
  const { value } = target
  if (!/(?=.[a-z])/.test(value)) {
    target.setCustomValidity('')
    target.setCustomValidity('Password must contain at least one lowercase letter (a-z).')
  } else if (!/(?=.[A-Z])/.test(value)) {
    target.setCustomValidity('')
    target.setCustomValidity('Password must contain at least one uppercase letter (A-Z).')
  } else if (!/(?=.[0-9])/.test(value)) {
    target.setCustomValidity('')
    target.setCustomValidity('Password must contain at least one digit (0-9).')
  } else if (!/(?=.[!@#$%^&*])/.test(value)) {
    target.setCustomValidity('')
    target.setCustomValidity('Password must contain at least one special character (e.g., !@#$%^&*).')
  } else if (value.includes(' ')) {
    target.setCustomValidity('')
    target.setCustomValidity('Password must not contain whitespace.')
  }
  else {
    target.setCustomValidity('')
  }
}

export const isValid = (event: Event): void => {
  const { target } = event
  if (target instanceof HTMLInputElement) {
    if (target.id === 'email') {
      validationEmail(target)
    }
    if (target.id === 'password') {
      validationPassword(target)
    }
  }
}

const USER_SECRET = process.env.USER_SECRET || "";
const USER_ID = process.env.USER_ID || "";
const BASE_PROJECT_KEY = process.env.BASE_PROJECT_KEY || "";

export async function loginUser(): Promise<void> {
  const emailInput = document.querySelector('.input_email') as HTMLInputElement;
  const passwordInput = document.querySelector('.input_pass') as HTMLInputElement;
  const email = emailInput.value || "";
  const password = passwordInput.value || "";
  const clientId = USER_ID;
  const clientSecret = USER_SECRET;
  const authHost = "auth.us-central1.gcp.commercetools.com";
  const projectKey = BASE_PROJECT_KEY;
  const storeKey = "bestshop-rs";
  const scope = `view_published_products:${projectKey} manage_my_orders:${projectKey} manage_my_profile:${projectKey}`;
  const tokenEndpoint = storeKey
    ? `https://${authHost}/oauth/${projectKey}/in-store/key=${storeKey}/customers/token`
    : `https://${authHost}/oauth/${projectKey}/customers/token`;
  const authHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
  const requestBody = `grant_type=password&username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&scope=${encodeURIComponent(scope)}`;
  try {
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody,
    });
    if (!response.ok) {
      throw new Error('Failed to obtain access token');
    }
    const tokenResponse: {
      access_token: string,
      refresh_token: string,
      expires_in: number
    } = await response.json();
    setCookie("access_token", tokenResponse.access_token, tokenResponse.expires_in);
    setCookie("refresh_token", tokenResponse.refresh_token, 500);
    Header.refresh(true);
  } catch (error) {
    throw new Error('' + error);
  }
}

