import type { AntdTableOptions, AntdTableResult, Params } from '../useAntdTable/types';

export interface Field {
  getFieldInstance?: (name: string) => {};
  setValues: (value: Record<string, any>) => void;
  getValues: (...args: any) => Record<string, any>;
  reset: (...args: any) => void;
  validate: (fileds: any, callback: (errors, values) => void) => void;
  [key: string]: any;
}

export interface FusionTableResult<T, TParams extends Params>
  extends Omit<AntdTableResult<T, TParams>, 'tableProps'> {
  paginationProps: {
    onChange: (current: number) => void;
    onPageSizeChange: (size: number) => void;
    current: number;
    pageSize: number;
    total: number;
  };
  tableProps: {
    dataSource: T[];
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

export interface FusionTableOptions<T, TParams extends Params>
  extends Omit<AntdTableOptions<T, TParams>, 'form'> {
  field?: Field;
}
