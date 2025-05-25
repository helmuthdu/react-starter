import { isEmpty } from './isEmpty';
import { isNegative } from './isNegative';
import { isPositive } from './isPositive';
import { isZero } from './isZero';
import { typeOf } from './typeOf';

/**
 * @description
 * Checks if the value type of an argument.
 *
 * @example
 * ```ts
 * is('hello world', 'String'); // true
 * is(123, 'Number'); // true
 * is(true, 'Boolean'); // true
 * is(new Date(), 'Date'); // true
 * is([], 'Array'); // true
 * is({}, 'Object'); // true
 * is(null, 'Null'); // true
 * is(undefined, 'Undefined'); // true
 * is(NaN, 'NaN'); // true
 * is(-123, 'Negative'); // true
 * is(123, 'Positive'); // true
 * is(0, 'Zero'); // true
 * ```
 *
 * @param arg - The argument to be checked.
 * @param type - The type to check against.
 *
 * @returns `true` if the value is of the specified type, else `false`.
 */
// biome-ignore lint/suspicious/noExplicitAny: -
export function is(arg: any, type: string): boolean {
  if (!type) {
    throw new Error('Type must be provided');
  }

  const compare = {
    Empty: isEmpty,
    Negative: isNegative,
    Positive: isPositive,
    Zero: isZero,
  };

  return compare[type as keyof typeof compare]?.(arg) ?? typeOf(arg) === type;
}
