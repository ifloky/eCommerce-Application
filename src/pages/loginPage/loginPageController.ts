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

export const isValid = (event: Event): void => {
  const { target } = event
  if (target instanceof HTMLInputElement) {
    if (target.getAttribute('id') === 'email') {
      const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})$/
      if (!target.value.match(pattern)) {
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
  }
}