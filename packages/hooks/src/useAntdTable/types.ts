import type { PaginationOptions, PaginationResult } from '../usePagination/types';

export type Data = { total: number; list: any[] };

export type Params = [
  {
    current: number;
    pageSize: number;
    sorter?: any;
    filters?: any;
    extra?: any;
    [key: string]: any;
  },
  ...any[],
];

export type Service<TData extends Data, TParams extends Params> = (
  ...args: TParams
) => Promise<TData>;

export type Antd3ValidateFields = (
  fieldNames: string[],
  callback: (errors, values: Record<string, any>) => void,
) => void;
export type Antd4ValidateFields = (fieldNames?: string[]) => Promise<Record<string, any>>;

export interface AntdFormUtils {
  getFieldInstance?: (name: string) => Record<string, any>;
  setFieldsValue: (value: Record<string, any>) => void;
  getFieldsValue: (...args: any) => Record<string, any>;
  resetFields: (...args: any) => void;
  validateFields: Antd3ValidateFields | Antd4ValidateFields;
  getInternalHooks?: any;
  [key: string]: any;
}

export interface AntdTableResult<TData extends Data, TParams extends Params>
  extends PaginationResult<TData, TParams> {
  tableProps: {
    dataSource: TData['list'];
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

export interface AntdTableOptions<TData extends Data, TParams extends Params>
  extends PaginationOptions<TData, TParams> {
  form?: AntdFormUtils;
  defaultType?: 'simple' | 'advance';
}
