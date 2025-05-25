import { typeOf } from './typeOf';

/**
 * Determines if the passed value is an object.
 *
 * @example
 * ```ts
 * const value = { key: 'value' };
 * isObject(value); // true
 * isObject('hello world'); // false
 * isObject(value, 1); // false
 * isObject(value, value); // true
 * ```
 *
 * @param arg - The argument to be checked.
 *
 * @returns `true` if the value is an object, else `false`.
 */
export function isObject(arg: unknown): boolean {
  return typeOf(arg) === 'Object';
}

export const IS_OBJECT_ERROR_MSG = 'Expected an object';
