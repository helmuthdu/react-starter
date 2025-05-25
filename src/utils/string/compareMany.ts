import { compare } from './compare';

export const compareMany = <T>(selectors: Partial<Record<keyof T, 'asc' | 'desc'>>) => {
  const entries = Object.entries(selectors) as [keyof T, 'asc' | 'desc'][];

  return (a: T, b: T) => {
    for (const [key, direction] of entries) {
      const v1 = a[key];
      const v2 = b[key];
      const dir = direction === 'desc' ? -1 : 1;

      const cmp = compare(v1, v2);
      if (cmp !== 0) return cmp * dir;
    }

    return 0;
  };
};
