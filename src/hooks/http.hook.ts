import useSWR, { type SWRConfiguration } from 'swr';
import { type HttpResponse, fetcher } from '../utils';

export const useHttp = <T>(url: string, config?: SWRConfiguration) => {
  return useSWR<HttpResponse<T>>(url, fetcher, config);
};
