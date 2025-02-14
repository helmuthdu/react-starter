import { Logger } from './logger.util';

type RequestConfig = Omit<RequestInit, 'body'> & {
  id?: string;
  cancelable?: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: -
  body?: any;
};

type RequestParams = Record<string, string | number | undefined>;

export type RequestResponse<T> = {
  data: T;
  ok: boolean;
  status: number;
};

type ContextProps = {
  expiresIn?: number;
  headers?: Record<string, string>;
  params?: RequestParams;
  timeout?: number;
  url: string;
};

type RequestData<T> = {
  controller: AbortController;
  expires: ReturnType<typeof setTimeout>;
  request: Promise<RequestResponse<T>>;
  status: RequestStatus;
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

const HttpCache = {
  cache: {} as Record<string, RequestData<unknown>>,

  set<T>(id: string, data: RequestData<T>) {
    HttpCache.cache[id] = data;
  },

  get<T>(id: string): RequestData<T> | undefined {
    return HttpCache.cache[id] as RequestData<T>;
  },

  delete(id: string) {
    if (this.cache[id]?.status === RequestStatus.PENDING) {
      HttpCache.cache[id].controller.abort('Request aborted');
    }

    clearTimeout(HttpCache.cache[id]?.expires);
    delete HttpCache.cache[id];
  },
};

function log(type: keyof typeof ResponseTypeSymbol, url: string, req: RequestInit, res: unknown, time: number) {
  const elapsed = Math.floor(Date.now() - time);
  const logType = type.toUpperCase() as Lowercase<keyof typeof ResponseTypeSymbol>;
  const logUrl = url
    .replace(/http(s)?:\/\//, '')
    .split('/')
    .slice(1)
    .join('/');

  Logger[logType](`HTTP::${req.method?.toUpperCase()}(…/${logUrl}) ${ResponseTypeSymbol[type]} ${elapsed}ms`, {
    res,
    req,
    url,
  });
}

function makeRequest<T>(url: string, config: RequestConfig, context?: ContextProps): Promise<RequestResponse<T>> {
  const { id = JSON.stringify({ url, ...config }), headers, cancelable, ...cfg } = config;
  const cachedRequest = HttpCache.get<T>(id);

  if (
    (cancelable && cachedRequest?.status === RequestStatus.PENDING) ||
    cachedRequest?.status === RequestStatus.ERROR
  ) {
    HttpCache.delete(id);
  }

  if (!cachedRequest) {
    const controller = new AbortController();
    const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(context?.timeout ?? REQUEST_TIMEOUT)]);
    const request = fetcher<T>(
      context?.url ? `${context.url}/${url}` : url,
      {
        ...cfg,
        body: config.body && JSON.stringify(config.body),
        headers: { ...(context?.headers ?? {}), ...headers },
        signal,
      } as RequestConfig,
      { id },
    );

    HttpCache.set(id, {
      controller,
      expires: setTimeout(() => HttpCache.delete(id), context?.expiresIn ?? CACHE_EXPIRES_IN),
      request,
      status: RequestStatus.PENDING,
    });
  }

  return HttpCache.get<T>(id)!.request;
}

export function buildUrl(baseUrl: string, params?: RequestParams): string {
  if (!params) return baseUrl;
  const searchParams = new URLSearchParams(params as Record<string, string>);
  return `${baseUrl}?${searchParams.toString()}`;
}

export async function fetcher<T>(
  url: string,
  config: RequestInit,
  { id, retries = 2 }: { id?: string; retries?: number },
): Promise<RequestResponse<T>> {
  const time = Date.now();

  try {
    const response = await fetch(url, config);
    const contentType = response.headers.get('content-type') ?? '';

    let data: T;
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else if (contentType.includes('text')) {
      data = (await response.text()) as T;
    } else {
      data = (await response.blob()) as T;
    }

    log('SUCCESS', url, config, data, time);

    if (id) {
      HttpCache.get(id)!.status = RequestStatus.SUCCESS;
    }

    return { data, ok: response.ok, status: response.status };
  } catch (error) {
    log('ERROR', url, config, error, time);

    if (id) {
      HttpCache.get(id)!.status = RequestStatus.ERROR;
    }

    // Retry logic for network-related errors
    if (retries > 0 && error instanceof TypeError) {
      return fetcher(url, config, { id, retries: retries - 1 });
    }

    throw error;
  } finally {
    if (id && config.method !== RequestMethod.GET) {
      HttpCache.delete(id);
    }
  }
}

export function createHttpService(context = {} as ContextProps) {
  return {
    delete<T>(url: string, config?: RequestConfig): Promise<RequestResponse<T>> {
      return makeRequest<T>(url, { method: RequestMethod.DELETE, ...config }, context);
    },
    get<T>(url: string, config?: RequestConfig): Promise<RequestResponse<T>> {
      return makeRequest<T>(url, { method: RequestMethod.GET, ...config }, context);
    },
    patch<T>(url: string, config?: RequestConfig): Promise<RequestResponse<T>> {
      return makeRequest<T>(url, { method: RequestMethod.PATCH, ...config }, context);
    },
    post<T>(url: string, config?: RequestConfig): Promise<RequestResponse<T>> {
      return makeRequest<T>(url, { method: RequestMethod.POST, ...config }, context);
    },
    put<T>(url: string, config?: RequestConfig): Promise<RequestResponse<T>> {
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
