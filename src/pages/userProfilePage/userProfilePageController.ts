
import { renderArticle } from "./components/profile"
import { getProfileData } from "./userProfilePageModel"

export const getItemData = async (): Promise<void> => {
  const informationField = document.querySelector('.information')
  while (informationField?.firstChild) {
    informationField.firstChild.remove()
  }
  const checkedItem = document.querySelector('.nav__item.active')
  if (checkedItem?.getAttribute('data-type') === 'personal') {
    const data = await getProfileData()
    renderArticle(data)
  }
}

export const checkItem = (event: Event): void => {
  const { target } = event
  if (target && target instanceof HTMLLIElement) {
    const listItems = document.querySelectorAll('.nav__item')
    listItems.forEach(item => {
      item.classList.remove('active')
    })
    target.classList.add('active')
  }
  getItemData()
}