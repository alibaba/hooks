import { DependencyList, RefObject } from 'react';
import { PaginationConfig, Filter, Sorter } from './antdTypes';
import { CachedKeyType } from './utils/cache';

export type noop = (...args: any[]) => void;

export type Service<R, P extends any[]> = (...args: P) => Promise<R>;
export type Subscribe<R, P extends any[]> = (data: FetchResult<R, P>) => void;
export type Mutate<R> = (x: R | undefined | ((data: R) => R)) => void;

export type RequestService = string | { [key: string]: any };
export type CombineService<R, P extends any[]> =
  | RequestService
  | ((...args: P) => RequestService)
  | Service<R, P>;

export interface Fetches<R, P extends any[]> {
  [key: string]: FetchResult<R, P>;
}
export interface FetchResult<R, P extends any[]> {
  loading: boolean;
  data: R | undefined;
  error: Error | undefined;
  params: P;
  cancel: noop;
  refresh: () => Promise<R>;
  mutate: Mutate<R>;
  // TODO 如果 options 存在 debounceInterval，或 throttleInterval，则 run 和 refresh 不会返回 Promise。类型需要修复。
  run: (...args: P) => Promise<R>;
  unmount: () => void;
}

export interface FetchConfig<R, P extends any[]> {
  formatResult?: (res: any) => R;

  onSuccess?: (data: R, params: P) => void;
  onError?: (e: Error, params: P) => void;

  loadingDelay?: number; // loading delay

  // 轮询
  pollingInterval?: number; // 轮询的间隔毫秒
  pollingWhenHidden?: boolean; // 屏幕隐藏时，停止轮询

  refreshOnWindowFocus?: boolean;
  focusTimespan: number;

  debounceInterval?: number;
  throttleInterval?: number;

  throwOnError?: boolean;
}

export interface BaseResult<R, P extends any[]> extends FetchResult<R, P> {
  reset: () => void;
  fetches: {
    [key in string]: FetchResult<R, P>;
  };
}

export type BaseOptions<R, P extends any[]> = {
  refreshDeps?: DependencyList; // 如果 deps 变化后，重新请求
  manual?: boolean; // 是否需要手动触发
  onSuccess?: (data: R, params: P) => void; // 成功回调
  onError?: (e: Error, params: P) => void; // 失败回调

  defaultLoading?: boolean; // 默认 loading 状态

  loadingDelay?: number; // loading delay

  defaultParams?: P;
  // 轮询
  pollingInterval?: number; // 轮询的间隔毫秒
  pollingWhenHidden?: boolean; // 屏幕隐藏时，停止轮询

  fetchKey?: (...args: P) => string;

  paginated?: false;
  loadMore?: false;

  refreshOnWindowFocus?: boolean;
  focusTimespan?: number;

  cacheKey?: CachedKeyType;
  cacheTime?: number;
  staleTime?: number;

  debounceInterval?: number;
  throttleInterval?: number;

  initialData?: R;

  requestMethod?: (service: any) => Promise<any>;

  ready?: boolean;
  throwOnError?: boolean;
};

export type OptionsWithFormat<R, P extends any[], U, UU extends U> = {
  formatResult: (res: R) => U;
} & BaseOptions<UU, P>;

export type Options<R, P extends any[], U, UU extends U> =
  | BaseOptions<R, P>
  | OptionsWithFormat<R, P, U, UU>;

/* ✅ --------------------------useRequest---------------------------- */

/* ✅ --------------------------usePaginated---------------------------- */

export type PaginatedParams = [
  {
    current: number;
    pageSize: number;
    sorter?: Sorter;
    filters?: Filter;
  },
  ...any[]
];

export interface PaginatedFormatReturn<Item> {
  total: number;
  list: Item[];
  [key: string]: any;
}

export interface PaginatedResult<Item>
  extends BaseResult<PaginatedFormatReturn<Item>, PaginatedParams> {
  // reload: noop; // 重置所有参数，包括分页数据数据等，重新执行 asyncFn

  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPage: number;
    onChange: (current: number, pageSize: number) => void;
    changeCurrent: (current: number) => void;
    changePageSize: (pageSize: number) => void;
    [key: string]: any;
  };
  tableProps: {
    dataSource: Item[];
    loading: boolean;
    onChange: (pagination: PaginationConfig, filters?: Filter, sorter?: Sorter) => void;
    pagination: PaginationConfig;
    [key: string]: any;
  };

  sorter?: Sorter;
  filters?: Filter;
}

export interface BasePaginatedOptions<U>
  extends Omit<BaseOptions<PaginatedFormatReturn<U>, PaginatedParams>, 'paginated'> {
  paginated: true;
  defaultPageSize?: number; // 默认每页数据
  // loadMorePageSize?: number; // 非第一页的 pageSize, for loadMore
}

export interface PaginatedOptionsWithFormat<R, Item, U>
  extends Omit<BaseOptions<PaginatedFormatReturn<U>, PaginatedParams>, 'paginated'> {
  paginated: true;
  defaultPageSize?: number; // 默认每页数据
  // loadMorePageSize?: number; // 非第一页的 pageSize, for loadMore
  formatResult: (data: R) => PaginatedFormatReturn<Item>;
}

/* ✅ --------------------------useLoadMore---------------------------- */
export type LoadMoreParams<R> = [R | undefined, ...any[]];

export interface LoadMoreFormatReturn {
  list: any[];
  [key: string]: any;
}

export interface LoadMoreResult<R> extends BaseResult<R, LoadMoreParams<R>> {
  noMore?: boolean;
  loadMore: () => void;
  reload: () => void;
  loadingMore: boolean;
}

export interface LoadMoreOptions<R extends LoadMoreFormatReturn>
  extends Omit<BaseOptions<R, LoadMoreParams<R>>, 'loadMore'> {
  loadMore: true;
  ref?: RefObject<any>;
  isNoMore?: (r: R | undefined) => boolean;
  threshold?: number;
}

export interface LoadMoreOptionsWithFormat<R extends LoadMoreFormatReturn, RR>
  extends Omit<BaseOptions<R, LoadMoreParams<R>>, 'loadMore'> {
  loadMore: true;
  formatResult: (data: RR) => R;
  ref?: RefObject<any>;
  isNoMore?: (r: R | undefined) => boolean;
  threshold?: number;
}
