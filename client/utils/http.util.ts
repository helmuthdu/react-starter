import fetch from 'isomorphic-unfetch';

type HttpOptions = {
  body?: unknown;
  headers?: Record<string, unknown>;
  url: string;
};

type HttpResponse<T> = (Response & { data: T }) | { error: string; data?: any };

export class Http {
  static async get<T>(options: HttpOptions): Promise<HttpResponse<T>> {
    return await this.fetch<T>({ method: 'GET', ...options });
  }

  static async post<T>(options: HttpOptions): Promise<HttpResponse<T>> {
    return await this.fetch<T>({ method: 'POST', ...options });
  }

  static async put<T>(options: HttpOptions): Promise<HttpResponse<T>> {
    return await this.fetch<T>({ method: 'PUT', ...options });
  }

  static async patch<T>(options: HttpOptions): Promise<HttpResponse<T>> {
    return await this.fetch<T>({ method: 'PATCH', ...options });
  }

  static async delete<T>(options: HttpOptions): Promise<HttpResponse<T>> {
    return await this.fetch<T>({ method: 'DELETE', ...options });
  }

  private static async fetch<T>(
    options: HttpOptions & { method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' }
  ): Promise<HttpResponse<T>> {
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
        console.error(error);
        return { error };
      });
  }

  private static getHeaders(headers?: any) {
    return {
      'Content-Type': 'application/json',
      ...headers
    };
  }
}
