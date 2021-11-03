import type { PaginationOptions, PaginationResult } from '../usePagination/types';

export type TData<T> = { total: number; list: T[] };

export type Params = [
  {
    current: number;
    pageSize: number;
    sorter?: any;
    filter?: any;
    [key: string]: any;
  },
  ...any[]
];

export type Service<T, TParams extends Params> = (...args: TParams) => Promise<TData<T>>;

export type Antd3ValidateFields = (
  fieldNames: string[],
  callback: (errors, values) => void,
) => void;
export type Antd4ValidateFields = (fieldNames?: string[]) => Promise<any>;

export interface AntdFormUtils {
  getFieldInstance: (name: string) => Record<string, any>;
  setFieldsValue: (value: Record<string, any>) => void;
  getFieldsValue: (...args: any) => Record<string, any>;
  resetFields: (...args: any) => void;
  validateFields: Antd3ValidateFields | Antd4ValidateFields;
  getInternalHooks?: any;
  [key: string]: any;
}

export interface AntdTableResult<T, TParams extends Params> extends PaginationResult<T, TParams> {
  tableProps: {
    dataSource: T[];
    loading: boolean;
    onChange: (pagination: any, filters?: any, sorter?: any) => void;
    pagination: any;
    [key: string]: any;
  };
  search: {
    type: 'simple' | 'advance';
    changeType: () => void;
    submit: () => void;
    reset: () => void;
  };
}

export interface AntdTableOptions<T, TParams extends Params> extends PaginationOptions<T, TParams> {
  form?: AntdFormUtils;
  defaultType?: 'simple' | 'advance';
}
