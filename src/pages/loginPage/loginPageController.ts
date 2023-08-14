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

export const isValid = (event: Event): boolean => {
  const { target } = event
  if (target instanceof HTMLInputElement) {
    if (target.getAttribute('id') === 'email') {
      const pattern = /^\w+([.-]?\w+)*@\w+.\w{2,4}$/
      const { value } = target
      if (!pattern.test(value)) {
        target.setCustomValidity('Please, check you email. It should look like user@example.com')
      }
    }
  }
  return true
}