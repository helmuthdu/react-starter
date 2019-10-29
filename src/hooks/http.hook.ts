import useSWR, { ConfigInterface } from '@zeit/swr';
import fetch from 'isomorphic-unfetch';

export const useHttp = <T>(url: string, options?: ConfigInterface) => {
  return useSWR<T>(url, fetch, options);
};
