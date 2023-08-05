
abstract class API {
  private static BASE_URL = 'https://api.us-central1.gcp.commercetools.com/bestshop-rs'
  private static BEARER_TOKEN = 'Bearer gMC3Vp4wto76rjP7Ltr8WIJB2UwyBE6A'

  static async get<T>(path: string): Promise<T> {
    const response = await fetch(`${API.BASE_URL}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': API.BEARER_TOKEN
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<T>;
  }

  static async post<T>(path: string, data: any): Promise<T> {
    const response = await fetch(`${API.BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': API.BEARER_TOKEN
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<T>;
  }
}

export default API;