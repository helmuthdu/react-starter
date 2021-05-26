import fetch from 'isomorphic-unfetch';
import { Logger } from './logger.util';

const log = (type: keyof typeof Logger, url: string, req: RequestInit, res: unknown, time: number) => {
  const _url = url?.split('/') as string[];
  const timestamp = Logger.getTimestamp();
  Logger.groupCollapsed(
    `Http.${req.method?.toLowerCase()}('…/${_url[_url.length - 1]}')`,
    `HTTP|${type.toUpperCase()}`,
    time
  );
  Logger.setTimestamp(false);
  Logger.info('url:', url);
  Logger.debug('req:', req);
  Logger[type]('res:' as never, res);
  Logger.setTimestamp(timestamp);
  Logger.groupEnd();
};

const activeRequests = {} as Record<string, Promise<any>>;

export class Http {
  private static _headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  static async get<T>(url: string, options?: RequestInit, duplicated?: boolean): Promise<T> {
    return await this._request<T>(url, { method: 'GET', ...options }, duplicated);
  }

  static async post<T>(url: string, options?: RequestInit, duplicated?: boolean): Promise<T> {
    return await this._request<T>(url, { method: 'POST', ...options }, duplicated);
  }

  static async put<T>(url: string, options?: RequestInit, duplicated?: boolean): Promise<T> {
    return await this._request<T>(url, { method: 'PUT', ...options }, duplicated);
  }

  static async patch<T>(url: string, options?: RequestInit, duplicated?: boolean): Promise<T> {
    return await this._request<T>(url, { method: 'PATCH', ...options }, duplicated);
  }

  static async delete<T>(url: string, options?: RequestInit, duplicated?: boolean): Promise<T> {
    return await this._request<T>(url, { method: 'DELETE', ...options }, duplicated);
  }

  public static setHeaders(headers: Record<string, string | undefined>) {
    Object.entries(headers).forEach(([key, val]) => {
      if (val === undefined) {
        delete this._headers[key];
      } else {
        this._headers[key] = val;
      }
    });
  }

  private static async _request<T>(url: string, options: RequestInit, duplicated?: boolean): Promise<T> {
    const requestId = this.generateRequestId(options);

    if (duplicated || !activeRequests[requestId]) {
      const request = this._makeRequest(requestId, url, options, duplicated);

      if (!duplicated) {
        activeRequests[requestId] = request;
      }

      return request as Promise<T>;
    }

    return activeRequests[requestId];
  }

  private static _makeRequest<T>(
    requestId: string,
    url: string,
    options: RequestInit,
    duplicated?: boolean
  ): Promise<T> {
    const { headers, ...rest } = options;

    const req: RequestInit = {
      headers: {
        ...this._headers,
        ...headers
      },
      ...rest
    };

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
      })
      .finally(() => {
        if (!duplicated) {
          delete activeRequests[requestId];
        }
      });
  }

  private static generateRequestId(options: any): string {
    return `${JSON.stringify(options)}`;
  }
}
