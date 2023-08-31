import { CustomerData } from "../../types/interfaces/customerData";
import { BillingData, PersonalData } from "../../types/interfaces/userProfilePage";

/* eslint-disable no-console */
const getCustomerData = async (): Promise<CustomerData> => {
  const url = `${process.env.BASE_URL}/${process.env.BASE_PROJECT_KEY}/customers/${localStorage.getItem('id')}`
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
    birthDate: response.dateOfBirth
  }
  return personalData
}

export const getBillingData = async (): Promise<BillingData> => {
  const response = await getCustomerData()
  const billingAddressId = response.billingAddressIds.join('')
  const addressesArr = response.addresses
  const billingAddress = addressesArr.find(address => address.id === billingAddressId)
  const billingData = {
    state: billingAddress?.state || '',
    region: billingAddress?.region || '',
    city: billingAddress?.city || '',
    street: billingAddress?.streetName || '',
    building: billingAddress?.building || '',
    apartment: billingAddress?.apartment || '',
    postalCode: billingAddress?.postalCode || '',
    company: billingAddress?.company || '',
  }

  return billingData
}