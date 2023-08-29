export const getAllTokens = async (email: string, password: string): Promise<string> => {
  const credentials = `${process.env.USER_ID}:${process.env.USER_SECRET}`
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
    localStorage.setItem('accessToken', `${response.access_token}`)
    localStorage.setItem('refreshToken', `${response.refresh_token}`)
  }
  return response.access_token
}

export const checkUser = async (email: string, password: string): Promise<Response> => {
  const token = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : await getAllTokens(email, password)
  const options = {
    method: 'POST',
    body: JSON.stringify({
      "email": email,
      "password": password
    }),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }
  const url = `${process.env.BASE_URL}/${process.env.BASE_PROJECT_KEY}/login`
  const response = await fetch(url, options)
    .then(data => data)
    .catch(error => { throw new Error(error) })
  return response
}
