import type { Data, Params } from '../useAntdTable/types';
import type { PaginationOptions } from '../usePagination/types';
import type { PaginationResult } from '../usePagination/types';

export interface NoFormTableOptions<TData extends Data, TParams extends Params>
  extends PaginationOptions<TData, TParams> {
  /**重置时触发*/
  onReset?: () => void;
  /**重置时，是否重置filter*/
  isResetSorter?: boolean;
}

export interface NoFormTableResult<TData extends Data, TParams extends Params>
  extends PaginationResult<TData, TParams> {
  tableProps: {
    dataSource: any[];
    loading: boolean;
    onChange: (pagination: any, filters?: any, sorter?: any) => void;
    pagination: any;
    [key: string]: any;
  };
  search: {
    submit: (customForm?: any) => void;
    reset: (defaultCustomForm?: any) => void;
  };
}
