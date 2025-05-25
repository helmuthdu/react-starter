import { max } from '../max';

describe('max', () => {
  it('should return the maximum number in an array', () => {
    expect(max([1, 2, 3])).toBe(3);
    expect(max([-1, -2, -3])).toBe(-1);
    expect(max([0, 0, 0])).toBe(0);
  });

  it('should return the maximum string in an array', () => {
    expect(max(['apple', 'banana', 'cherry'])).toBe('cherry');
    expect(max(['zebra', 'ant', 'lion'])).toBe('zebra');
  });

  it('should return the maximum value mapped by a callback function', () => {
    const array = [{ value: 1 }, { value: 2 }, { value: 3 }];
    const callback = (item: { value: number }) => item.value;

    expect(max(array, callback)).toBe(3);
  });

  it('should handle arrays with mixed types using a callback', () => {
    const array = [true, false, true];
    const callback = (item: boolean) => (item ? 1 : 0);

    expect(max(array, callback)).toBe(1);
  });

  it('should return undefined for an empty array', () => {
    expect(max([])).toBe(undefined);
  });

  it('should handle arrays with a mix of numbers and other types', () => {
    const array = [1, '2', true, null];
    const callback = (item: unknown) => (typeof item === 'number' ? item : 0);

    expect(max(array, callback)).toBe(1);
  });

  it('should work without a callback for arrays of numbers', () => {
    expect(max([10, 20, 30])).toBe(30);
  });

  it('should handle arrays with undefined or null values', () => {
    const array = [1, null, undefined, 2];
    const callback = (item: unknown) => (item ? (item as number) : 0);

    expect(max(array, callback)).toBe(2);
  });
});
