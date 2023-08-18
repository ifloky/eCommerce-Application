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
   email: string;
   password: string;
   firstName: string;
   lastName: string;
   dateOfBirth: string;
   street: string;
   city: string;
   postcode: string;
   country: string;
   }