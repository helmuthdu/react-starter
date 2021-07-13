import useSWR, { SWRConfiguration } from 'swr';
import { fetcher } from '../utils';

const useHttp = <T>(url: string, config?: SWRConfiguration) => {
  return useSWR<T>(url, fetcher, config);
};
