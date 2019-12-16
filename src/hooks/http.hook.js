import useSWR from 'swr';
import fetch from 'isomorphic-unfetch';

export const useHttp = (url, options) => {
  return useSWR(url, fetch, options);
};
