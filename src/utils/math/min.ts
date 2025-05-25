/**
 * Returns the minimum value from a list of numbers or strings.
 *
 * This function accepts a variable number of arguments, which can either be numbers
 * or strings. It returns the smallest value among them. If no arguments are provided,
 * the function returns `undefined`.
 *
 * @example
 * ```ts
 * min([1, 2, 3]); // 1
 * min(['apple', 'banana', 'cherry']); // 'apple'
 * min([1, 'banana', 3, 'apple']); // 1
 * min([]); // undefined
 * ```
 *
 * @param array - The array to evaluate for the minimum.
 * @param callback - An optional callback function to map the values.
 *
 * @returns The minimum value in the provided arguments, or `undefined` if no arguments are given.
 */
export function min<T, R extends number | string>(array: T[], callback?: (item: T) => R): R | undefined {
  if (array.length === 0) return undefined;

  return array.reduce<R | undefined>((acc, item) => {
    const value = (callback ? callback(item) : item) as R;
    return acc === undefined ? value : value < acc ? value : acc;
  }, undefined);
}
