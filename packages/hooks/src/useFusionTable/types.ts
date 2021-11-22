import type { AntdTableOptions, AntdTableResult, Data } from '../useAntdTable/types';

export interface Field {
  getFieldInstance?: (name: string) => {};
  setValues: (value: Record<string, any>) => void;
  getValues: (...args: any) => Record<string, any>;
  reset: (...args: any) => void;
  validate: (fields: any, callback: (errors, values) => void) => void;
  [key: string]: any;
}

export interface FusionTableResult<TData extends Data, TParams extends any[]>
  extends Omit<AntdTableResult<TData, TParams>, 'tableProps'> {
  paginationProps: {
    onChange: (current: number) => void;
    onPageSizeChange: (size: number) => void;
    current: number;
    pageSize: number;
    total: number;
  };
  tableProps: {
    dataSource: any[];
    loading: boolean;
    onSort: (dataIndex: string, order: string) => void;
    onFilter: (filterParams: any) => void;
  };
  search: {
    type: 'simple' | 'advance';
    changeType: () => void;
    submit: () => void;
    reset: () => void;
  };
}

export interface FusionTableOptions<TData extends Data, TParams extends any[]>
  extends Omit<AntdTableOptions<TData, TParams>, 'form'> {
  field?: Field;
}
