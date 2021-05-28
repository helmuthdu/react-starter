import fetch from 'isomorphic-unfetch';
import { Logger } from './logger.util';

type HttpRequestConfig = RequestInit & { id?: string };

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

export class Http {
  private static _headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  static async get<T>(url: string, config?: HttpRequestConfig, latestOnly?: boolean): Promise<T> {
    return await this._request<T>(url, { method: 'GET', ...config }, latestOnly);
  }

  static async post<T>(url: string, config?: HttpRequestConfig, latestOnly?: boolean): Promise<T> {
    return await this._request<T>(url, { method: 'POST', ...config }, latestOnly);
  }

  static async put<T>(url: string, config?: HttpRequestConfig, latestOnly?: boolean): Promise<T> {
    return await this._request<T>(url, { method: 'PUT', ...config }, latestOnly);
  }

  static async patch<T>(url: string, config?: HttpRequestConfig, latestOnly?: boolean): Promise<T> {
    return await this._request<T>(url, { method: 'PATCH', ...config }, latestOnly);
  }

  static async delete<T>(url: string, config?: HttpRequestConfig, latestOnly?: boolean): Promise<T> {
    return await this._request<T>(url, { method: 'DELETE', ...config }, latestOnly);
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

  private static async _request<T>(url: string, config: HttpRequestConfig, latestOnly?: boolean): Promise<T> {
    const { id = this.generateRequestId(config), ...cfg } = config;

    if (activeRequests[id] && latestOnly) {
      activeRequests[id].controller.abort();
    }

    if (!activeRequests[id]) {
      const controller = new AbortController();
      const request = this._makeRequest(id, url, { ...cfg, signal: controller.signal });
      activeRequests[id] = { request, controller };
    }

    return activeRequests[id].request;
  }

  private static _makeRequest<T>(id: string, url: string, config: RequestInit): Promise<T> {
    const cfg: RequestInit = Object.assign({}, config, {
      headers: {
        ...this._headers,
        ...config.headers
      }
    });

    const time = Date.now();
    return fetch(url, cfg)
      .then(async (res: Response) => {
        const data: T = await res.json();
        log('success', url, cfg, data, time);
        return data;
      })
      .catch(error => {
        log('error', url, cfg, error, time);
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
