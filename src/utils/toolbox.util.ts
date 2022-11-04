// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore
import { Logger } from './logger.util';

export const type = (val: any) => {
  if (val === null) {
    return 'Null';
  } else if (val === undefined) {
    return 'Undefined';
  } else if (Number.isNaN(val)) {
    return 'NaN';
  }
  const type = Object.prototype.toString.call(val).slice(8, -1);
  return type === 'AsyncFunction' ? 'Promise' : type;
};

export const isArray = Array.isArray;
export const isEmpty = (val: any) => (isArray(val) || isObject(val)) && !Object.entries(val || {}).length;
export const isFunction = (val: any) => type(val) === 'Function';
export const isNil = (val: any) => val === undefined || val === null;
export const isNumber = (val: any) => type(val) === 'Number';
export const isObject = (val: any) => type(val) === 'Object';
export const isPromise = (val: any) => ['Async', 'Promise'].includes(type(val));
export const isString = (val: any) => type(val) === 'String';
export const isEquals = (a: any, b: any): boolean => {
  if (a === b) return true;

  if (type(a) !== type(b)) return false;

  if (isArray(a)) {
    if (a.toString() !== b.toString()) return false;
    return !a.some((val, idx) => val !== b[idx] && !isEquals(val, b[idx]));
  }

  if (isObject(a)) {
    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;
    return !keys.some(key => a[key] !== b[key] && !isEquals(a[key], b[key]));
  }

  return false;
};

// eslint-disable-next-line no-prototype-builtins
export const has = (val: any, prop: string) => val?.hasOwnProperty(prop);

export const get = <T, K extends keyof T>(obj: T, path: K | string, defaultValue: unknown = null) =>
  String.prototype.split
    .call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((acc: any, cur: string) => (Object.hasOwnProperty.call(acc, cur) ? acc[cur] : defaultValue), obj);

export const groupBy = <T extends object>(data: T | T[] | ReadonlyArray<T>, key: keyof T) =>
  isObject(data)
    ? Object.values(data).reduce(
        (acc: DictionaryArray<T>, val: T, idx: number, arr: T[] | ReadonlyArray<T>, prop = val[key]) =>
          (acc[prop] || (acc[prop] = [])).push(val),
        {}
      )
    : {};

export const sortBy = <T, K extends keyof T>(arr: T[], key: K) =>
  [...arr].sort((a: T, b: T) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));

export const keyBy = <T extends object>(data: T | T[] | ReadonlyArray<T>, key: keyof T): Dictionary<T> =>
  isObject(data)
    ? Object.values(data).reduce(
        (acc: Dictionary<T>, val: T, idx: number, arr: T[] | ReadonlyArray<T>, prop = val[key]) => {
          if (!prop) return acc;
          acc[prop] = val;
          return acc;
        },
        {}
      )
    : {};

export const uniq = (data: number[]) => [...new Set(data)];
export const flatten = <T>(data: T | T[]) => (isArray(data) ? data.flat(Infinity) : data);

export const keys = <T extends object, K extends keyof T>(data: T) =>
  isObject(data) ? (Object.keys(data) as K[]) : [];
export const values = <T extends object, K extends keyof T>(data: T) =>
  isObject(data) ? (Object.values(data) as T[K][]) : [];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const entries = <T extends object, K extends keyof T>(data: T) =>
  isObject(data) ? (Object.entries(data) as { [K in keyof T]: [K, T[K]] }[keyof T][]) : [];

export const compose = <R>(fn: (args: R) => R, ...fns: ((args: R) => R)[]) =>
  fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)), fn);

export const pipe =
  <T extends unknown[], R>(fn: (...args: T) => R, ...fns: ((args: R) => R)[]) =>
  (...args: T) =>
    fns.reduce(
      (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
      value => value
    )(fn(...args));

export const merge = <T extends Record<string, any>[]>(...data: [...T]): Spread<T> => {
  const target = data.shift();
  if (!target) return {} as any;
  const source = data.shift();
  if (!source) return target as any;
  entries(source).forEach(([key, val]) => {
    if (isObject(val)) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      merge(target[key], val);
    } else {
      Object.assign(target, { [key]: val });
    }
  });
  return merge(target, ...data) as unknown as Spread<T>;
};

export const toSnakeCase = (text: string) =>
  text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(s => s.toLowerCase())
    .join('_');

export const toKebabCase = (text: string) =>
  text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

export const uuid = (): string => window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

export const parseJson = <T, K>(data: K, defaultValue?: T): T | undefined => {
  try {
    const value = typeof data === 'string' ? JSON.parse(data) : data;
    return value || defaultValue;
  } catch (err) {
    Logger.error('parseJson() -> failed to parse object', err);
    return defaultValue;
  }
};

export const truncate = (value: string, limit = 25, completeWords = false, ellipsis = '…'): string => {
  if (completeWords) {
    limit = value.substring(0, limit).lastIndexOf(' ');
  }
  return value.length > limit ? `${value.substring(0, limit)}${ellipsis}` : value;
};

export const debounce = <T extends (...args: unknown[]) => void>(fn: T, ms = 0, immediate?: boolean) => {
  let timeout: NodeJS.Timeout | undefined;

  return (...args: unknown[]): ReturnType<T> | void => {
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = undefined;
      if (!immediate) {
        return fn(...args);
      }
    }, ms);
    if (callNow) {
      return fn(...args);
    }
  };
};

type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never;
type UnwrapPromisify<T> = T extends Promise<infer U> ? U : T;
export const tryit =
  <T extends (...args: any) => any>(fn: T) =>
  async (...args: ArgumentsType<T>): Promise<{ error?: Error; data?: UnwrapPromisify<ReturnType<T>> }> => {
    try {
      return { error: undefined, data: await fn(...(args as any)) };
    } catch (err) {
      return { error: err as Error, data: undefined };
    }
  };

export const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const delay = async (fn: () => any, timer = 700) => {
  await timeout(timer);
  return Promise.resolve(fn());
};
