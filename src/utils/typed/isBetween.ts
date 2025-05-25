/**
 * Determines if the passed value is between.
 *
 * @example
 * ```ts
 * isBetween(0.75, 0, 1); // true
 * isBetween(1, 0, 1); // true
 * isBetween(2, 0, 1); // false
 * ```
 *
 * @param arg - The value to be checked.
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range.
 *
 * @returns `true` if the value is in between, else `false`.
 */
export function isBetween(arg: number, min?: number, max?: number): arg is number {
  return [arg, min, max].every((v) => typeof v === 'number') && arg! >= min! && arg! <= max!;
}

export const IS_BETWEEN_ERROR_MSG = 'Expected a number in the range';
