abstract class API {
  private static baseUrl = 'http://localhost:3010/';

  static async get<T>(path: string): Promise<T> {
    const response = await fetch(`${API.baseUrl}${path}`);
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