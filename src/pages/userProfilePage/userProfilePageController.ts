import { renderArticle } from "./components/information"
import { getBillingData, getPersonalData } from "./userProfilePageModel"

export const getItemData = async (): Promise<void> => {
  const informationField = document.querySelector('.information')
  while (informationField?.firstChild) {
    informationField.firstChild.remove()
  }
  const checkedItem = document.querySelector('.nav__item.active')
  if (checkedItem && checkedItem.textContent && checkedItem.getAttribute('data-type') === 'personal') {
    const data = await getPersonalData()
    renderArticle(data, checkedItem.textContent)
  }
  if (checkedItem && checkedItem.textContent && checkedItem?.getAttribute('data-type') === 'billing') {
    const data = await getBillingData()
    renderArticle(data, checkedItem.textContent)
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