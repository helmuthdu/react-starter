import fetch from 'isomorphic-unfetch';
import { Logger } from './logger.util';

const log = (type: keyof typeof Logger, url: string, req: RequestInit, res: unknown, time: number) => {
  const _url = url?.split('/') as string[];
  const timestamp = Logger.getTimestamp();
  Logger.groupCollapsed(`Http.${req.method?.toLowerCase()}('…/${_url[_url.length - 1]}')`, 'HTTP', time);
  Logger.setTimestamp(false);
  Logger.info('url:', url);
  Logger.debug('req:', req);
  Logger[type]('res:' as never, res);
  Logger.setTimestamp(timestamp);
  Logger.groupEnd();
};

export class Http {
  static async get<T>(url: string, options?: RequestInit): Promise<T> {
    return await this.fetch<T>(url, { method: 'GET', ...options });
  }

  static async post<T>(url: string, options?: RequestInit): Promise<T> {
    return await this.fetch<T>(url, { method: 'POST', ...options });
  }

  static async put<T>(url: string, options?: RequestInit): Promise<T> {
    return await this.fetch<T>(url, { method: 'PUT', ...options });
  }

  static async patch<T>(url: string, options?: RequestInit): Promise<T> {
    return await this.fetch<T>(url, { method: 'PATCH', ...options });
  }

  static async delete<T>(url: string, options?: RequestInit): Promise<T> {
    return await this.fetch<T>(url, { method: 'DELETE', ...options });
  }

  private static async fetch<T>(url: string, options: RequestInit): Promise<T> {
    const { headers, body, ...rest } = options;

    const req: RequestInit = {
      headers: this.getHeaders(headers),
      ...rest
    };

    if (body) {
      req.body = JSON.stringify(body);
    }

    const time = Date.now();
    return fetch(url, req)
      .then(async (res: Response) => {
        const data: T = await res.json();
        log('success', url, req, data, time);
        return data;
      })
      .catch(error => {
        log('error', url, req, error, time);
        throw error;
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
