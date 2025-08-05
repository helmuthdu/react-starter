/** biome-ignore-all lint/suspicious/noExplicitAny: - */

import { group } from './array/group';
import { max } from './array/max';
import { min } from './array/min';
import { search } from './array/search';
import { sortBy } from './array/sortBy';

export type StoreRecord<T> = {
  key: keyof T;
  record: T;
};

export type StoreSchema = Record<string, StoreRecord<any>>;

export class LocalStorageQuery<T extends Record<string, any>> {
  private fieldName?: keyof T;
  private memoizedResult?: T[];
  private operations: Array<(data: T[]) => T[]> = [];
  private readonly originalData: T[];

  constructor(data: T[]) {
    this.originalData = data;
  }

  and(...fns: Array<(record: T) => boolean>) {
    this.operations.push((data) => data.filter((item) => fns.every((fn) => fn(item))));
    this.invalidateCache();
    return this;
  }

  average<K extends keyof T>(field: K): number {
    const arr = this.toArray();
    return arr.length ? this.sum(field) / arr.length : 0;
  }

  between<K extends keyof T>(lower: T[K], upper: T[K]) {
    if (!this.fieldName) throw new Error('Index name must be set before using between');
    this.operations.push((data) =>
      data.filter((item) => item[this.fieldName!] >= lower && item[this.fieldName!] <= upper),
    );
    this.invalidateCache();
    return this;
  }

  build(
    conditions: Array<{
      field?: keyof T;
      fn?: (record: T) => boolean;
      lower?: any;
      type: 'between' | 'equals' | 'filter' | 'limit' | 'offset' | 'orderBy' | 'startsWith' | 'where';
      upper?: any;
      value?: any;
    }>,
  ) {
    conditions.forEach((cond) => {
      switch (cond.type) {
        case 'between':
          if (cond.lower !== undefined && cond.upper !== undefined) this.between(cond.lower, cond.upper);
          break;
        case 'equals':
          if (cond.value !== undefined) this.equals(cond.value);
          break;
        case 'filter':
          if (cond.fn) this.filter(cond.fn);
          break;
        case 'limit':
          if (cond.value !== undefined) this.limit(cond.value);
          break;
        case 'offset':
          if (cond.value !== undefined) this.offset(cond.value);
          break;
        case 'orderBy':
          if (cond.field) this.orderBy(cond.field, cond.value);
          break;
        case 'startsWith':
          if (cond.value !== undefined) this.startsWith(cond.value);
          break;
        case 'where':
          if (cond.field) this.where(cond.field);
          break;
        default:
          throw new Error(`Unknown query type: ${cond.type}`);
      }
    });
    return this;
  }

  clone() {
    const q = new LocalStorageQuery<T>(this.originalData);
    q.operations = [...this.operations];
    q.fieldName = this.fieldName;
    return q;
  }

  count() {
    return this.toArray().length;
  }

  equals(value: any) {
    if (!this.fieldName) throw new Error('Index name must be set before using equals');
    this.operations.push((data) => data.filter((item) => item[this.fieldName!] === value));
    this.invalidateCache();
    return this;
  }

  filter(fn: (record: T) => boolean) {
    this.operations.push((data) => data.filter(fn));
    this.invalidateCache();
    return this;
  }

  first(): T | undefined {
    return this.toArray()[0];
  }

  groupBy<K extends keyof T>(field: K) {
    if (!this.fieldName) throw new Error('Index name must be set before using groupBy');
    this.operations.push((data) => group(data, (item) => item[field]) as any);
    this.invalidateCache();
    return this;
  }

  last(): T | undefined {
    const arr = this.toArray();
    return arr[arr.length - 1];
  }

  limit(n: number) {
    this.operations.push((data) => data.slice(0, n));
    this.invalidateCache();
    return this;
  }

  max<K extends keyof T>(field: K): T | undefined {
    return max<T>(this.toArray(), (item) => item[field] as any);
  }

  min<K extends keyof T>(field: K): T | undefined {
    return min(this.toArray(), (item) => item[field] as any);
  }

  modify(callback: (record: T) => void) {
    this.operations.push((data) => {
      data.forEach(callback);
      return data;
    });
    this.invalidateCache();
    return this;
  }

  not(fn: (record: T) => boolean) {
    this.operations.push((data) => data.filter((item) => !fn(item)));
    this.invalidateCache();
    return this;
  }

  offset(n: number) {
    this.operations.push((data) => data.slice(n));
    this.invalidateCache();
    return this;
  }

  or(fn: (record: T) => boolean) {
    this.operations.push((data) => data.filter(fn));
    this.invalidateCache();
    return this;
  }

  orderBy<K extends keyof T>(field: K, direction: 'asc' | 'desc' = 'asc') {
    this.operations.push((data) => sortBy(data, { [field]: direction } as Partial<Record<keyof T, 'asc' | 'desc'>>));
    this.invalidateCache();
    return this;
  }

  page(pageNumber: number, pageSize: number) {
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    this.operations.push((data) => data.slice(start, end));
    this.invalidateCache();
    return this;
  }

  reset() {
    this.operations = [];
    this.fieldName = undefined;
    this.invalidateCache();
    return this;
  }

  reverse() {
    this.operations.push((data) => [...data].reverse());
    this.invalidateCache();
    return this;
  }

  search(query: string, tone?: number) {
    this.operations.push((data) => search(data, query, tone));
    this.invalidateCache();
    return this;
  }

  startsWith(prefix: string) {
    if (!this.fieldName) throw new Error('Index name must be set before using startsWith');
    this.operations.push((data) =>
      data.filter((item) => {
        const value = item[this.fieldName!];
        return typeof value === 'string' && value.startsWith(prefix);
      }),
    );
    this.invalidateCache();
    return this;
  }

  sum<K extends keyof T>(field: K): number {
    return this.toArray().reduce((acc, item) => acc + (item[field] as unknown as number), 0);
  }

  toArray(): T[] {
    if (this.memoizedResult) return this.memoizedResult;
    this.memoizedResult = this.operations.reduce((data, op) => op(data), this.originalData);
    return this.memoizedResult;
  }

  where<K extends keyof T>(field: K) {
    this.fieldName = field;
    this.operations.push((data) => data.filter((item) => item[field] !== undefined && item[field] !== null));
    this.invalidateCache();
    return this;
  }

  private invalidateCache() {
    this.memoizedResult = undefined;
  }
}

export class Depot<S extends StoreSchema> {
  private dbName: string;
  private schema: S;
  private schemaCache: Record<string, string>;
  private version: number;

  constructor(dbName: string, version: number, schema: S) {
    this.dbName = dbName;
    this.version = version;
    this.schema = schema;
    this.schemaCache = {};
  }

  bulkDelete<K extends keyof S>(table: K, keys: S[K]['key'][]) {
    keys.forEach((key) => this.delete(table, key));
  }

  bulkPut<K extends keyof S>(table: K, values: S[K]['record'][], ttl?: number) {
    values.forEach((v) => this.put(table, v, ttl));
  }

  clear<K extends keyof S>(table: K) {
    const prefix = this.schemaCache[table as string] || `${this.dbName}:${this.version}:${String(table)}:`;
    const keysToRemove = Object.keys(localStorage).filter((k) => k.startsWith(prefix));

    keysToRemove.forEach((k) => localStorage.removeItem(k));
  }

  count<K extends keyof S>(table: K): number {
    return this.getAllRecords(table).length;
  }

  delete<K extends keyof S>(table: K, key: S[K]['key']) {
    localStorage.removeItem(this.getStorageKey(table, key));
  }

  get<K extends keyof S, T extends S[K]['record']>(table: K, key: S[K]['key'], defaultValue?: T): T | undefined {
    const storageKey = this.getStorageKey(table, key);
    const item = localStorage.getItem(storageKey);

    if (!item) return defaultValue;

    try {
      const raw = JSON.parse(item);
      if (raw && typeof raw === 'object' && '_expiry' in raw) {
        if (raw._expiry < Date.now()) {
          localStorage.removeItem(storageKey);
          return defaultValue;
        }
        return raw.value;
      }
      return raw;
    } catch (error) {
      console.error(`Error parsing JSON for key: ${storageKey}`, error);
      return defaultValue;
    }
  }

  getAll<K extends keyof S>(table: K): S[K]['record'][] {
    return this.getAllRecords(table);
  }

  put<K extends keyof S>(table: K, value: S[K]['record'], ttl?: number) {
    const key = value[this.schema[table].key as keyof S[K]['record']];
    if (key === undefined) throw new Error('Missing key for localStorage put');
    if (ttl !== undefined) {
      if (typeof ttl !== 'number' || ttl <= 0) throw new Error('TTL must be a positive number');
      const expiry = Date.now() + ttl;
      localStorage.setItem(this.getStorageKey(table, key), JSON.stringify({ _expiry: expiry, value }));
    } else {
      localStorage.setItem(this.getStorageKey(table, key), JSON.stringify(value));
    }
  }

  query<K extends keyof S>(table: K) {
    return new LocalStorageQuery<S[K]['record']>(this.getAllRecords(table));
  }

  setSchema(newSchema: S) {
    this.schema = newSchema;
    this.schemaCache = {};
  }

  transaction<K extends keyof S, T extends { [P in K]: S[P]['record'][] }>(tables: K[], fn: (stores: T) => void) {
    const storeMap = {} as T;

    tables.forEach((table) => {
      (storeMap as any)[table] = this.getAllRecords(table);
    });

    try {
      fn(storeMap);
      tables.forEach((table) => {
        const operations = (storeMap[table] as S[K]['record'][]).map((record) => {
          const key = record[this.schema[table].key as keyof S[K]['record']];
          const storageKey = this.getStorageKey(table, key);
          const existing = localStorage.getItem(storageKey);
          let value: any = record;
          if (existing) {
            try {
              const parsed = JSON.parse(existing);
              if (parsed && typeof parsed === 'object' && '_expiry' in parsed) {
                value = { _expiry: parsed._expiry, value: record };
              }
            } catch {}
          }
          return {
            key: storageKey,
            value: JSON.stringify(value),
          };
        });

        operations.forEach(({ key, value }) => localStorage.setItem(key, value));
      });
    } catch (err) {
      console.error('Transaction failed', err);
      throw err;
    }
  }

  private getAllRecords<K extends keyof S>(table: K): S[K]['record'][] {
    const prefix = this.schemaCache[table as string] || `${this.dbName}:${this.version}:${String(table)}:`;
    const now = Date.now();

    return Object.keys(localStorage)
      .filter((k) => k.startsWith(prefix))
      .map((k) => {
        try {
          const raw = JSON.parse(localStorage.getItem(k)!);
          if (raw && typeof raw === 'object' && '_expiry' in raw) {
            if (raw._expiry < now) {
              localStorage.removeItem(k); // Clean up expired
              return undefined;
            }
            return raw.value;
          }
          return raw;
        } catch (error) {
          console.error(`Error parsing JSON for key: ${k}`, error);
          localStorage.removeItem(k); // Remove corrupted record
          return undefined;
        }
      })
      .filter((v): v is S[K]['record'] => v !== undefined);
  }

  private getStorageKey<K extends keyof S>(table: K, key: S[K]['key']): string {
    if (!this.schemaCache[table as string]) {
      this.schemaCache[table as string] =
        `${this.dbName}:${this.version}:${String(table)}:${String(this.schema[table].key)}:`;
    }

    return `${this.schemaCache[table as string]}${String(key)}`;
  }
}
