import useSWR, { SWRConfiguration } from 'swr';
import { fetcher, HttpResponse } from '../utils';

export const useHttp = <T>(url: string, config?: SWRConfiguration) => {
  return useSWR<HttpResponse<T>>(url, fetcher, config);
};
