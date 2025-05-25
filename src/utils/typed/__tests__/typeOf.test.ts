import { type ArgType, typeOf } from '../typeOf';

describe('typeOf', () => {
  it('returns "Null" for null', () => {
    expect(typeOf(null)).toBe<ArgType>('Null');
  });

  it('returns "Undefined" for undefined', () => {
    expect(typeOf(undefined)).toBe<ArgType>('Undefined');
  });

  it('returns "NaN" for NaN', () => {
    expect(typeOf(Number.NaN)).toBe<ArgType>('NaN');
    expect(typeOf(Number('not-a-number'))).toBe<ArgType>('NaN');
  });

  it('returns "Promise" for async functions', () => {
    expect(typeOf(async () => {})).toBe<ArgType>('Promise');
    const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
    expect(typeOf(new AsyncFunction('return 1'))).toBe<ArgType>('Promise');
  });

  it('returns "Number" for numbers', () => {
    expect(typeOf(0)).toBe<ArgType>('Number');
    expect(typeOf(123)).toBe<ArgType>('Number');
    expect(typeOf(-42)).toBe<ArgType>('Number');
    expect(typeOf(Number.POSITIVE_INFINITY)).toBe<ArgType>('Number');
  });

  it('returns "String" for strings', () => {
    expect(typeOf('abc')).toBe<ArgType>('String');
    expect(typeOf(String('def'))).toBe<ArgType>('String');
  });

  it('returns "Object" for plain objects', () => {
    expect(typeOf({})).toBe<ArgType>('Object');
    expect(typeOf(Object.create(null))).toBe<ArgType>('Object');
    class Test {}
    expect(typeOf(new Test())).toBe<ArgType>('Object');
  });

  it('returns "Array" for arrays', () => {
    expect(typeOf([])).toBe<ArgType>('Array');
    expect(typeOf([1, 2, 3])).toBe<ArgType>('Array');
    expect(typeOf([])).toBe<ArgType>('Array');
  });

  it('returns "Function" for functions', () => {
    expect(typeOf(() => {})).toBe<ArgType>('Function');
    expect(typeOf(() => {})).toBe<ArgType>('Function');
    expect(typeOf(new Function('return 1'))).toBe<ArgType>('Function');
  });

  it('returns "Date" for Date objects', () => {
    expect(typeOf(new Date())).toBe<ArgType>('Date');
  });

  it('returns "Error" for Error objects', () => {
    expect(typeOf(new Error())).toBe<ArgType>('Error');
    expect(typeOf(new TypeError())).toBe<ArgType>('Error');
  });

  it('returns "Map" for Map objects', () => {
    expect(typeOf(new Map())).toBe<ArgType>('Map');
  });

  it('returns "Set" for Set objects', () => {
    expect(typeOf(new Set())).toBe<ArgType>('Set');
  });

  it('returns "WeakMap" for WeakMap objects', () => {
    expect(typeOf(new WeakMap())).toBe<ArgType>('WeakMap');
  });

  it('returns "WeakSet" for WeakSet objects', () => {
    expect(typeOf(new WeakSet())).toBe<ArgType>('WeakSet');
  });

  it('returns "RegExp" for RegExp objects', () => {
    expect(typeOf(/abc/)).toBe<ArgType>('RegExp');
    // biome-ignore lint/complexity/useRegexLiterals: -
    expect(typeOf(new RegExp('abc'))).toBe<ArgType>('RegExp');
  });

  it('returns "Boolean" for booleans', () => {
    expect(typeOf(true)).toBe<ArgType>('Boolean');
    expect(typeOf(false)).toBe<ArgType>('Boolean');
    expect(typeOf(Boolean(1))).toBe<ArgType>('Boolean');
  });
});
