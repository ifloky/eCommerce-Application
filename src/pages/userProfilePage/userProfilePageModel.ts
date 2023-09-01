import { getCookie } from "../../shared/API";
import { CustomerData } from "../../types/interfaces/customerData";
import { AddressesData, PersonalData, UpdatePersonalData } from "../../types/interfaces/userProfilePage";

const getCustomerData = async (): Promise<CustomerData> => {
  const url = `${process.env.BASE_URL}/${process.env.BASE_PROJECT_KEY}/customers/${localStorage.getItem('id')}`
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getCookie('access_token')}`
    }
  }
  const response = await (await fetch(url, options)).json()
  return response
}

export const getPersonalData = async (): Promise<PersonalData> => {
  const response = await getCustomerData()
  const personalData = {
    name: response.firstName,
    middleName: response.middleName,
    lastName: response.lastName,
    birthDay: response.dateOfBirth
  }
  return personalData
}

export const getBillingData = async (): Promise<AddressesData[]> => {
  const response = await getCustomerData()
  const { billingAddressIds } = response
  const addressesArray = response.addresses
  const addressDataArray: AddressesData[] = []
  billingAddressIds.forEach(addressId => {
    const billingAddress = addressesArray.find(address => address.id === addressId)
    const isDefault = billingAddress?.id === response.defaultBillingAddressId
    const addressData = {
      country: billingAddress?.country || '',
      state: billingAddress?.state || '',
      region: billingAddress?.region || '',
      city: billingAddress?.city || '',
      street: billingAddress?.streetName || '',
      building: billingAddress?.building || '',
      apartment: billingAddress?.apartment || '',
      postalCode: billingAddress?.postalCode || '',
      company: billingAddress?.company || '',
    }
    if (isDefault) {
      Object.defineProperty(addressData, 'default', { value: '', enumerable: true })
    }
    addressDataArray.push(addressData)
  })
  return addressDataArray
}

export const getShippingData = async (): Promise<AddressesData[]> => {
  const response = await getCustomerData()
  const { shippingAddressIds } = response
  const addressesArray = response.addresses
  const addressDataArray: AddressesData[] = []
  shippingAddressIds.forEach(addressId => {
    const shippingAddress = addressesArray.find(address => address.id === addressId)
    const isDefault = shippingAddress?.id === response.defaultShippingAddressId
    const addressData = {
      country: shippingAddress?.country || '',
      state: shippingAddress?.state || '',
      region: shippingAddress?.region || '',
      city: shippingAddress?.city || '',
      street: shippingAddress?.streetName || '',
      building: shippingAddress?.building || '',
      apartment: shippingAddress?.apartment || '',
      postalCode: shippingAddress?.postalCode || '',
      company: shippingAddress?.company || '',
    }
    if (isDefault) {
      Object.defineProperty(addressData, 'default', { value: '', enumerable: true })
    }
    addressDataArray.push(addressData)
  })
  return addressDataArray
}

export const updatePersonalData = async (data: UpdatePersonalData): Promise<Response> => {
  const { version } = await getCustomerData()
  const url = `${process.env.BASE_URL}/${process.env.BASE_PROJECT_KEY}/customers/${localStorage.getItem('id')} `
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCookie('access_token')} `
    },
    body: JSON.stringify({
      "version": version,
      "actions": [
        {
          "action": "setFirstName",
          "firstName": data.name
        },
        {
          "action": "setMiddleName",
          "middleName": data.middleName
        },
        {
          "action": "setLastName",
          "lastName": data.lastName
        },
        {
          "action": "setDateOfBirth",
          "dateOfBirth": data.birthDay
        }
      ]
    })
  }
  const response = await fetch(url, options).catch(error => { throw new Error(error) })
  return response
}