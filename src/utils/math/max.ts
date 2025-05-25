/**
 * Determines the maximum value in a list of numbers or strings.
 *
 * This function accepts a variable number of arguments, which can either be numbers
 * or strings. It returns the largest value among them. If no arguments are provided,
 * the function returns `undefined`.
 *
 * @example
 * ```ts
 * max([1, 2, 3]) // 3
 * max(['apple', 'banana', 'cherry']) // 'cherry'
 * max([1, 'banana', 3, 'apple']) // 3
 * max([]) // undefined
 * ```
 *
 * @param array - A list of values to evaluate for the maximum.
 * @param callback - An optional callback function to map the values.
 *
 * @returns The maximum value in the provided arguments, or `undefined` if no arguments are given.
 */
export function max<T, R extends number | string>(array: T[], callback?: (item: T) => R): R | undefined {
  if (array.length === 0) return undefined;

  return array.reduce<R | undefined>((acc, item) => {
    const value = (callback ? callback(item) : item) as R;
    return acc === undefined ? value : value > acc ? value : acc;
  }, undefined);
}
