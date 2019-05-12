import { compose, first, get, groupBy, isEmpty, keyBy, last, pipe, sortBy, uniq } from '../utils.helper';

describe('helpers -> utils', () => {
  it('should composes functions', () => {
    const composedFunction = compose(
      (val: string) => `fn1(${val})`,
      (val: string) => `fn2(${val})`,
      (val: string) => `fn3(${val})`
    );
    expect(composedFunction('inner')).toBe('fn1(fn2(fn3(inner)))');
  });

  it('should pipes functions', () => {
    const pipedFunction = pipe(
      (val: string) => `fn1(${val})`,
      (val: string) => `fn2(${val})`,
      (val: string) => `fn3(${val})`
    );
    expect(pipedFunction('inner')).toBe('fn3(fn2(fn1(inner)))');
  });

  it('should pipes functions with different initial type', () => {
    const pipedFunction = pipe(
      (val: string, num: number) => `fn1(${val}-${num})`,
      (val: string) => `fn2(${val})`,
      (val: string) => `fn3(${val})`
    );

    expect(pipedFunction('inner', 2)).toBe('fn3(fn2(fn1(inner-2)))');
  });

  it('should get the first element', () => {
    expect(first([1, 2, 3])).toEqual([1]);
  });

  it('should get the last element', () => {
    expect(last([1, 2, 3])).toEqual([3]);
  });

  it('should sort element by key', () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
    expect(sortBy([...arr].reverse(), 'id')).toEqual(arr);
  });

  it('should have only uniq values', () => {
    expect(uniq([1, 1, 2, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should get element by key', () => {
    const obj = { foo: { bar: { baz: 'john doe' } } };
    expect(get(obj, 'foo')).toEqual({ bar: { baz: 'john doe' } });
  });

  it('should get element by string', () => {
    const obj = { foo: { bar: { baz: 'john doe' } } };
    expect(get(obj, 'foo.bar.baz')).toEqual('john doe');
  });

  it('should get return a default value when element not found', () => {
    const obj = { foo: { bar: { baz: 'john doe' } } };
    expect(get(obj, 'bar', 1)).toEqual(1);
  });

  it.each([[null], [''], [{}], [[]]])(`should test if element is empty`, (el: unknown) => {
    expect(isEmpty(el)).toEqual(true);
  });

  it('should create a key for each element', () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
    expect(keyBy(arr, 'id')).toEqual({ 1: arr[0], 2: arr[1], 3: arr[2] });
  });

  it('should group elements by key', () => {
    const arr = [{ group: 1 }, { group: 1 }, { group: 2 }];
    expect(groupBy(arr, 'group')).toEqual({ 1: arr.slice(0, 2), 2: arr.slice(2, 3) });
  });
});
