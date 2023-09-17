
import { postAnonymousFlow, setCookie } from "../../shared/API"
import { CustomerData } from "../../types/interfaces/customerData"


export const getAllTokens = async (email: string, password: string): Promise<string> => {
  const credentials = `${process.env.DEVELOP_ID}:${process.env.DEVELOP_SECRET}`
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(credentials)}`,
      'Content-Type': 'application/json'
    }
  }
  const queryParams = `?grant_type=password&username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  const url = `${process.env.BASE_AUTH_URL}/oauth/${process.env.BASE_PROJECT_KEY}/in-store/key=${process.env.BASE_PROJECT_KEY}/customers/token${queryParams}`
  const response = await (await fetch(url, options)).json()
  if (response) {
    setCookie('access_token', response.access_token, 24)
    setCookie('refresh_token', response.refresh_token, 24 * 30)
  }
  return response.access_token
}

type responseCustomer = {
  customer: CustomerData
}

export const checkUser = async (email: string, password: string): Promise<responseCustomer> => {
  const body = {
    "email": email,
    "password": password
  }
  const response: responseCustomer = await postAnonymousFlow('/login', body)
  return response
}