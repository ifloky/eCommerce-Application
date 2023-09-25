import { getAnonymousFlow, postAnonymousFlow } from '../../shared/API';
import { Project } from '../../types/interfaces/Project';
import { CustomerData, RegistrationData } from '../../types/interfaces/customerData';

export const getCountries = async (): Promise<string[]> => {
  const response: Project = await getAnonymousFlow('');
  return response.countries;
};

export const createNewCustomer = async (customerData: RegistrationData): Promise<CustomerData> => {
  const response: CustomerData = await postAnonymousFlow('/customers', customerData);
  return response;
};
