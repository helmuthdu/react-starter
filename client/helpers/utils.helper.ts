// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore

export const compose = <R>(fn: (args: R) => R, ...fns: ((args: R) => R)[]) =>
  fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)), fn);

export const first = <T>(list: T[], total = 1): T[] => list.slice(0, total);

export const flatten = (list: unknown | unknown[]): unknown[] =>
  Array.isArray(list) ? list.reduce((acc, cur) => acc.concat(flatten(cur)), []) : list;

export const get = <T, K extends keyof T>(obj: T, path: K | string, defaultValue: unknown = null) =>
  String.prototype.split
    .call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((acc: any, cur: string) => (Object.hasOwnProperty.call(acc, cur) ? acc[cur] : defaultValue), obj);

export const groupBy = <T, K extends keyof T>(list: T | T[], key: K): DictionaryArray<T> =>
  (Array.isArray(list) ? list : Object.values(list)).reduce(
    (acc: DictionaryArray<T>, val: T, idx: number, arr: T | T[], k = val[key]) => {
      if (!k) return acc;
      // @ts-ignore
      acc[k] = acc[k] || [];
      acc[k].push(val);
      return acc;
    },
    {}
  );

export const isEmpty = (val: any): boolean =>
  [Object, Array].includes((val || {}).constructor) && !Object.entries(val || {}).length;

export const keyBy = <T, K extends keyof T>(list: T | T[], key: K): Dictionary<T> =>
  (Array.isArray(list) ? list : Object.values(list)).reduce(
    (acc: Dictionary<T>, val: T, idx: number, arr: T | T[], prop = val[key]) => {
      if (!prop) return acc;
      acc[prop] = val;
      return acc;
    },
    {}
  );

export const keys = <T, K extends keyof T>(obj: T) => Object.keys(obj) as K[];

export const values = <T, K extends keyof T>(obj: T) => Object.values(obj) as T[K][];

export const last = <T>(arr: T[], total = 1): T[] => arr.slice(-total);

export const pipe = <T extends unknown[], R>(fn: (...args: T) => R, ...fns: ((args: R) => R)[]) => (...args: T) =>
  fns.reduce((prevFn, nextFn) => (value: R) => nextFn(prevFn(value)), value => value)(fn(...args));

export const snakeCase = (str: string) =>
  str
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(s => s.toLowerCase())
    .join('_');

export const sortBy = <T, K extends keyof T>(arr: T[], key: K) =>
  [...arr].sort((a: T, b: T) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));

export const uniq = (arr: number[]) => [...new Set(arr)];
