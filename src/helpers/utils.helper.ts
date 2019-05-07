// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore

export const sortBy = <T, K extends keyof T>(arr: T[], key: K) =>
  [...arr].sort((a: T, b: T) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));

export const uniq = (arr: number[]) => [...new Set(arr)];

export const get = (obj: any, path: string, defaultValue: any = null) =>
  String.prototype.split
    .call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((a, c) => (Object.hasOwnProperty.call(a, c) ? a[c] : defaultValue), obj);

export const isEmpty = (val: any): boolean =>
  [Object, Array].includes((val || {}).constructor) && !Object.entries(val || {}).length;

export const keyBy = <T, K extends keyof T>(arr: T[] | ReadonlyArray<T>, key: K): { [key: string]: T } =>
  arr.reduce((acc: any, val: T) => {
    const k = val[key];
    acc[k] = val;
    return acc;
  }, {});

export const groupBy = <T, K extends keyof T>(arr: T[] | ReadonlyArray<T>, key: K): { [key: string]: [T] } =>
  arr.reduce((acc: any, val: T) => {
    const k = val[key];
    acc[k] = acc[k] || [];
    acc[k].push(val);
    return acc;
  }, {});

export const snakeCase = (str: string) =>
  str
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(s => s.toLowerCase())
    .join('_');
