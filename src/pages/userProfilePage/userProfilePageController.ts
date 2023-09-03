import { renderEditBlock } from "./components/editProfile"
import { renderArticle } from "./components/information"
import {
  getBillingData,
  getPersonalData,
  getShippingData,
  setDefaultAddress,
  updateAddressData,
  updatePersonalData
} from "./userProfilePageModel"

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
        billingData[0],
        shippingData[0]
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

export const updatePersonalDetails = (): void => {
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

export const updateAddress = (parent: HTMLElement): void => {
  const parentId = parent.id
  const country = parent.querySelector(`#${parentId}-country`) as HTMLInputElement
  const state = parent.querySelector(`#${parentId}-state`) as HTMLInputElement
  const region = parent.querySelector(`#${parentId}-region`) as HTMLInputElement
  const city = parent.querySelector(`#${parentId}-city`) as HTMLInputElement
  const street = parent.querySelector(`#${parentId}-street`) as HTMLInputElement
  const building = parent.querySelector(`#${parentId}-building`) as HTMLInputElement
  const apartment = parent.querySelector(`#${parentId}-apartment`) as HTMLInputElement
  const postalCode = parent.querySelector(`#${parentId}-postalCode`) as HTMLInputElement
  const company = parent.querySelector(`#${parentId}-company`) as HTMLInputElement
  const id = parent.querySelector(`#${parentId}-id`) as HTMLInputElement
  const isDefault = parent.querySelector(`#${parentId}-checkbox`) as HTMLInputElement
  const data = {
    country: country.value,
    state: state.value,
    region: region.value,
    city: city.value,
    street: street.value,
    building: building.value,
    apartment: apartment.value,
    postalCode: postalCode.value,
    company: company.value,
    id: id.value,
    default: isDefault.checked,
    type: parentId
  }
  if (data.default) {
    setDefaultAddress(data)
  }
  updateAddressData(data)
}

export const updateData = (event: Event): void => {
  const { target } = event
  if (target instanceof HTMLButtonElement) {
    const parent = target.closest('.edit__details')
    if (target.closest('#personal')) {
      updatePersonalDetails()
    }
    if (target.closest('#billing') && parent instanceof HTMLElement) {
      updateAddress(parent)
    }
    if (target.closest('#shipping') && parent instanceof HTMLElement) {
      updateAddress(parent)
    }
  }
}