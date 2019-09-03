import { WrappedFormUtils } from 'antd/lib/form/Form';
import { PaginationConfig } from 'antd/lib/pagination';
import { DependencyList, useEffect, useReducer, useRef, useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import useAsync from '../useAsync';

interface UseAntdTableFormUtils extends WrappedFormUtils {
  getFieldInstance?: (name: string) => {};
}

export interface ReturnValue<Item> {
  /* table 已经废弃 */
  table?: {
    dataSource: Item[];
    loading: boolean;
    onChange: (e: PaginationConfig) => void;
    pagination: {
      current: number;
      pageSize: number;
      total: number;
    };
  };
  tableProps: {
    dataSource: Item[];
    loading: boolean;
    onChange: (e: PaginationConfig) => void;
    pagination: {
      current: number;
      pageSize: number;
      total: number;
    };
  };
  refresh: () => void;
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
    result: Result,
  ) => {
    current?: number;
    pageSize?: number;
    total: number;
    data: Item[];
  };
}

export interface FnParams {
  current: number;
  pageSize: number;
  [key: string]: any;
}

interface FormData {
  [key: string]: any;
}

class UseTableInitState {
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
  data: any[] = [];
}

// 初始值
const initState = new UseTableInitState();

// 缓存
const cacheData: { [key: string]: UseTableInitState } = {};

const reducer = (state = initState, action: { type: string; payload?: {} }) => {
  switch (action.type) {
    case 'updateState':
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
};

export default function useAntdTable<Result, Item>(
  fn: (params: FnParams) => Promise<any>,
  deps: DependencyList = [],
  options: Options<Result, Item> = {},
): ReturnValue<Item> {
  const { defaultPageSize = 10, id, form, formatResult } = options;
  const [state, dispatch] = useReducer(reducer, { ...initState, pageSize: defaultPageSize });
  const stateRef = useRef<UseTableInitState>(({} as unknown) as UseTableInitState);
  stateRef.current = state;
  const { run, loading } = useAsync(fn, [], {
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
  }, deps);

  /* state.count 变化时，重新请求数据 */
  useUpdateEffect(() => {
    const washedFormData: FormData = {};
    /* 把  undefined 的过滤掉 */
    Object.keys(state.activeFormData).forEach(key => {
      if (state.activeFormData[key] !== undefined) {
        washedFormData[key] = state.activeFormData[key];
      }
    });

    run({
      current: state.current,
      pageSize: state.pageSize,
      ...washedFormData,
    }).then(res => {
      const formatData = formatResult ? formatResult(res) : res;
      dispatch({
        type: 'updateState',
        payload: { ...formatData },
      });
    });
  }, [state.current, state.pageSize, state.count]);

  /* 改变了 searchType，或者 formData，恢复表单数据 */
  useUpdateEffect(() => {
    if (!form) {
      return;
    }

    const existFormData: FormData = {};
    Object.keys(state.formData).forEach((key: string) => {
      if (form.getFieldInstance && form.getFieldInstance(key)) {
        existFormData[key] = state.formData[key];
      }
    });
    form.setFieldsValue(existFormData);
  }, [state.searchType, state.formData]);

  /* 获得当前 form 数据 */
  const getCurrentFiledlsValues = useCallback(() => {
    if (!form) {
      return [];
    }
    const filedlsValue = form.getFieldsValue();
    const filterFiledsValue: FormData = {};
    Object.keys(filedlsValue).forEach((key: string) => {
      if (form.getFieldInstance && form.getFieldInstance(key)) {
        filterFiledsValue[key] = filedlsValue[key];
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

      const filedlsValue = getCurrentFiledlsValues();
      dispatch({
        type: 'updateState',
        payload: {
          activeFormData: filedlsValue,
          formData: { ...state.formData, ...filedlsValue },
        },
      });
      reload();
    },
    [form],
  );

  // 重置表单
  const searchReset = useCallback(() => {
    if (!form) {
      return;
    }
    // 恢复初始值
    form.resetFields();
    // 重置表单后，拿到当前默认值
    const filedlsValue = getCurrentFiledlsValues();

    dispatch({
      type: 'updateState',
      payload: {
        activeFormData: filedlsValue,
        formData: { ...filedlsValue },
      },
    });

    reload();
  }, [form]);

  // 切换搜索类型
  const changeSearchType = useCallback(() => {
    if (!form) {
      return;
    }
    const targetSearchType = state.searchType === 'simple' ? 'advance' : 'simple';
    dispatch({
      type: 'updateState',
      payload: {
        searchType: targetSearchType,
      },
    });
  }, [state.searchType]);

  // 表格翻页
  const changeTable = useCallback(
    (e: PaginationConfig) => {
      dispatch({
        type: 'updateState',
        payload: {
          current: e.current,
          pageSize: e.pageSize,
          count: state.count + 1,
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
