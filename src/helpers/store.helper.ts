export function createActions<T>(obj: T): (keys: (keyof T)[]) => T {
  return (keys: (keyof T)[]): T =>
    keys.reduce(
      (acc: T, key: keyof T) => {
        acc[key] = obj[key];
        return acc;
      },
      {} as T
    );
}
