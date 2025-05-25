import { typeOf } from './typeOf';

/**
 * Type guard to check if a value is a primitive
 *
 * @example
 * ```ts
 * isPrimitive('Hello World'); // true
 * isPrimitive(42); // true
 * isPrimitive(true); // true
 * isPrimitive({}); // false
 * isPrimitive([]); // false
 * isPrimitive(() => {}); // false
 * ```
 * @param arg - The argument to be checked.
 *
 * @returns `true` if the value is a primitive, else `false`.
 */
export function isPrimitive(arg: unknown): boolean {
  return ['String', 'Number', 'Boolean'].includes(typeOf(arg));
}

export const IS_PRIMITIVE_ERROR_MSG = 'Expected a primitive value';
