import { PaginationConfig } from 'antd/lib/pagination';
import { SorterResult } from 'antd/lib/table';
import { DependencyList } from 'react';

type noop = (...args: any[]) => void;

export interface PaginatedParams<Item> {
  current: number,
  pageSize: number,
  sorter?: SorterResult<Item>,
  filters?: Record<keyof Item, string[]>
}

export interface PaginatedFormatReturn<Item> {
  pager: {
    total: number
  };
  list: Item[];
}

export interface BaseResult<T, K extends any[]> {
  loading: boolean;
  data?: T,
  error?: Error | string;

  run: (...args: K) => Promise<T>; // 手动触发
  params: K | undefined; // 上一次手动触发的参数

  cancel: noop; // 取消请求

  refresh: noop; // 用当前参数重新请求一次
}


export interface PaginatedResult<T extends PaginatedFormatReturn<Item>, Item> extends BaseResult<T, [PaginatedParams<Item>]> {

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

// export type Result<T, K extends any[], U extends Options<T, K>> = BaseResult<T, K> & (U['paginated'] extends true ? PaginatedResult<T, K> : {});

export type BaseOptions<T, K> = {
  refreshDeps?: DependencyList; // 如果 deps 变化后，重新请求
  manual?: boolean; // 是否需要手动触发
  onSuccess?: (data: T, params?: K) => void; // 成功回调
  onError?: (e: Error, params?: K) => void; // 失败回调

  autoCancel?: boolean; // 竞态处理开关
  defaultParams?: K;
  // 轮询
  pollingInterval?: number; // 轮询的间隔毫秒
}

export type OptionsWithFormat<T, K, U> = {
  formatResult: (data: T) => U
} & BaseOptions<U, K>;

export type Options<T, K, U> = BaseOptions<T, K> | OptionsWithFormat<T, K, U>;

export interface BasePaginatedOptions<T, Item> extends BaseOptions<T, [PaginatedParams<Item>]> {
  paginated: true;
  defaultPageSize?: number; // 默认每页数据
  loadMorePageSize?: number; // 非第一页的 pageSize, for loadMore
}

export interface PaginatedOptionsWithFormat<T, Item> extends BasePaginatedOptions<T, Item> {
  formatResult: (data: T) => PaginatedFormatReturn<Item>;
}
