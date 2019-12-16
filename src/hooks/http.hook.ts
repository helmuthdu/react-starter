import useSWR, { ConfigInterface } from 'swr';

export const useHttp = <T>(url: string, options?: ConfigInterface) => {
  return useSWR<T>(url, options);
};
