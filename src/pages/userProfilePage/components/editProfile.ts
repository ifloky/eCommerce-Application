import { AddressesData, PersonalData } from "../../../types/interfaces/userProfilePage";
import { createElement } from "../../../utils/abstract";
import { updateData } from "../userProfilePageController";

const legendsTextContent = {
  personal: 'Edit personal details',
  billing: 'Edit billing address',
  shipping: 'Edit shipping address'
}


const createLabelElement = (): HTMLLabelElement => createElement('label', ['edit__label'])

const createInputElement = (): HTMLInputElement => createElement('input', ['edit__input'])

const createEditBlocksWrapper = (): HTMLDivElement => createElement('div', ['edit'])

const createEditLineContent = (labelText: string, inputText: string, addressType: string): HTMLDivElement => {
  const line = createElement('div', ['edit__line-content'])
  const label = createLabelElement()
  label.textContent = labelText
  label.setAttribute('for', `${addressType}-${labelText}`)
  const input = createInputElement()
  if (labelText === 'birthDay') {
    input.type = 'date'
  }
  if (labelText === 'id') {
    input.disabled = true
  }
  input.value = inputText
  input.id = `${addressType}-${labelText}`
  line.append(label, input)
  return line
}

const createSaveButton = (): HTMLButtonElement => {
  const saveButton = createElement('button', ['button', 'button_save'])
  saveButton.type = 'button'
  saveButton.textContent = 'Save'
  return saveButton
}

const createInputCheckboxLine = (name: string): HTMLDivElement => {
  const line = createElement('div', ['edit__line-content'])
  const checkbox = createInputElement()
  checkbox.classList.add('edit__input_checkbox')
  checkbox.type = 'checkbox'
  checkbox.id = `${name}-checkbox`
  const label = createLabelElement()
  label.setAttribute('for', `${name}-checkbox`)
  label.textContent = 'Set this address like default'
  line.append(label, checkbox)
  return line
}

const createEditBlock = (text: string, name: string): HTMLDetailsElement => {
  const element = createElement('details', ['edit__details'])
  element.setAttribute('id', name)
  const legend = createElement('summary', ['edit__legend'])
  legend.textContent = text
  element.append(legend)
  return element
}

const createPersonalDetailsEditForm = (personalData: PersonalData, name: string): HTMLElement => {
  const form = createElement('form', ['edit__inner'])
  const dataArrays = Object.entries(personalData)
  dataArrays.forEach(item => {
    const [key, value] = item
    const line = createEditLineContent(key, value, name)
    form.append(line)
  })
  const saveButton = createSaveButton()
  form.append(saveButton)
  return form
}

const generatePersonalEditBlock = (personalData: PersonalData, name: string): HTMLDivElement => {
  const wrapper = createEditBlocksWrapper()
  const personalDetailsEdit = createEditBlock(legendsTextContent.personal, name)
  const editForm = createPersonalDetailsEditForm(personalData, name)
  personalDetailsEdit.append(editForm)
  wrapper.append(personalDetailsEdit)
  return wrapper
}

const createAddressEditForm = (data: AddressesData, addressType: string): HTMLFormElement => {
  const form = createElement('form', ['edit__inner'])
  const dataArr = Object.entries(data)
  dataArr.forEach(item => {
    const [key, value] = item
    const line = createEditLineContent(key, value, addressType)
    if (key !== 'default') {
      form.append(line)
    }
  })
  const saveButton = createSaveButton()
  const checkbox = createInputCheckboxLine(addressType)
  form.append(checkbox, saveButton)
  return form
}

const generateAddressEditBlock = (data: AddressesData, title: string, name: string): HTMLDivElement => {
  const wrapper = createEditBlocksWrapper()
  const billingAddressesEdit = createEditBlock(title, name)
  const editForm = createAddressEditForm(data, name)
  billingAddressesEdit.append(editForm)
  wrapper.append(billingAddressesEdit)
  return wrapper
}

const bindEvents = (): void => {
  const allEditButtons = document.querySelectorAll('.button_save')
  allEditButtons.forEach(editButton => {
    editButton.addEventListener('click', updateData)
  })
}

export const renderEditBlock = (personalData: PersonalData, billingData: AddressesData, shippingData: AddressesData): void => {
  const informationBlock = document.querySelector('.information')
  const wrapper = createElement('div', ['information__wrapper'])
  const editPersonalDetails = generatePersonalEditBlock(personalData, 'personal')
  const editBillingAddresses = generateAddressEditBlock(billingData, legendsTextContent.billing, 'billing')
  const editShippingAddresses = generateAddressEditBlock(shippingData, legendsTextContent.shipping, 'shipping')
  wrapper.append(editPersonalDetails, editBillingAddresses, editShippingAddresses)
  informationBlock?.append(wrapper)
  bindEvents()
} 