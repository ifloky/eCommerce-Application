abstract class API {
  private static baseUrl = 'https://api.us-central1.gcp.commercetools.com/bestshop-rs';

  static async get<T>(path: string): Promise<T> {
    const response = await fetch(`${API.baseUrl}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer QZodKZBwQA4mxGKHCDG3bDtNlqUqOkAQ'
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<T>;
  }

  static async post<T>(path: string, data: any): Promise<T> {
    const response = await fetch(`${API.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer QZodKZBwQA4mxGKHCDG3bDtNlqUqOkAQ'
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