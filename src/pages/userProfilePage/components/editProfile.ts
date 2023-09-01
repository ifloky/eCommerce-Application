/* eslint-disable no-console */
import {
  AddressesData,
  //  AddressesData,
  PersonalData
} from "../../../types/interfaces/userProfilePage";
import { createElement } from "../../../utils/abstract";
import { updatePersonalDetails } from "../userProfilePageController";

const legendsTextContent = {
  personal: 'Edit personal details',
  billing: 'Edit billing address',
  shipping: 'Edit shipping address'
}

const createLabelElement = (): HTMLLabelElement => createElement('label', ['edit__label'])

const createInputElement = (): HTMLInputElement => createElement('input', ['edit__input'])

const createEditBlocksWrapper = (): HTMLDivElement => createElement('div', ['edit'])

const createEditLineContent = (labelText: string, inputText: string): HTMLDivElement => {
  const line = createElement('div', ['edit__line-content'])
  const label = createLabelElement()
  label.textContent = labelText
  label.setAttribute('for', labelText)
  const input = createInputElement()
  if (labelText === 'birthDay') {
    input.type = 'date'
  }
  input.value = inputText
  input.id = labelText
  line.append(label, input)
  return line
}

const createPersonalDetailsEditForm = (personalData: PersonalData): HTMLElement => {
  const form = createElement('form', ['edit-personal'])
  const dataArrays = Object.entries(personalData)
  dataArrays.forEach(item => {
    const [key, value] = item
    const line = createEditLineContent(key, value)
    form.append(line)
  })
  const editButton = createElement('button', ['button', 'button_edit'])
  editButton.type = 'button'
  editButton.textContent = 'Edit'
  form.append(editButton)
  return form
}

const createEditBlock = (text: string): HTMLDetailsElement => {
  const element = createElement('details', ['edit__details'])
  const legend = createElement('summary', ['edit__legend'])
  legend.textContent = text
  element.append(legend)
  return element
}

const generatePersonalEditBlock = (personalData: PersonalData): HTMLDivElement => {
  const wrapper = createEditBlocksWrapper()
  const personalDetailsEdit = createEditBlock(legendsTextContent.personal)
  const editForm = createPersonalDetailsEditForm(personalData)
  personalDetailsEdit.append(editForm)
  wrapper.append(personalDetailsEdit)
  return wrapper
}

const createBillingAddressesEditForm = (billingData: AddressesData[]): HTMLFormElement => {
  const form = createElement('form', ['edit-billing'])
  console.log(billingData);

  return form
}

const generateBillingEditBlock = (billingData: AddressesData[]): HTMLDivElement => {
  const wrapper = createEditBlocksWrapper()
  const billingAddressesEdit = createEditBlock(legendsTextContent.billing)
  const editForm = createBillingAddressesEditForm(billingData)
  billingAddressesEdit.append(editForm)
  wrapper.append(billingAddressesEdit)
  return wrapper
}

const createShippingAddressesEditForm = (shippingData: AddressesData[]): HTMLFormElement => {
  const form = createElement('form', ['edit-billing'])
  console.log(shippingData);

  return form
}

const generateShippingEditBlock = (shippingData: AddressesData[]): HTMLDivElement => {
  const wrapper = createEditBlocksWrapper()
  const shippingAddressesEdit = createEditBlock(legendsTextContent.shipping)
  const editForm = createShippingAddressesEditForm(shippingData)
  shippingAddressesEdit.append(editForm)
  wrapper.append(shippingAddressesEdit)
  return wrapper
}

const bindEvents = (): void => {
  const personalForm = document.querySelector('.edit-personal')
  personalForm?.addEventListener('click', updatePersonalDetails)

}

export const renderEditBlock = (personalData: PersonalData,
  billingData: AddressesData[],
  shippingData: AddressesData[]
): void => {
  const informationBlock = document.querySelector('.information')
  const editPersonalDetails = generatePersonalEditBlock(personalData)
  const editBillingAddresses = generateBillingEditBlock(billingData)
  const editShippingAddresses = generateShippingEditBlock(shippingData)
  informationBlock?.append(editPersonalDetails, editBillingAddresses, editShippingAddresses)
  bindEvents()
} 