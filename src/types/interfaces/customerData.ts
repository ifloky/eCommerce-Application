interface Address {
  addressId: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  apartment: string
  building: string
  company: string
  firstName: string
  id: string
  lastName: string
  region: string
  state: string
  streetName: string
}

interface CreatedByUser {
  id: string
  typeId: string
}
interface CreatedBy {
  isPlatformClient: boolean
  user: CreatedByUser
}

interface CustomerGroup {
  id: string
  typeId: string
}

interface LastModifiedBy {
  isPlatformClient: boolean
  user: CreatedByUser
}

export interface CustomerData {
  addresses: Address[]
  authenticationMode: string
  billingAddressIds: string[]
  companyName: string
  createdAt: string
  createdBy: CreatedBy
  customerGroup: CustomerGroup
  dateOfBirth: string
  email: string
  firstName: string
  id: string
  isEmailVerified: boolean
  lastMessageSequenceNumber: number
  lastModifiedAt: string
  lastModifiedBy: LastModifiedBy
  lastName: string
  middleName: string
  password: string
  salutation: string
  shippingAddressIds: string[]
  stores: string[]
  title: string
  version: number
  versionModifiedAt: string
}