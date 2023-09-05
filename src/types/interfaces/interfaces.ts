export interface CustomerFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface FieldsInfo {
  for: string,
  text: string,
  type: string,
  id: string,
  class: string
}

export interface Address {
  addressId: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}


export interface RegistrationInfo {
  id: string,
  version: number,
  versionModifiedAt: Date,
  lastMessageSequenceNumber: number,
  lastModifiedBy: {
    clientId: "",
    isPlatformClient: boolean,
  },
  createdBy: {
    clientId: "",
    isPlatformClient: boolean,
  },
  createdAt: Date,
  lastModifiedAt: Date,
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  stores: string[];
  authenticationMode: string;
}
