export interface PersonalData {
  name: string,
  middleName: string,
  lastName: string,
  birthDay: string
}

export interface AddressesData {
  apartment: string
  building: string
  city: string
  company: string
  postalCode: string
  region: string
  state?: string
  street: string
  country: string
  default?: boolean
}

export interface UpdatePersonalData {
  name: string
  middleName: string
  lastName: string
  birthDay: string
}