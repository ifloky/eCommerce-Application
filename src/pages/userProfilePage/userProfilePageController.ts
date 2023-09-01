import { renderEditBlock } from "./components/editProfile"
import { renderArticle } from "./components/information"
import { getBillingData, getPersonalData, getShippingData, updatePersonalData } from "./userProfilePageModel"

export const getItemData = async (): Promise<void> => {
  const informationField = document.querySelector('.information')
  while (informationField?.firstChild) {
    informationField.firstChild.remove()
  }
  const checkedItem = document.querySelector('.nav__item.active')
  if (checkedItem && checkedItem.textContent) {

    if (checkedItem.getAttribute('data-type') === 'personal') {
      const data = await getPersonalData()
      renderArticle(data, checkedItem.textContent)
    }
    if (checkedItem?.getAttribute('data-type') === 'billing') {
      const data = await getBillingData()
      const title = checkedItem.textContent
      data.forEach((address, ind) => {
        renderArticle(address, `${title} #${ind + 1}`)
      })
    }
    if (checkedItem?.getAttribute('data-type') === 'shipping') {
      const data = await getShippingData()
      const title = checkedItem.textContent
      data.forEach((address, ind) => {
        renderArticle(address, `${title} #${ind + 1}`)
      })
    }
    if (checkedItem.getAttribute('data-type') === 'edit') {
      const personalData = await getPersonalData()
      const billingData = await getBillingData()
      const shippingData = await getShippingData()
      renderEditBlock(personalData,
        billingData,
        shippingData
      )
    }
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

export const updatePersonalDetails = (event: Event): void => {
  const { target } = event
  if (target instanceof HTMLButtonElement) {
    const name = document.getElementById('name') as HTMLInputElement
    const middleName = document.getElementById('middleName') as HTMLInputElement
    const lastName = document.getElementById('lastName') as HTMLInputElement
    const birthDay = document.getElementById('birthDay') as HTMLInputElement
    const data = {
      name: name.value,
      middleName: middleName.value,
      lastName: lastName.value,
      birthDay: birthDay.value
    }
    updatePersonalData(data)
  }
}