export interface PersonalData {
  name: string;
  middleName: string;
  lastName: string;
  birthDay: string;
}

export interface AddressesData {
  apartment: string;
  building: string;
  city: string;
  company: string;
  postalCode: string;
  region: string;
  state?: string;
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
