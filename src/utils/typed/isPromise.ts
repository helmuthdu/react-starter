import { typeOf } from './typeOf';

/**
 * Determines if the passed value is a promise.
 *
 * @example
 * ```ts
 * isPromise(new Promise((resolve, reject) => {})); // true
 * isPromise(async () => {}); // true
 * isPromise(() => {}); // false
 * ```
 *
 * @param arg - The argument to be checked.
 *
 * @returns `true` if the value is a promise, else `false`.
 */
export function isPromise(arg: unknown): boolean {
  return typeOf(arg) === 'Promise';
}

export const IS_PROMISE_ERROR_MSG = 'Expected a promise';
