/* eslint-disable */
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore

export const get = <T, K extends keyof T>(obj: T, path: K | string, defaultValue: unknown = null) =>
  String.prototype.split
    .call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((acc: any, cur: string) => (Object.hasOwnProperty.call(acc, cur) ? acc[cur] : defaultValue), obj);

export const groupBy = <T>(list: T | T[] | ReadonlyArray<T>, key: keyof T) =>
  Object.values(list).reduce(
    (acc: DictionaryArray<T>, val: T, idx: number, arr: T[] | ReadonlyArray<T>, prop = val[key]) =>
      (acc[prop] || (acc[prop] = [])).push(val),
    {}
  );

export const sortBy = <T, K extends keyof T>(arr: T[], key: K) =>
  [...arr].sort((a: T, b: T) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));

export const keyBy = <T>(list: T | T[] | ReadonlyArray<T>, key: keyof T): Dictionary<T> =>
  Object.values(list).reduce(
    (acc: Dictionary<T>, val: T, idx: number, arr: T[] | ReadonlyArray<T>, prop = val[key]) => {
      if (!prop) return acc;
      acc[prop] = val;
      return acc;
    },
    {}
  );

export const uniq = (arr: number[]) => [...new Set(arr)];
export const flatten = <T>(list: T | T[]) => (Array.isArray(list) ? list.flat(Infinity) : list);

export const keys = <T, K extends keyof T>(obj: T) => Object.keys(obj) as K[];
export const values = <T, K extends keyof T>(obj: T) => Object.values(obj) as T[K][];

export const first = <T>(list: T[], total = 1): T[] => list.slice(0, total);
export const last = <T>(arr: T[], total = 1): T[] => arr.slice(-total);

export const compose = <R>(fn: (args: R) => R, ...fns: ((args: R) => R)[]) =>
  fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)), fn);
export const pipe =
  <T extends unknown[], R>(fn: (...args: T) => R, ...fns: ((args: R) => R)[]) =>
  (...args: T) =>
    fns.reduce(
      (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
      value => value
    )(fn(...args));

type MergeOutput<T> = Required<{ [K in keyof T]: T[K] }>;
export const merge = <T extends Record<string, any>>(target: T, ...sources: T[]): MergeOutput<T> => {
  const source = sources.shift();
  if (!source) return target as MergeOutput<T>;
  Object.keys(source).forEach(key => {
    if (isObject(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      merge(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  });
  return merge(target, ...sources);
};

export const type = (val: any) => {
  if (val === null) {
    return 'Null';
  } else if (val === undefined) {
    return 'Undefined';
  } else if (Number.isNaN(val)) {
    return 'NaN';
  }
  const cast = Object.prototype.toString.call(val).slice(8, -1);
  return cast === 'AsyncFunction' ? 'Promise' : cast;
};

export const isEquals = (a: any, b: any): boolean => {
  if (a === b) return true;

  if (type(a) !== type(b)) return false;

  if (isArray(type(a))) {
    const _a = Array.from(a);
    const _b = Array.from(b);
    if (_a.toString() !== _b.toString()) return false;
    return !_a.some((val, idx) => val !== _b[idx] && !isEquals(val, _b[idx]));
  }

  if (isObject(type(a))) {
    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;
    return !keys.some(key => a[key] !== b[key] && !isEquals(a[key], b[key]));
  }

  return false;
};

export const isArray = (val: unknown) => type(val) === 'Array';
export const isFunction = (val: unknown) => type(val) === 'Function';
export const isNumber = (val: unknown) => type(val) === 'Number';
export const isObject = (val: unknown) => type(val) === 'Object';
export const isString = (val: unknown) => type(val) === 'String';
export const isEmpty = (val: any) =>
  [Object, Array].includes((val || {}).constructor) && !Object.entries(val || {}).length;

export const toSnakeCase = (str: string) =>
  str
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(s => s.toLowerCase())
    .join('_');

export const toKebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

export const uuid = (): string => window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
