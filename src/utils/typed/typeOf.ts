// src/utils/superdash.util/typed/typeOf.ts
export type ArgType =
  | 'Array'
  | 'Boolean'
  | 'Date'
  | 'Error'
  | 'Function'
  | 'Map'
  | 'NaN'
  | 'Null'
  | 'Number'
  | 'Object'
  | 'Promise'
  | 'RegExp'
  | 'Set'
  | 'String'
  | 'WeakMap'
  | 'WeakSet'
  | 'Undefined';

// biome-ignore lint/suspicious/noExplicitAny: -
const specialCases = new Map<any, ArgType>([
  [null, 'Null'],
  [undefined, 'Undefined'],
]);

/**
 * Returns the type of the given argument.
 *
 * @example
 * ```ts
 * typeOf(null); // 'Null'
 * typeOf(undefined); // 'Undefined'
 * typeOf(NaN); // 'NaN'
 * typeOf(async function() {}); // 'Promise'
 * typeOf(123); // 'Number'
 * typeOf('abc'); // 'String'
 * typeOf({}); // 'Object'
 * typeOf([]); // 'Array'
 * typeOf(() => {}); // 'Function'
 * typeOf(new Date()); // 'Date'
 * typeOf(new Error()); // 'Error'
 * typeOf(new Map()); // 'Map'
 * typeOf(new Set()); // 'Set'
 * typeOf(new WeakMap()); // 'WeakMap'
 * typeOf(new WeakSet()); // 'WeakSet'
 * typeOf(new RegExp('')); // 'RegExp'
 * ```
 *
 * @param arg - The argument whose type is to be determined.
 *
 * @returns The type of the argument.
 */
export function typeOf(arg: unknown): ArgType {
  if (specialCases.has(arg)) return specialCases.get(arg)!;
  if (typeof arg === 'number' && Number.isNaN(arg)) return 'NaN';

  const type = Object.prototype.toString.call(arg).slice(8, -1);

  return type === 'AsyncFunction' ? 'Promise' : (type as ArgType);
}
