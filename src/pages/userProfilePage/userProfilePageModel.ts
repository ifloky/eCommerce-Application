import { PersonalData } from "../../types/interfaces/userProfilePage";

/* eslint-disable no-console */
export const getProfileData = async (): Promise<PersonalData> => {
  const url = `${process.env.BASE_URL}/${process.env.BASE_PROJECT_KEY}/customers/${localStorage.getItem('id')}`
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  }
  const response = await (await fetch(url, options)).json()
  const personalData = {
    name: response.firstName,
    middleName: response.middleName,
    lastName: response.lastName,
    birthDate: response.dateOfBirth
  }
  return personalData
}