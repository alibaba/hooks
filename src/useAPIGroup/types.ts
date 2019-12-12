import { PaginationConfig } from 'antd/lib/pagination';
import { SorterResult } from 'antd/lib/table';
import { DependencyList } from 'react';

type noop = (...args: any[]) => void;

/* ✅ --------------------------useAsync---------------------------- */

export interface BaseResult<T, K extends any[]> {
  loading: boolean;
  data: T | undefined,
  error: Error | string | undefined;

  run: (...args: K) => Promise<T>; // 手动触发
  params: K | undefined; // 上一次手动触发的参数

  cancel: noop; // 取消请求

  refresh: noop; // 用当前参数重新请求一次
}

export type BaseOptions<R, P> = {
  refreshDeps?: DependencyList; // 如果 deps 变化后，重新请求
  manual?: boolean; // 是否需要手动触发
  onSuccess?: (data: R, params?: P) => void; // 成功回调
  onError?: (e: Error, params?: P) => void; // 失败回调

  autoCancel?: boolean; // 竞态处理开关
  defaultParams?: P;
  // 轮询
  pollingInterval?: number; // 轮询的间隔毫秒

  paginated?: false
}

export type OptionsWithFormat<R, P, U, UU extends U> = {
  formatResult: (res: R) => U
} & BaseOptions<UU, P>;

export type Options<R, P, U, UU extends U> = BaseOptions<R, P> | OptionsWithFormat<R, P, U, UU>;


/* ✅ --------------------------usePaginated---------------------------- */

export interface PaginatedParams<Item> {
  current: number,
  pageSize: number,
  sorter?: SorterResult<Item>,
  filters?: Record<keyof Item, string[]>
}

export interface PaginatedFormatReturn<Item> {
  pager: {
    total: number,
    [key: string]: any,
  };
  list: Item[];
  [key: string]: any;
}

export interface PaginatedResult<Item> extends BaseResult<PaginatedFormatReturn<Item>, [PaginatedParams<Item>]> {

  // reload: noop; // 重置所有参数，包括分页数据数据等，重新执行 asyncFn

  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPage: number;
    onChange: (current: number, pageSize: number) => void;
    changeCurrent: (current: number) => void;
    changePageSize: (pageSize: number) => void;
  };
  tableProps: {
    dataSource: Item[];
    loading: boolean;
    onChange: (
      pagination: PaginationConfig,
      filters?: Record<keyof Item, string[]>,
      sorter?: SorterResult<Item>,
    ) => void;
    pagination: {
      current: number;
      pageSize: number;
      total: number;
    };
  };

  sorter?: SorterResult<Item>;
  filters?: Record<keyof Item, string[]>;

  // loadMore: () => void;
  // loadingMore: boolean;
}


export interface BasePaginatedOptions<U> extends Omit<BaseOptions<PaginatedFormatReturn<U>, [PaginatedParams<U>]>, 'paginated'> {
  paginated: true;
  defaultPageSize?: number; // 默认每页数据
  loadMorePageSize?: number; // 非第一页的 pageSize, for loadMore
}

export interface PaginatedOptionsWithFormat<R, Item, U> extends Omit<BaseOptions<PaginatedFormatReturn<U>, [PaginatedParams<U>]>, 'paginated'> {
  paginated: true;
  defaultPageSize?: number; // 默认每页数据
  loadMorePageSize?: number; // 非第一页的 pageSize, for loadMore
  formatResult: (data: R) => PaginatedFormatReturn<Item>;
}
