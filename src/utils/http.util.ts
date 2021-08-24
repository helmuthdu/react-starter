/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from './logger.util';

export type HttpRequestConfig = Omit<RequestInit, 'body'> & {
  id?: string;
  cancelable?: boolean;
  customHeaders?: boolean;
  body?: any;
};

enum TypeSymbol {
  success = '✓',
  error = '✕'
}

const log = (type: keyof typeof TypeSymbol, url: string, req: RequestInit, res: unknown, time: number) => {
  const _url = (url?.replace(/http(s)?:\/\//, '').split('/') as string[]) ?? [];
  _url.shift();
  const elapsed = Math.floor(Date.now() - time);
  Logger.info(`HTTP::${req.method?.toUpperCase()}(…/${_url.join('/')}) ${TypeSymbol[type]} ${elapsed}ms`, res);
};

const activeRequests = {} as Record<string, { request: Promise<any>; controller: AbortController }>;

const defaultHeaders = {
  'Content-Type': 'application/json'
};

const customHeadersProps: Record<string, string | number> = {};

const generateId = (options: any): string => {
  return `${JSON.stringify(options)}`;
};

const makeRequest = <T>(url: string, config: HttpRequestConfig): Promise<T> => {
  const { id = generateId(config), headers = defaultHeaders, cancelable, customHeaders = true, ...cfg } = config;

  if (activeRequests[id] && cancelable) {
    activeRequests[id].controller.abort();
    delete activeRequests[id];
  }

  if (!activeRequests[id]) {
    const controller = new AbortController();
    const request = fetcher(
      url,
      Object.assign({}, cfg, {
        body: JSON.stringify(config.body),
        headers: customHeaders ? { ...headers, ...customHeadersProps } : headers,
        signal: controller.signal
      }) as HttpRequestConfig,
      id
    );
    activeRequests[id] = { request, controller };
  }

  return activeRequests[id].request;
};

export const fetcher = <T>(url: string, config: RequestInit, id?: string): Promise<T> => {
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
      if (id) {
        delete activeRequests[id];
      }
    });
};

export const Http = {
  get<T>(url: string, config?: Omit<HttpRequestConfig, 'url'>): Promise<T> {
    return makeRequest<T>(url, { method: 'GET', ...config });
  },
  post<T>(url: string, config?: Omit<HttpRequestConfig, 'url'>): Promise<T> {
    return makeRequest<T>(url, { method: 'POST', ...config });
  },
  put<T>(url: string, config?: Omit<HttpRequestConfig, 'url'>): Promise<T> {
    return makeRequest<T>(url, { method: 'PUT', ...config });
  },
  patch<T>(url: string, config?: Omit<HttpRequestConfig, 'url'>): Promise<T> {
    return makeRequest<T>(url, { method: 'PATCH', ...config });
  },
  delete<T>(url: string, config?: Omit<HttpRequestConfig, 'url'>): Promise<T> {
    return makeRequest<T>(url, { method: 'DELETE', ...config });
  },
  setCustomHeaders(headers: Record<string, string | number | undefined>): void {
    Object.entries(headers).forEach(([key, val]) => {
      if (val === undefined) {
        delete customHeadersProps[key];
      } else {
        customHeadersProps[key] = val;
      }
    });
  }
};
