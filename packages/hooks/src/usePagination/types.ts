import type { Options, Result } from '../useRequest/src/types';

export type TData<T> = { total: number; list: T[] };

export type Params = [{ current: number; pageSize: number; [key: string]: any }, ...any[]];

export type Service<T, TParams extends Params> = (...args: TParams) => Promise<TData<T>>;

export interface PaginationResult<T, TParams extends Params> extends Result<TData<T>, TParams> {
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPage: number;
    onChange: (current: number, pageSize: number) => void;
    changeCurrent: (current: number) => void;
    changePageSize: (pageSize: number) => void;
  };
}

export interface PaginationOptions<T, TParams extends Params> extends Options<TData<T>, TParams> {
  defaultPageSize?: number;
}
