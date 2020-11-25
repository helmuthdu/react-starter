/* eslint-disable */
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

export const groupBy = <T>(list: T | T[] | ReadonlyArray<T>, key: keyof T): DictionaryArray<T> =>
  Object.values(list).reduce(
    (acc: DictionaryArray<T>, val: T, idx: number, arr: T[] | ReadonlyArray<T>, prop = val[key]) => {
      if (!prop) return acc;
      if (!acc[prop]) acc[prop] = [];
      acc[prop].push(val);
      return acc;
    },
    {}
  );

export const keyBy = <T>(list: T | T[] | ReadonlyArray<T>, key: keyof T): Dictionary<T> =>
  Object.values(list).reduce(
    (acc: Dictionary<T>, val: T, idx: number, arr: T[] | ReadonlyArray<T>, prop = val[key]) => {
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
  fns.reduce(
    (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
    value => value
  )(fn(...args));

export const sortBy = <T, K extends keyof T>(arr: T[], key: K) =>
  [...arr].sort((a: T, b: T) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));

export const uniq = (arr: number[]) => [...new Set(arr)];

export const type = (val: any) => {
  const typeOf = typeof val;

  if (val === null) {
    return 'Null';
  } else if (val === undefined) {
    return 'Undefined';
  } else if (typeOf === 'boolean') {
    return 'Boolean';
  } else if (typeOf === 'number') {
    return Number.isNaN(val) ? 'NaN' : 'Number';
  } else if (typeOf === 'string') {
    return 'String';
  } else if (Array.isArray(val)) {
    return 'Array';
  } else if (val instanceof RegExp) {
    return 'RegExp';
  }

  const asStr = val.toString();

  if (asStr.startsWith('async')) {
    return 'Async';
  } else if (asStr === '[object Promise]') {
    return 'Promise';
  } else if (typeOf === 'function') {
    return 'Function';
  }

  return 'Object';
};

export const isEquals = function (a: any, b: any) {
  if (arguments.length === 1) return (_b: any) => isEquals(a, _b);

  if (a === b) {
    return true;
  }

  const aType = type(a);

  if (aType !== type(b)) {
    return false;
  }

  if (aType === 'Array') {
    const aClone = Array.from(a);
    const bClone = Array.from(b);

    if (aClone.toString() !== bClone.toString()) {
      return false;
    }

    let loopArrayFlag = true;
    aClone.forEach((aCloneInstance, aCloneIndex) => {
      if (loopArrayFlag) {
        if (aCloneInstance !== bClone[aCloneIndex] && !isEquals(aCloneInstance, bClone[aCloneIndex])) {
          loopArrayFlag = false;
        }
      }
    });

    return loopArrayFlag;
  }

  if (aType === 'Object') {
    const aKeys = Object.keys(a);

    if (aKeys.length !== Object.keys(b).length) {
      return false;
    }

    let loopObjectFlag = true;
    aKeys.forEach(aKeyInstance => {
      if (loopObjectFlag) {
        const aValue = a[aKeyInstance];
        const bValue = b[aKeyInstance];

        if (aValue !== bValue && !isEquals(aValue, bValue)) {
          loopObjectFlag = false;
        }
      }
    });

    return loopObjectFlag;
  }

  return false;
};

export const isEmpty = (val: any): boolean =>
  [Object, Array].includes((val || {}).constructor) && !Object.entries(val || {}).length;

export const isArray = (arr: any) => arr && [Array].includes((arr || {}).constructor);

export const isObject = (obj: any) => obj && [Object].includes((obj || {}).constructor);

export const toSnakeCase = (str: string) =>
  str
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(s => s.toLowerCase())
    .join('_');

export const toKebabCase = (str: string) =>
  str
    ? str
        .replace(/([a-z])([A-Z])/g, '$1-$2') // get all lowercase letters that are near to uppercase ones
        .replace(/[\s_]+/g, '-') // replace all spaces and low dash
        .toLowerCase() // convert to lower case
    : '';
