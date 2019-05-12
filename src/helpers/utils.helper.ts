// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore

export const pipe = <T extends unknown[], R>(fn1: (...args: T) => R, ...fns: ((a: R) => R)[]) => (...args: T) =>
  fns.reduce((prevFn, nextFn) => (value: R) => nextFn(prevFn(value)), value => value)(fn1(...args));

export const compose = <R>(fn1: (a: R) => R, ...fns: ((a: R) => R)[]) =>
  fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)), fn1);

export const first = <T>(arr: T[], total = 1): T[] => arr.slice(0, total);

export const last = <T>(arr: T[], total = 1): T[] => arr.slice(-total);

export const sortBy = <T, K extends keyof T>(arr: T[], key: K) =>
  [...arr].sort((a: T, b: T) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));

export const uniq = (arr: number[]) => [...new Set(arr)];

export const get = <T, K extends keyof T>(obj: T, path: K | string, defaultValue: unknown = null) =>
  String.prototype.split
    .call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((acc: any, cur: string) => (Object.hasOwnProperty.call(acc, cur) ? acc[cur] : defaultValue), obj);

export const isEmpty = (val: any): boolean =>
  [Object, Array].includes((val || {}).constructor) && !Object.entries(val || {}).length;

type KeyOf<T> = { [key: string]: T };
export const keyBy = <T, K extends keyof T>(collection: T | T[] | ReadonlyArray<T>, key: K): KeyOf<T> =>
  (Array.isArray(collection) ? collection : Object.values(collection)).reduce(
    (acc: KeyOf<T>, val: T, idx: number, arr: T | T[] | ReadonlyArray<T>, prop = val[key]) => {
      if (!prop) return acc;
      acc[prop] = val;
      return acc;
    },
    {}
  );

type GroupBy<T> = { [key: string]: [T] };
export const groupBy = <T, K extends keyof T>(collection: T | T[] | ReadonlyArray<T>, key: K): GroupBy<T> =>
  (Array.isArray(collection) ? collection : Object.values(collection)).reduce(
    (acc: GroupBy<T>, val: T, idx: number, arr: T | T[] | ReadonlyArray<T>, k = val[key]) => {
      if (!k) return acc;
      acc[k] = acc[k] || [];
      acc[k].push(val);
      return acc;
    },
    {}
  );

export const snakeCase = (str: string) =>
  str
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(s => s.toLowerCase())
    .join('_');
