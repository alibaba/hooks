import { WrappedFormUtils } from 'antd/lib/form/Form';
import { PaginationConfig } from 'antd/lib/pagination';
import { DependencyList, useEffect, useReducer, useRef } from 'react';
import { useUpdateEffect } from 'react-use';
import useAsync from '../useAsync';

interface UseTableFormUtils extends WrappedFormUtils {
  getFieldInstance?: (name: string) => {};
}

export interface ReturnValue<T> {
  /* table 已经废弃 */
  table?: {
    dataSource: T;
    loading: boolean;
    onChange: (e: PaginationConfig) => void;
    pagination: {
      current: number;
      pageSize: number;
      total: number;
    };
  };
  tableProps: {
    dataSource: T;
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
  };
}

export interface Options<T> {
  defaultPageSize?: number;
  id?: string;
  form?: UseTableFormUtils;
  formatResult?: (
    result: T,
  ) => {
    current?: number;
    pageSize?: number;
    total: number;
    data: any[];
  };
}

export interface FnParams {
  current: number;
  pageSize: number;
  [key: string]: any;
}

interface IHistoryData {
  [key: string]: unknown;
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

  // 表单数据
  formData: { simple: IHistoryData; advance: IHistoryData } = { simple: {}, advance: {} };

  // 计数器
  count = 0;

  // 服务端返回的数据
  data: unknown = null;
}

// 初始值
const initState = new UseTableInitState();

// 缓存
const cacheData: { [key: string]: UseTableInitState } = {};

const reducer = (state = initState, action: { type: string; payload?: {} }) => {
  switch (action.type) {
    case 'updateState':
      return { ...state, ...action.payload };
    case 'updateFormData':
      return { ...state, formData: { ...state.formData, ...action.payload } };
    default:
      throw new Error();
  }
};

export default function useAntdTable<T>(
  fn: (params: FnParams) => Promise<any>,
  deps: DependencyList = [],
  options: Options<T> = {},
): ReturnValue<T> {
  const { defaultPageSize = 10, id, form, formatResult } = options;
  const [state, dispatch] = useReducer(reducer, { ...initState, pageSize: defaultPageSize });
  const stateRef = useRef<UseTableInitState>(({} as unknown) as UseTableInitState);
  stateRef.current = state;

  const { run, loading } = useAsync(fn, [], {
    manual: true,
  });

  const reload = () => {
    dispatch({
      type: 'updateState',
      payload: {
        current: 1,
        count: state.count + 1,
      },
    });
  };

  useEffect(() => {
    /* 有缓存，恢复 */
    if (id) {
      if (cacheData[id]) {
        const cache = cacheData[id];
        dispatch({
          type: 'updateState',
          payload: {
            // 改变 current、pageSize 会重新加载数据
            current: cache.current,
            pageSize: cache.pageSize,
            searchType: cache.searchType,
            formData: cache.formData,
            // 恢复 cache 后 强制刷新
            count: state.count + 1,
          },
        });
        /* 如果有 form ,还原 form 数据 */
        if (form) {
          const cacheFormData = cache.formData[cache.searchType];
          form.setFieldsValue(cacheFormData);
        }
      } else {
        dispatch({
          type: 'updateState',
          payload: { count: state.count + 1 },
        });
      }

      /* 如果有 id，在销毁时缓存数据 */
      return () => {
        cacheData[id] = stateRef.current;
      };
    }

    /* 没有缓存，请求数据 */
    dispatch({
      type: 'updateState',
      payload: { count: state.count + 1 },
    });
    return () => {};
  }, []);

  /* deps 变化后，重置表格 */
  useUpdateEffect(() => {
    reload();
  }, deps);

  useUpdateEffect(() => {
    const queryParams = form ? state.formData[state.searchType] : {};

    run({
      current: state.current,
      pageSize: state.pageSize,
      ...queryParams,
    }).then(res => {
      let formatData = res;
      if (formatResult) {
        formatData = formatResult(res);
      }

      dispatch({
        type: 'updateState',
        payload: { ...formatData },
      });
    });
  }, [state.current, state.pageSize, state.count]);

  // 表格翻页
  const changeTable = (e: PaginationConfig) => {
    dispatch({
      type: 'updateState',
      payload: {
        current: e.current,
        pageSize: e.pageSize,
      },
    });
  };

  // 表单搜索
  const searchSubmit = (
    e?: string | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (!form) {
      return;
    }

    if (e && (e as React.MouseEvent<HTMLElement>).preventDefault) {
      (e as React.MouseEvent<HTMLElement>).preventDefault();
    }
    const filedlsValue = form.getFieldsValue();
    const filterFiledsValue: IHistoryData = {};
    Object.keys(filedlsValue).forEach((key: string) => {
      if (form.getFieldInstance && form.getFieldInstance(key)) {
        filterFiledsValue[key] = filedlsValue[key];
      }
    });

    // 保存当前表单的用户输入数据
    dispatch({
      type: 'updateFormData',
      payload: {
        [state.searchType]: filterFiledsValue,
      },
    });

    reload();
  };

  // 切换搜索类型
  const changeSearchType = () => {
    if (!form) {
      return;
    }
    form.resetFields();
    const targetSearchType = state.searchType === 'simple' ? 'advance' : 'simple';
    dispatch({
      type: 'updateState',
      payload: {
        searchType: targetSearchType,
      },
    });
    const currentFormData = state.formData[targetSearchType];
    form.setFieldsValue(currentFormData);
    reload();
  };

  const refresh = () => {
    dispatch({
      type: 'updateState',
      payload: {
        count: state.count + 1,
      },
    });
  };

  const result: ReturnValue<T> = {
    /* table 已经废弃 */
    table: {
      dataSource: state.data as T,
      loading,
      onChange: changeTable,
      pagination: {
        current: state.current,
        pageSize: state.pageSize,
        total: state.total,
      },
    },
    tableProps: {
      dataSource: state.data as T,
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
    };
  }

  return result;
}
