import { assert } from '../function/assert';
import { similarity } from '../string/similarity';
import { isArray } from '../typed/isArray';
import { IS_BETWEEN_ERROR_MSG, isBetween } from '../typed/isBetween';
import { isNil } from '../typed/isNil';
import { isObject } from '../typed/isObject';
import type { Obj } from '../types';

/**
 * Recursively checks if an object contains a value similar to the search string.
 *
 * @example
 * ```ts
 * const obj = { a: 'hello', b: { c: 'world' }, d: [1, 2, 3] };
 *
 * seek(obj, 'hello'); // true
 * seek(obj, 'world'); // true
 * seek(obj, 'foo'); // false
 * seek(obj, 'hello', 0.5); // true
 * seek(obj, 'hello', 0.8); // true
 * seek(obj, 'hello', 1); // true
 * seek(obj, 'hello', 1.5); // false
 * seek(obj, 'hello', -1); // false
 * seek(obj, 'hello', 0); // false
 * ```
 *
 * @param item - The object to search within.
 * @param query - The search string.
 * @param [tone=1] - The similarity threshold.
 *
 * @returns Whether the object contains a matching value.
 */
export function seek<T>(item: T, query: string, tone = 1): boolean {
  assert(isBetween(tone, 0, 1), IS_BETWEEN_ERROR_MSG, { args: { max: 1, min: 0, tone }, type: TypeError });

  if (typeof item === 'string' || typeof item === 'number') {
    return similarity(String(item), query) >= tone;
  }

  // biome-ignore lint/suspicious/noExplicitAny: -
  return Object.values(item as Record<string, any>).some((value) => {
    if (isNil(value)) return false;

    if (isArray(value)) {
      // biome-ignore lint/suspicious/noExplicitAny: -
      return value.some((v: any) => (isObject(v) ? seek(v as Obj, query, tone) : similarity(String(v), query) >= tone));
    }

    if (isObject(value)) {
      return seek(value as Obj, query, tone);
    }

    return similarity(String(value), query) >= tone;
  });
}
