/* eslint-disable */
import fetch from 'isomorphic-unfetch';

type HttpOptions = {
  url: string;
  headers?: object;
  body?: unknown;
};
export class Http {
  static async get<T>(options: HttpOptions) {
    return await this.fetch<T>({ method: 'GET', ...options });
  }

  static async post<T>(options: HttpOptions) {
    return await this.fetch<T>({ method: 'POST', ...options });
  }

  static async put<T>(options: HttpOptions) {
    return await this.fetch<T>({ method: 'PUT', ...options });
  }

  static async patch<T>(options: HttpOptions) {
    return await this.fetch<T>({ method: 'PATCH', ...options });
  }

  static async delete<T>(options: HttpOptions) {
    return await this.fetch<T>({ method: 'DELETE', ...options });
  }

  private static async fetch<T>(options: HttpOptions & { method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' }) {
    const { url, method, headers, body } = options;

    const req: RequestInit = {
      method,
      headers: this.getHeaders(headers)
    };

    if (body) {
      req.body = JSON.stringify(body);
    }

    return fetch(url, req)
      .then(async (res: Response) => {
        const data: T = await res.json();
        return { ...res, data, ok: res.ok };
      })
      .catch(error => {
        return { error };
      });
  }

  private static getHeaders(headers?: any) {
    const options = {
      'Content-Type': 'application/json',
      ...headers
    };

    return options;
  }
}
