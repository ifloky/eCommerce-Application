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

export interface CustomerRegistrationInfo {
  [key: string]: string | string[] | boolean;
}