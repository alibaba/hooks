import {
  DependencyList,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useMemo,
  Reducer,
} from 'react';
import isEqual from 'lodash.isequal';
import { PaginationConfig, Sorter, Filter } from './typings';
import useAsync from '../useAsync';
import useUpdateEffect from '../useUpdateEffect';

interface UseAntdTableFormUtils {
  getFieldInstance?: (name: string) => {};
  setFieldsValue?: (value: { [key: string]: any }) => void;
  getFieldsValue?: (...args: any) => any;
  resetFields?: () => void;
  [key: string]: any;
}

export interface ReturnValue<Item> {
  /* table 已经废弃 */
  table?: {
    dataSource: Item[];
    loading: boolean;
    onChange: (pagination: PaginationConfig, filters?: Filter, sorter?: Sorter) => void;
    pagination: {
      current: number;
      pageSize: number;
      total: number;
    } & { [K in keyof PaginationConfig]?: PaginationConfig[K] };
  };
  tableProps: {
    dataSource: Item[];
    loading: boolean;
    onChange: (pagination: PaginationConfig, filters?: Filter, sorter?: Sorter) => void;
    pagination: {
      current: number;
      pageSize: number;
      total: number;
    } & { [K in keyof PaginationConfig]?: PaginationConfig[K] };
  };
  sorter: Sorter;
  filters: Filter;
  refresh: () => void;
  // TODO 如果有 form，则一定有 search
  search?: {
    type: 'simple' | 'advance';
    changeType: () => void;
    submit: () => void;
    reset: () => void;
  };
}

export interface Options<Result, Item> {
  defaultPageSize?: number;
  id?: string;
  form?: UseAntdTableFormUtils;
  formatResult?: (
    result: Result | undefined,
  ) => {
    current?: number;
    pageSize?: number;
    total: number;
    data: Item[];
  };
}

// Item 如何变成可选的？
export interface FnParams<Item> {
  current: number;
  pageSize: number;
  sorter?: Sorter;
  filters?: Filter;
  [key: string]: any;
}

interface FormData {
  [key: string]: any;
}

class UseTableInitState<Item> {
  // 搜索类型，简单、高级
  searchType: 'simple' | 'advance' = 'simple';

  // 当前页码
  current = 1;

  // 分页大小
  pageSize = 10;

  // 总页数
  total = 0;

  // 全量表单数据
  formData: FormData = {};

  // active 表单数据
  activeFormData: FormData = {};

  // 计数器
  count = 0;

  // 列表数据
  data: Item[] = [];

  filters: Filter = {} as Filter;

  sorter: Sorter = {} as Sorter;
}

// 缓存
const cacheData: { [key: string]: any } = {};

const reducer = <Item>(state: UseTableInitState<Item>, action: { type: string; payload?: {} }) => {
  switch (action.type) {
    case 'updateState':
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
};

function useAntdTable<Result, Item>(
  fn: (params: FnParams<Item>) => Promise<Result>,
  options?: Options<Result, Item>,
): ReturnValue<Item>;

function useAntdTable<Result, Item>(
  fn: (params: FnParams<Item>) => Promise<Result>,
  deps?: DependencyList,
  options?: Options<Result, Item>,
): ReturnValue<Item>;

function useAntdTable<Result, Item>(
  fn: (params: FnParams<Item>) => Promise<Result>,
  deps?: DependencyList | Options<Result, Item>,
  options?: Options<Result, Item>,
): ReturnValue<Item> {
  const _deps: DependencyList = (Array.isArray(deps) ? deps : []) as DependencyList;
  const _options: Options<Result, Item> = (typeof deps === 'object' && !Array.isArray(deps)
    ? deps
    : options || {}) as Options<Result, Item>;

  const initState = useMemo(() => new UseTableInitState<Item>(), []);

  const { defaultPageSize = 10, id, form, formatResult } = _options;
  const [state, dispatch] = useReducer<Reducer<UseTableInitState<Item>, any>>(reducer, {
    ...initState,
    pageSize: defaultPageSize,
  });

  /* 临时记录切换前的表单数据 */
  const tempFieldsValueRef = useRef<FormData>({});

  const stateRef = useRef({} as UseTableInitState<Item>);
  stateRef.current = state;
  const { run, loading } = useAsync<Result>(fn, _deps, {
    manual: true,
  });

  const reload = useCallback(() => {
    dispatch({
      type: 'updateState',
      payload: {
        current: 1,
        count: state.count + 1,
      },
    });
  }, [state.count]);

  const refresh = useCallback(() => {
    dispatch({
      type: 'updateState',
      payload: { count: state.count + 1 },
    });
  }, [state.count]);

  /* 初始化执行 */
  useEffect(() => {
    /* 有缓存，恢复 */
    if (id && cacheData[id]) {
      const cache = cacheData[id];
      /* 修改完 formData 和 searchType 之后，会触发 useUpdateEffect，给当前表单赋值 */
      dispatch({
        type: 'updateState',
        payload: {
          current: cache.current,
          pageSize: cache.pageSize,
          searchType: cache.searchType,
          activeFormData: cache.activeFormData,
          formData: cache.formData,
          filters: cache.filters,
          sorter: cache.sorter,
          count: state.count + 1,
        },
      });
    } else if (form) {
      /* 如果有 form，需要走 searchSubmit，为了初始化的时候，拿到 initialValue */
      searchSubmit();
    } else {
      refresh();
    }

    if (id) {
      return () => {
        cacheData[id] = stateRef.current;
      };
    }
    return () => {};
  }, []);

  /* deps 变化后，重置表格 */
  useUpdateEffect(() => {
    reload();
  }, _deps);

  /* state.count 变化时，重新请求数据 */
  useUpdateEffect(() => {
    const formattedData: FormData = {};
    /* 把  undefined 的过滤掉 */
    Object.keys(state.activeFormData).forEach(key => {
      if (state.activeFormData[key] !== undefined) {
        formattedData[key] = state.activeFormData[key];
      }
    });

    const params: any = {
      current: state.current,
      pageSize: state.pageSize,
      ...formattedData,
    };
    if (state.filters) {
      params.filters = state.filters;
    }
    if (state.sorter) {
      params.sorter = state.sorter;
    }
    run(params).then(res => {
      const payload = formatResult ? formatResult(res) : res;
      dispatch({
        type: 'updateState',
        payload,
      });
    });
  }, [state.current, state.pageSize, state.count]);

  /* 改变了 searchType，或者 formData，恢复表单数据 */
  useUpdateEffect(() => {
    if (!form) {
      return;
    }
    const targetFormData = { ...state.formData, ...tempFieldsValueRef.current };
    const existFormData: FormData = {};
    Object.keys(targetFormData).forEach((key: string) => {
      if (form.getFieldInstance ? form.getFieldInstance(key) : true) {
        existFormData[key] = targetFormData[key];
      }
    });
    if (form.setFieldsValue) {
      form.setFieldsValue(existFormData);
    }
    tempFieldsValueRef.current = {};
  }, [state.searchType, state.formData]);

  /* 获得当前 form 数据 */
  const getCurrentFieldsValues = useCallback(() => {
    if (!form) {
      return [];
    }
    let fieldsValue = {} as FormData;
    if (form.getFieldsValue) {
      fieldsValue = form.getFieldsValue();
    }
    const filterFiledsValue: FormData = {};
    Object.keys(fieldsValue).forEach((key: string) => {
      if (form.getFieldInstance ? form.getFieldInstance(key) : true) {
        filterFiledsValue[key] = fieldsValue[key];
      }
    });
    return filterFiledsValue;
  }, [form]);

  // 表单搜索
  const searchSubmit = useCallback(
    (e?: string | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
      if (!form) {
        return;
      }
      if (e && (e as React.MouseEvent<HTMLElement>).preventDefault) {
        (e as React.MouseEvent<HTMLElement>).preventDefault();
      }

      setTimeout(() => {
        const activeFormData = getCurrentFieldsValues();
        dispatch({
          type: 'updateState',
          payload: {
            activeFormData,
            formData: { ...state.formData, ...activeFormData },
          },
        });
        reload();
      });
    },
    [form, reload],
  );

  // 重置表单
  const searchReset = useCallback(() => {
    if (!form) {
      return;
    }
    // 恢复初始值
    if (form.resetFields) {
      form.resetFields();
    }
    // 重置表单后，拿到当前默认值
    const activeFormData = getCurrentFieldsValues();

    dispatch({
      type: 'updateState',
      payload: {
        activeFormData,
        formData: activeFormData,
      },
    });

    reload();
  }, [form, reload]);

  // 切换搜索类型
  const changeSearchType = useCallback(() => {
    if (!form) {
      return;
    }
    tempFieldsValueRef.current = getCurrentFieldsValues();
    const targetSearchType = state.searchType === 'simple' ? 'advance' : 'simple';
    dispatch({
      type: 'updateState',
      payload: {
        searchType: targetSearchType,
      },
    });
  }, [state.searchType]);

  // 表格翻页 排序 筛选等
  const changeTable = useCallback(
    (p: PaginationConfig, f: Filter = {} as Filter, s: Sorter = {} as Sorter) => {
      // antd table 的初始状态 filter 带有 null 字段，需要先去除后再比较
      const realFilter = { ...f };
      Object.entries(realFilter).forEach(item => {
        if (item[1] === null) {
          delete (realFilter as Object)[item[0] as keyof Object];
        }
      });
      const needReload =
        !isEqual(realFilter, state.filters) ||
        s.field !== state.sorter.field ||
        s.order !== state.sorter.order;

      dispatch({
        type: 'updateState',
        payload: {
          current: needReload ? 1 : p.current,
          pageSize: p.pageSize,
          count: state.count + 1,
          filters: f,
          sorter: s,
        },
      });
    },
    [state.count],
  );

  const result: ReturnValue<Item> = {
    /* table 已经废弃 */
    table: {
      dataSource: state.data,
      loading,
      onChange: changeTable,
      pagination: {
        current: state.current,
        pageSize: state.pageSize,
        total: state.total,
      },
    },
    tableProps: {
      dataSource: state.data,
      loading,
      onChange: changeTable,
      pagination: {
        current: state.current,
        pageSize: state.pageSize,
        total: state.total,
      },
    },
    sorter: state.sorter,
    filters: state.filters,
    refresh,
  };
  if (form) {
    result.search = {
      submit: searchSubmit,
      type: state.searchType,
      changeType: changeSearchType,
      reset: searchReset,
    };
  }

  return result;
}

export default useAntdTable;
