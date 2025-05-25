import { useMemo, useReducer } from 'react';
import { debounce, sortBy } from '../utils';

type Predicate<T> = (value: T) => boolean;

export type ListMeta = {
  end: number;
  isEmpty: boolean;
  isFirst: boolean;
  isLast: boolean;
  page: number;
  pages: number;
  pageSize: number;
  start: number;
  total: number;
};

export type ListFilterBy<T> = Partial<Record<keyof T, string | number | boolean>>;

export type ListSortBy<T> = Partial<Record<keyof T, 'asc' | 'desc'>>;

export type ListConfigFilter<T> = {
  filterBy?: ListFilterBy<T>;
  filterFn?: Predicate<T>;
  query?: string;
};

export type ListConfigSort<T> = {
  sortBy?: ListSortBy<T>;
};

export type ListEvents<T> = {
  onFilter?: (values?: ListFilterBy<T>) => void;
  onPaginate?: (page: number) => void;
  onReset?: () => void;
  onResize?: (size: number) => void;
  onSearch?: (query: string) => void;
  onSort?: (values?: ListSortBy<T>) => void;
};

export type ListConfig<T> = ListConfigFilter<T> &
  ListConfigSort<T> &
  ListEvents<T> & {
    offset: number;
    pageSize: number;
    total?: number;
  };

export type UseList<T> = {
  config: Readonly<ListConfig<T>>;
  current: T[];
  data: T[];
  filter: (predicate: Predicate<T>) => undefined | undefined;
  filterBy: (values?: ListFilterBy<T>) => void;
  meta: ListMeta;
  next: () => void;
  page: number;
  pageSize: number;
  prev: () => void;
  reset: () => void;
  search: (query?: string) => void;
  sortBy: (values?: ListSortBy<T>) => void;
  total: number;
};

type ListState<T> = ListConfig<T> & {
  data: T[];
};

type ListAction<T> =
  | { type: 'RESET' }
  | { payload: T[]; type: 'SET_DATA' }
  | { payload: Partial<Omit<ListState<T>, 'data'>>; type: 'SET_CONFIG' }
  | { payload: number; type: 'SET_OFFSET' };

const DEFAULT_PAGE_SIZE = 12;

function reducer<T>(state: ListState<T>, action: ListAction<T>): ListState<T> {
  switch (action.type) {
    case 'RESET':
      return {
        ...state,
        filterBy: undefined,
        filterFn: undefined,
        offset: 0,
        query: undefined,
        sortBy: undefined,
      };
    case 'SET_CONFIG':
      return { ...state, ...action.payload };
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SET_OFFSET':
      return { ...state, offset: action.payload };
    default:
      return state;
  }
}

function transformData<T>(state: ListState<T>): T[] {
  let result = state.data;

  if (typeof state.total === 'number' && state.total > 0) {
    result = Array(state.total).fill(undefined);

    state.data.forEach((value, index) => {
      result[state.offset * state.pageSize + index] = value;
    });

    return result;
  }

  if (state.query) {
    result = result.filter((item) => {
      if (typeof item === 'string' || typeof item === 'number') {
        return item.toString().toLowerCase().includes(state.query!);
      }

      if (Array.isArray(item)) {
        return item.some((value) => value?.toString().toLowerCase().includes(state.query!));
      }

      if (typeof item === 'object' && item !== null) {
        return Object.values(item).some((value) => value?.toString().toLowerCase().includes(state.query!));
      }

      return false;
    });
  }

  if (state.filterFn) result = result.filter(state.filterFn);

  if (state.filterBy) {
    result = result.filter((item) =>
      Object.entries(state.filterBy!).every(([key, value]) => {
        if (typeof item === 'object' && item !== null) {
          const itemValue = item[key as keyof T];

          return Array.isArray(itemValue) ? itemValue.includes(value) : itemValue === value;
        }

        return false;
      }),
    );
  }

  if (state.sortBy) {
    result = sortBy(result, state.sortBy);
  }

  return result;
}

export function useList<T>(rawData: T[], config?: Partial<ListConfig<T>>): UseList<T> {
  const [state, dispatch] = useReducer(reducer<T>, {
    ...config,
    data: rawData,
    offset: config?.offset ?? 0,
    pageSize: config?.pageSize ?? DEFAULT_PAGE_SIZE,
  } as ListState<T>);

  const data = useMemo(() => transformData(state), [state]);
  const pages = useMemo(
    () =>
      Array.from({ length: Math.ceil(data.length / state.pageSize) }, (_, i) =>
        data.slice(i * state.pageSize, i * state.pageSize + state.pageSize),
      ),
    [data, state.pageSize],
  );
  const meta = useMemo(
    () =>
      ({
        end: Math.min(state.pageSize * (state.offset + 1), data.length),
        isEmpty: data.length === 0,
        isFirst: state.offset === 0,
        isLast: state.offset === pages.length - 1,
        page: state.offset + 1,
        pageSize: state.pageSize,
        pages: pages.length,
        start: Math.max(0, state.pageSize * state.offset + 1),
        total: data.length,
      }) as ListMeta,
    [data.length, pages.length, state.pageSize, state.offset],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: -
  const search = useMemo(
    () =>
      debounce((query?: string) => {
        const payload = query && query.length >= 3 ? query : '';

        config?.onSearch?.(payload);
        dispatch({ payload: { offset: 0, query }, type: 'SET_CONFIG' });
      }, 500),
    [],
  );

  return {
    get config() {
      return Object.freeze(state);
    },
    get current() {
      return pages[state.offset]?.filter((item) => item !== undefined) ?? [];
    },
    set data(newData: T[]) {
      dispatch({ payload: newData, type: 'SET_DATA' });
    },
    filter(predicate: Predicate<T> | undefined) {
      dispatch({
        payload: { filterFn: predicate, offset: 0 },
        type: 'SET_CONFIG',
      });
    },
    filterBy(values?: ListFilterBy<T>) {
      config?.onFilter?.(values);
      dispatch({
        payload: { filterBy: values, offset: 0 },
        type: 'SET_CONFIG',
      });
    },
    get meta() {
      return meta;
    },
    next() {
      const payload = Math.min(state.offset + 1, pages.length);

      config?.onPaginate?.(payload + 1);
      dispatch({ payload, type: 'SET_OFFSET' });
    },
    set page(page: number) {
      const payload = Math.max(1, Math.min(page, pages.length));

      config?.onPaginate?.(payload);
      dispatch({ payload: payload - 1, type: 'SET_OFFSET' });
    },
    set pageSize(size: number) {
      const payload = Math.max(1, size);

      config?.onResize?.(payload);
      dispatch({
        payload: { offset: 0, pageSize: payload },
        type: 'SET_CONFIG',
      });
    },
    prev() {
      const payload = Math.max(0, state.offset - 1);

      config?.onPaginate?.(payload + 1);
      dispatch({ payload, type: 'SET_OFFSET' });
    },
    reset() {
      config?.onReset?.();
      dispatch({ type: 'RESET' });
    },
    search,
    sortBy(values?: ListSortBy<T>) {
      config?.onSort?.(values);
      dispatch({ payload: { sortBy: values }, type: 'SET_CONFIG' });
    },
    set total(value: number) {
      if (value === state.total) return;

      dispatch({ payload: { offset: 0, total: value }, type: 'SET_CONFIG' });
    },
  };
}
