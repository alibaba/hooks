import { WrappedFormUtils } from 'antd/lib/form/Form';
import { PaginationConfig } from 'antd/lib/pagination';
import { DependencyList, useEffect, useReducer, useRef } from 'react';
import useUpdateEffect from '../useUpdateEffect';

interface UseTableFormUtils extends WrappedFormUtils {
  getFieldInstance?: (name: string) => {};
}
export interface ReturnValue<T> {
  data: T;
  loading: boolean;
  current: number;
  pageSize: number;
  changeTable: (e: PaginationConfig) => void;
  refresh: () => void;
  form?: {
    searchType: 'simple' | 'advance';
    changeSearchType: () => void;
    search: () => void;
  };
}

export interface Options {
  defaultPageSize?: number;
  id?: string;
  form?: UseTableFormUtils;
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

  // 数据加载状态
  loading: boolean = false;

  // 当前页码
  current: number = 1;

  // 分页大小
  pageSize: number = 10;

  // 表单数据
  formData: { simple: IHistoryData; advance: IHistoryData } = { simple: {}, advance: {} };

  // 服务端返回的数据
  data: unknown = null;

  // 计数器
  count: number = 0;
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
  options: Options = {},
): ReturnValue<T> {
  const { defaultPageSize = 10, id, form } = options;
  const [state, dispatch] = useReducer(reducer, { ...initState, pageSize: defaultPageSize });
  const stateRef = useRef<UseTableInitState>(({} as unknown) as UseTableInitState);

  /* 控制异步请求时序 */
  const runCount = useRef(0);

  stateRef.current = state;

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
    runCount.current += 1;
    const currentCount = runCount.current;

    dispatch({
      type: 'updateState',
      payload: { loading: true },
    });

    const queryParams = form ? state.formData[state.searchType] : {};

    fn({
      current: state.current,
      pageSize: state.pageSize,
      ...queryParams,
    }).then(res => {
      if (currentCount !== runCount.current) {
        return;
      }
      dispatch({
        type: 'updateState',
        payload: { loading: false, data: res },
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
  const search = (
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
    changeTable,
    data: state.data as T,
    current: state.current,
    pageSize: state.pageSize,
    loading: state.loading,
    refresh,
  };
  if (form) {
    result.form = {
      search,
      searchType: state.searchType,
      changeSearchType,
    };
  }

  return result;
}
