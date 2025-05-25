/**
 * Sum numbers in an array or numbers mapped by a callback function.
 *
 * @example
 * ```ts
 * sum([1, 2, 3]) // 6
 * sum([{value: 1}, {value: 2}, {value: 3}], (item) => item.value) // 6
 * sum([true, false, true], (item) => item ? 1 : 0) // 2
 * ```
 *
 * @param array - The array to sum.
 * @param callback - An optional callback function to map the values.
 *
 * @returns The sum of the numbers in the array or the sum of the mapped values.
 */
export function sum<T, R extends number | string>(array: T[], callback?: (item: T) => R): R | undefined {
  if (array.length === 0) return undefined;

  return array.reduce<R | undefined>((acc, item) => {
    const value = (callback ? callback(item) : item) as R;
    // biome-ignore lint/suspicious/noExplicitAny: -
    return acc === undefined ? value : acc + (value as any);
  }, undefined);
}
