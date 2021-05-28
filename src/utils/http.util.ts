import fetch from 'isomorphic-unfetch';
import { Logger } from './logger.util';

type HttpRequestConfig = RequestInit & { id?: string; latestOnly?: boolean; skipCustomHeaders?: boolean };

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

const activeRequests = {} as Record<string, { request: Promise<any>; controller: AbortController }>;

const defaultHeaders = {
  'Content-Type': 'application/json'
};

export class Http {
  private static _headers: Record<string, string | number> = {};

  static async get<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    return await this._request<T>(url, { method: 'GET', ...config });
  }

  static async post<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    return await this._request<T>(url, { method: 'POST', ...config });
  }

  static async put<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    return await this._request<T>(url, { method: 'PUT', ...config });
  }

  static async patch<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    return await this._request<T>(url, { method: 'PATCH', ...config });
  }

  static async delete<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    return await this._request<T>(url, { method: 'DELETE', ...config });
  }

  public static setHeaders(headers: Record<string, string | number | undefined>): void {
    Object.entries(headers).forEach(([key, val]) => {
      if (val === undefined) {
        delete this._headers[key];
      } else {
        this._headers[key] = val;
      }
    });
  }

  private static async _request<T>(url: string, config: HttpRequestConfig): Promise<T> {
    const {
      id = this.generateRequestId(config),
      headers = defaultHeaders,
      latestOnly,
      skipCustomHeaders,
      ...cfg
    } = config;

    if (activeRequests[id] && latestOnly) {
      activeRequests[id].controller.abort();
    }

    if (!activeRequests[id]) {
      const controller = new AbortController();
      const request = this._makeRequest(
        id,
        url,
        Object.assign({}, cfg, {
          body: JSON.stringify(config.body),
          signal: controller.signal,
          headers: skipCustomHeaders ? headers : { ...headers, ...this._headers }
        }) as RequestInit
      );
      activeRequests[id] = { request, controller };
    }

    return activeRequests[id].request;
  }

  private static _makeRequest<T>(id: string, url: string, config: RequestInit): Promise<T> {
    const time = Date.now();
    return fetch(url, config)
      .then(async (res: Response) => {
        const data: T = await res.json();
        log('success', url, config, data, time);
        return data;
      })
      .catch(error => {
        log('error', url, config, error, time);
        throw error;
      })
      .finally(() => {
        delete activeRequests[id];
      });
  }

  private static generateRequestId(options: any): string {
    return `${JSON.stringify(options)}`;
  }
}
