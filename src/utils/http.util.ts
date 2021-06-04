import fetch from 'isomorphic-unfetch';
import { Logger } from './logger.util';

type HttpRequestConfig = Omit<RequestInit, 'body'> & {
  id?: string;
  cancelable?: boolean;
  customHeaders?: boolean;
  url: string;
  body?: any;
};

enum TypeSymbol {
  success = '✓',
  error = '✕'
}

const log = (type: keyof typeof TypeSymbol, req: HttpRequestConfig, res: unknown, time: number) => {
  const url = (req.url?.replace(/http(s)?:\/\//, '').split('/') as string[]) ?? [];
  url.shift();
  const timestamp = Logger.getTimestamp();
  Logger.groupCollapsed(`${req.method?.toUpperCase()}(…/${url.join('/')}) ${TypeSymbol[type]}`, `HTTP`, time);
  Logger.setTimestamp(false);
  Logger.info('req: ', req);
  Logger[type]('res:' as never, res);
  Logger.setTimestamp(timestamp);
  Logger.groupEnd();
};

const activeRequests = {} as Record<string, { request: Promise<any>; controller: AbortController }>;

const defaultHeaders = {
  'Content-Type': 'application/json'
};

const _customHeaders: Record<string, string | number> = {};

const _generateId = (options: any): string => {
  return `${JSON.stringify(options)}`;
};

const _request = <T>(id: string, config: HttpRequestConfig): Promise<T> => {
  const { url, ...cfg } = config;
  const time = Date.now();
  return fetch(url, cfg)
    .then(async (res: Response) => {
      const data: T = await res.json();
      log('success', config, data, time);
      return data;
    })
    .catch(error => {
      log('error', config, error, time);
      throw error;
    })
    .finally(() => {
      delete activeRequests[id];
    });
};

const _createRequest = <T>(config: HttpRequestConfig): Promise<T> => {
  const { id = _generateId(config), headers = defaultHeaders, cancelable, customHeaders = true, ...cfg } = config;

  if (activeRequests[id] && cancelable) {
    activeRequests[id].controller.abort();
  }

  if (!activeRequests[id]) {
    const controller = new AbortController();
    const request = _request(
      id,
      Object.assign({}, cfg, {
        body: JSON.stringify(config.body),
        headers: customHeaders ? { ...headers, ..._customHeaders } : headers,
        signal: controller.signal
      }) as HttpRequestConfig
    );
    activeRequests[id] = { request, controller };
  }

  return activeRequests[id].request;
};

export const Http = {
  get<T>(url: string, config?: Omit<HttpRequestConfig, 'url'>): Promise<T> {
    return _createRequest<T>({ url, method: 'GET', ...config });
  },
  post<T>(url: string, config?: Omit<HttpRequestConfig, 'url'>): Promise<T> {
    return _createRequest<T>({ url, method: 'POST', ...config });
  },
  put<T>(url: string, config?: Omit<HttpRequestConfig, 'url'>): Promise<T> {
    return _createRequest<T>({ url, method: 'PUT', ...config });
  },
  patch<T>(url: string, config?: Omit<HttpRequestConfig, 'url'>): Promise<T> {
    return _createRequest<T>({ url, method: 'PATCH', ...config });
  },
  delete<T>(url: string, config?: Omit<HttpRequestConfig, 'url'>): Promise<T> {
    return _createRequest<T>({ url, method: 'DELETE', ...config });
  },
  setCustomHeaders(headers: Record<string, string | number | undefined>): void {
    Object.entries(headers).forEach(([key, val]) => {
      if (val === undefined) {
        delete _customHeaders[key];
      } else {
        _customHeaders[key] = val;
      }
    });
  }
};
