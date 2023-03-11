import type { AntdTableOptions, AntdTableResult, Data, Params } from '../useAntdTable/types';

export interface Field {
  getFieldInstance?: (name: string) => Record<string, any>;
  setValues: (value: Record<string, any>) => void;
  getValues: (...args: any) => Record<string, any>;
  reset: (...args: any) => void;
  validate: (fields: any, callback: (errors, values) => void) => void;
  [key: string]: any;
}

export interface FusionTableResult<TData extends Data, TParams extends Params>
  extends Omit<AntdTableResult<TData, TParams>, 'tableProps'> {
  paginationProps: {
    onChange: (current: number) => void;
    onPageSizeChange: (size: number) => void;
    current: number;
    pageSize: number;
    total: number;
  };
  tableProps: {
    dataSource: TData['list'];
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

export interface FusionTableOptions<TData extends Data, TParams extends Params>
  extends Omit<AntdTableOptions<TData, TParams>, 'form'> {
  field?: Field;
}
