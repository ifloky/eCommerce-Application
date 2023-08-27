import { homeController, registerController } from "../../shared/router"
import {
  checkUser,
  getAllTokens,
} from "./loginPageModel"

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

export const redirectToRegistrationPage = (event: Event): void => {
  const { target } = event
  if (target instanceof HTMLButtonElement && target.type === 'button') {
    registerController()
  }
}

export const loginUser = async (event: Event): Promise<void> => {
  const { target } = event
  if (target instanceof HTMLButtonElement && target.type === 'submit') {
    const emailField = document.getElementById('email')
    const passwordField = document.getElementById('password')
    let email = ''
    let password = ''
    if (emailField instanceof HTMLInputElement && passwordField instanceof HTMLInputElement) {
      email = emailField.value
      password = passwordField.value
    }
    event.preventDefault()
    getAllTokens(email, password)
    const isCorrectUserData = await checkUser(email, password)
    if (isCorrectUserData.ok) {
      localStorage.setItem('login', 'true')
      homeController()
    }
  }
}
