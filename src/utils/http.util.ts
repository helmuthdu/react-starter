import fetch from 'isomorphic-unfetch';
import Logger from './logger.util';

const log = (type: keyof typeof Logger, method: string, url: string, data: any, time: number) => {
  const _url = url?.split('/') as string[];
  const timestamp = Logger.getTimestamp();
  Logger.groupCollapsed(`Http.${method?.toLowerCase()}('…/${_url[_url.length - 1]}')`, time, 'HTTP');
  Logger.setTimestamp(false);
  Logger.info('url:', url);
  Logger[type]('res:' as never, data);
  Logger.setTimestamp(timestamp);
  Logger.groupEnd();
};

type HttpParams = {
  body?: unknown;
  headers?: Record<string, unknown>;
  url: string;
};

type FetchParams = HttpParams & { method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' };

type HttpResponse<T> = Partial<Response> & { data?: T; error?: unknown };

export class Http {
  static async get<T>(params: HttpParams): Promise<HttpResponse<T>> {
    return await this.fetch<T>({ method: 'GET', ...params });
  }

  static async post<T>(params: HttpParams): Promise<HttpResponse<T>> {
    return await this.fetch<T>({ method: 'POST', ...params });
  }

  static async put<T>(params: HttpParams): Promise<HttpResponse<T>> {
    return await this.fetch<T>({ method: 'PUT', ...params });
  }

  static async patch<T>(params: HttpParams): Promise<HttpResponse<T>> {
    return await this.fetch<T>({ method: 'PATCH', ...params });
  }

  static async delete<T>(params: HttpParams): Promise<HttpResponse<T>> {
    return await this.fetch<T>({ method: 'DELETE', ...params });
  }

  private static async fetch<T>(params: FetchParams): Promise<HttpResponse<T>> {
    const { url, method, headers, body } = params;

    const req: RequestInit = {
      method,
      headers: this.getHeaders(headers)
    };

    if (body) {
      req.body = JSON.stringify(body);
    }

    const time = Date.now();
    return fetch(url, req)
      .then(async (res: Response) => {
        const data: T = await res.json();
        log('success', method, url, data, time);
        return { ...res, data };
      })
      .catch(error => {
        log('error', method, url, error, time);
        return { error };
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static getHeaders(headers?: any) {
    return {
      'Content-Type': 'application/json',
      ...headers
    };
  }
}
