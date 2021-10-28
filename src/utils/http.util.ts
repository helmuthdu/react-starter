/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from './logger.util';

export type HttpRequestConfig = Omit<RequestInit, 'body'> & {
  id?: string;
  cancelable?: boolean;
  body?: any;
};

type ContextData = Record<string, string | number | undefined>;
type ContextProps = {
  url: string;
  headers?: ContextData;
  params?: ContextData;
};

enum TypeSymbol {
  success = '✓',
  error = '✕'
}

const _activeRequests = {} as Record<string, { request: Promise<any>; controller: AbortController }>;

const _generateId = (options: any): string => {
  return `${JSON.stringify(options)}`;
};

const _log = (type: keyof typeof TypeSymbol, url: string, req: RequestInit, res: unknown, time: number) => {
  const _url = (url?.replace(/http(s)?:\/\//, '').split('/') as string[]) ?? [];
  _url.shift();
  const elapsed = Math.floor(Date.now() - time);
  Logger.info(`HTTP::${req.method?.toUpperCase()}(…/${_url.join('/')}) ${TypeSymbol[type]} ${elapsed}ms`, res);
};

const _makeRequest = <T>(url: string, config: HttpRequestConfig, context?: ContextProps): Promise<T> => {
  const { id = _generateId(config), headers, cancelable, ...cfg } = config;

  if (_activeRequests[id] && cancelable) {
    _activeRequests[id].controller.abort();
    delete _activeRequests[id];
  }

  if (!_activeRequests[id]) {
    const controller = new AbortController();
    const request = fetcher(
      context?.url ? `${context.url}/${url}` : url,
      Object.assign({}, cfg, {
        body: config.body && JSON.stringify(config.body),
        headers: context?.headers ? { ...context.headers, ...headers } : headers,
        signal: controller.signal
      }) as HttpRequestConfig,
      id
    );
    _activeRequests[id] = { request, controller };
  }

  return _activeRequests[id].request;
};

export const fetcher = <T>(url: string, config: RequestInit, id?: string): Promise<T> => {
  const time = Date.now();
  return fetch(url, config)
    .then(async (res: Response) => {
      const data: T = await res.json();
      _log('success', url, config, data, time);
      return data;
    })
    .catch(error => {
      _log('error', url, config, error, time);
      throw error;
    })
    .finally(() => {
      if (id) {
        delete _activeRequests[id];
      }
    });
};

export const createHttpService = (context?: ContextProps) => ({
  get<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    return _makeRequest<T>(url, { method: 'GET', ...config });
  },
  post<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    return _makeRequest<T>(url, { method: 'POST', ...config });
  },
  put<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    return _makeRequest<T>(url, { method: 'PUT', ...config });
  },
  patch<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    return _makeRequest<T>(url, { method: 'PATCH', ...config });
  },
  delete<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    return _makeRequest<T>(url, { method: 'DELETE', ...config });
  },
  setHeaders(headers: Record<string, string | undefined>): void {
    Object.entries(headers).forEach(([key, val]) => {
      if (context?.headers) {
        if (val === undefined) {
          delete context.headers[key];
        } else {
          context.headers[key] = val;
        }
      }
    });
  }
});

export const Http = createHttpService();
