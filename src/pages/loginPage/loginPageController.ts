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