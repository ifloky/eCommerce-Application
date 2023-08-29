export const checkItem = (event: Event): void => {
  const { target } = event
  if (target instanceof HTMLLIElement) {
    const listItems = document.querySelectorAll('.nav__item')
    listItems.forEach(item => {
      item.classList.remove('active')
    })
    target.classList.add('active')
  }
}