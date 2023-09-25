export interface PersonalData {
  name: string;
  middleName: string;
  lastName: string;
  birthDay: string;
}

export interface AddressesData {
  city: string;
  postalCode: string;
  streetName: string;
  country: string;
  id: string;
  default?: boolean;
  type: string;
}

export interface UpdatePersonalData {
  name: string;
  middleName: string;
  lastName: string;
  birthDay: string;
}
