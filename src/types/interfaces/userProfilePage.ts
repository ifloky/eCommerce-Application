export interface PersonalData {
  name: string,
  middleName: string,
  lastName: string,
  birthDate: string
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