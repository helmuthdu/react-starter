import { Logger } from './logger.util';

export type HttpRequestConfig = Omit<RequestInit, 'body'> & {
  id?: string;
  cancelable?: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: -
  body?: any;
};

export type HttpResponse<T> = {
  data: T;
  ok: boolean;
  status: number;
};

type ContextData = Record<string, string | number | undefined>;

type ContextProps = {
  expiresIn?: number;
  headers?: ContextData;
  params?: ContextData;
  timeout?: number;
  url: string;
};

type RequestData<T> = {
  controller: AbortController;
  expires: ReturnType<typeof setTimeout>;
  request: Promise<HttpResponse<T>>;
  status: RequestStatus;
  timeout: ReturnType<typeof setTimeout>;
};

enum ResponseTypeSymbol {
  ERROR = '✕',
  SUCCESS = '✓',
}

enum RequestMethod {
  DELETE = 'DELETE',
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

export enum RequestErrorType {
  BAD_REQUEST = '400|BAD_REQUEST',
  UNAUTHORIZED = '401|UNAUTHORIZED',
  FORBIDDEN = '403|FORBIDDEN',
  NOT_FOUND = '404|NOT_FOUND',
  NOT_ALLOWED = '405|NOT_ALLOWED',
  TIMEOUT = '408|TIMEOUT',
  CONFLICT = '409|CONFLICT',
  ABORTED = '499|ABORTED',
}

export enum RequestStatus {
  ERROR = 'ERROR',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

const REQUEST_TIMEOUT = 1000 * 5; // 5 seconds
const CACHE_EXPIRES_IN = 1000 * 60 * 2; // 2 minutes

const requestData = {} as Record<string, RequestData<unknown>>;

function log(type: keyof typeof ResponseTypeSymbol, url: string, req: RequestInit, res: unknown, time: number) {
  const elapsed = Math.floor(Date.now() - time);
  const logType = type.toUpperCase() as Lowercase<keyof typeof ResponseTypeSymbol>;
  const logUrl = (url?.replace(/http(s)?:\/\//, '').split('/') as string[]) ?? [];
  logUrl.shift();

  Logger[logType](
    `HTTP::${req.method?.toUpperCase()}(…/${logUrl.join('/')}) ${ResponseTypeSymbol[type]} ${elapsed}ms`,
    res,
  );
}

function deleteRequest(id: string) {
  if (requestData[id]?.status === RequestStatus.PENDING) requestData[id].controller.abort('Request aborted');

  clearTimeout(requestData[id].expires);
  clearTimeout(requestData[id].timeout);
  delete requestData[id];
}

function makeRequest<T>(url: string, config: HttpRequestConfig, context?: ContextProps): Promise<HttpResponse<T>> {
  const { id = JSON.stringify({ url, ...config }), headers, cancelable, ...cfg } = config;
  const data = requestData[id];

  if ((cancelable && data?.status === RequestStatus.PENDING) || data?.status === RequestStatus.ERROR) {
    deleteRequest(id);
  }

  if (!data) {
    const controller = new AbortController();
    const request = fetcher<T>(
      context?.url ? `${context.url}/${url}` : url,
      Object.assign({}, cfg, {
        body: config.body && JSON.stringify(config.body),
        headers: context?.headers ? { ...context.headers, ...headers } : headers,
        signal: controller.signal,
      }) as HttpRequestConfig,
      id,
    );

    requestData[id] = {
      controller,
      expires: setTimeout(() => delete requestData[id], context?.expiresIn ?? CACHE_EXPIRES_IN),
      request,
      status: RequestStatus.PENDING,
      timeout: setTimeout(() => {
        if (requestData[id].status === RequestStatus.PENDING) controller.abort('Request timeout');
      }, context?.timeout ?? REQUEST_TIMEOUT),
    };
  }

  return requestData[id].request as Promise<HttpResponse<T>>;
}

export async function fetcher<T>(url: string, config: RequestInit, id?: string): Promise<HttpResponse<T>> {
  const time = Date.now();

  return fetch(url, config)
    .then(async (res: Response) => {
      const data: T = await res.json();

      log('SUCCESS', url, config, data, time);

      if (id) {
        requestData[id].status = RequestStatus.SUCCESS;
      }

      return { data, ok: res.ok, status: res.status };
    })
    .catch((error) => {
      log('ERROR', url, config, error, time);

      if (id) {
        requestData[id].status = RequestStatus.ERROR;
      }

      throw error;
    })
    .finally(() => {
      if (id && config.method !== RequestMethod.GET) {
        deleteRequest(id);
      }
    });
}

export function createHttpService(context = {} as ContextProps) {
  return {
    delete<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
      return makeRequest<T>(url, { method: RequestMethod.DELETE, ...config }, context);
    },
    get<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
      return makeRequest<T>(url, { method: RequestMethod.GET, ...config }, context);
    },
    patch<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
      return makeRequest<T>(url, { method: RequestMethod.PATCH, ...config }, context);
    },
    post<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
      return makeRequest<T>(url, { method: RequestMethod.POST, ...config }, context);
    },
    put<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
      return makeRequest<T>(url, { method: RequestMethod.PUT, ...config }, context);
    },
    setHeaders(payload: Record<string, string | undefined>): void {
      context.headers ||= {};
      const headers = Object.entries(payload);
      for (const [key, val] of headers) {
        if (val === undefined) {
          delete context.headers[key];
        } else {
          context.headers[key] = val;
        }
      }
    },
  };
}

export const Http = createHttpService();
