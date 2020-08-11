import {
  CombineService,
  PaginatedParams,
  BasePaginatedOptions,
  PaginatedOptionsWithFormat,
  PaginatedFormatReturn,
  PaginatedResult,
} from '@ahooksjs/use-request/lib/types';

import useAntdTable from '../useAntdTable';
import { fieldAdapter, resultAdapter } from './fusionAdapter';

export {
  CombineService,
  PaginatedParams,
  BasePaginatedOptions,
  PaginatedOptionsWithFormat,
  PaginatedFormatReturn,
  PaginatedResult,
};

export interface Store {
  [name: string]: any;
}

export interface Field {
  getFieldInstance?: (name: string) => {}; // antd 3
  setValues: (value: Store) => void;
  getValues: (...args: any) => Store;
  reset: (...args: any) => void;
  validate: (callback: (errors, values) => void) => void;
  [key: string]: any;
}

export interface Result<Item> extends Omit<PaginatedResult<Item>, 'tableProps'> {
  paginationProps: {
    onChange: (current: number) => void;
    onPageSizeChange: (size: number) => void;
    current: number;
    pageSize: number;
    total: number;
  };
  tableProps: {
    dataSource: Item[];
    loading: boolean;
    onSort: (dataIndex: String, order: String) => void;
    onFilter: (filterParams: Object) => void;
  };
  search: {
    type: 'simple' | 'advance';
    changeType: () => void;
    submit: () => void;
    reset: () => void;
  };
}

export interface BaseOptions<U> extends Omit<BasePaginatedOptions<U>, 'paginated'> {
  field?: Field;
  defaultType?: 'simple' | 'advance';
}

export interface OptionsWithFormat<R, Item, U>
  extends Omit<PaginatedOptionsWithFormat<R, Item, U>, 'paginated'> {
  field?: Field;
  defaultType?: 'simple' | 'advance';
}

function useFusionTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<R, PaginatedParams>,
  options: OptionsWithFormat<R, Item, U>,
): Result<Item>;
function useFusionTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<PaginatedFormatReturn<Item>, PaginatedParams>,
  options: BaseOptions<U>,
): Result<Item>;

function useFusionTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<any, any>,
  options: BaseOptions<U> | OptionsWithFormat<R, Item, U>,
): any {
  const ret = useAntdTable(service, {
    ...options,
    form: options.field ? fieldAdapter(options.field) : undefined,
  });

  return resultAdapter(ret);
}

export default useFusionTable;
