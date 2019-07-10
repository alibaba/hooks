import { useEffect, useRef, useReducer } from 'react';
import { WrappedFormUtils, FormComponentProps } from 'antd/lib/form/Form';

interface UserTableFormUtils extends WrappedFormUtils {
  getFieldInstance?: (name: string) => {};
}
interface IUseTableProps extends FormComponentProps {
  // antd form 对象
  form: UserTableFormUtils;
  // 请求参数的 service 方法
  service(...args: unknown[]): Promise<unknown>;
  // 缓存 id 用于区分缓存的回填（默认时间戳）
  id?: string;
}

interface IUserTable {
  table: {
    changeTable: (e: { current: number; focusUpdate?: false }) => void;
    data: unknown;
    loading: boolean;
  };
  form: {
    search?: (e: { preventDefault?: Function }) => void;
    searchType: 'simple' | 'advance';
    changeSearchType?: (...args: unknown[]) => void;
  };
}

interface IHistoryData {
  [key: string]: unknown;
}

class UserTableInitState {
  // 搜索类型，简单、高级
  searchType: 'simple' | 'advance' = 'simple';

  // 数据加载状态
  loading: boolean = false;

  // 当前页码
  current: number = 1;

  // 当前表单数据
  currentFieldData: IHistoryData = {};

  // 历史表单数据
  historyFieldData: { simple: IHistoryData; advance: IHistoryData } = { simple: {}, advance: {} };

  // 服务端返回的数据
  data: unknown = null;

  // 计数器
  count: number = 0;
}
// 初始值
const initState = new UserTableInitState();
// 缓存
const cacheData: { [key: string]: UserTableInitState } = {};

const reducer = (state = initState, action: { type: string; payload?: {} }) => {
  switch (action.type) {
    case 'updateState':
      return { ...state, ...action.payload };
    case 'updateHistoryFiledData':
      return { ...state, historyFieldData: { ...state.historyFieldData, ...action.payload } };
    default:
      throw new Error();
  }
};

export default (props: IUseTableProps): IUserTable => {
  const [state, dispatch] = useReducer(reducer, initState);
  const stateRef = useRef<UserTableInitState>(({} as unknown) as UserTableInitState);
  const cacheKey = props.id;

  useEffect(() => {
    if (stateRef.current) {
      stateRef.current = state;
    }
  });

  useEffect(() => {
    if (cacheKey && cacheData[cacheKey]) {
      const cache = cacheData[cacheKey];

      dispatch({
        type: 'updateState',
        payload: {
          current: cache.current,
          searchType: cache.searchType,
          currentFieldData: cache.currentFieldData,
          historyFieldData: cache.historyFieldData,
          // 恢复 cache 后 强制刷新
          count: state.count + 1,
        },
      });

      // searchType 不变的情况下，需要手动还原表单状态
      if (cache.searchType === state.searchType) {
        const historyData = cache.historyFieldData[cache.searchType];
        Object.keys(cache.currentFieldData).forEach((key: string) => {
          // 切换状态后，还原当前搜索类型中的历史数据
          if (historyData[key] && props.form.getFieldInstance && props.form.getFieldInstance(key)) {
            props.form.setFieldsValue({ [key]: historyData[key] });
          }
        });
      }
    }

    // 卸载前缓存当前查询条件
    return () => {
      if (cacheKey) {
        cacheData[cacheKey] = stateRef.current;
      }
    };
  }, []);

  useEffect(() => {
    if (cacheKey && !cacheData[cacheKey]) {
      dispatch({
        type: 'updateState',
        payload: { loading: true },
      });

      const fieldData = state.currentFieldData;
      const queryParams = ({} as unknown) as IHistoryData;
      // 过滤当前搜索类型中不存在的查询字段及值
      Object.keys(state.currentFieldData).forEach((key: string) => {
        if (props.form.getFieldInstance && props.form.getFieldInstance(key)) {
          queryParams[key] = fieldData[key];
        }
      });

      // 请求数据
      props.service({ current: state.current, ...queryParams }).then(res => {
        dispatch({
          type: 'updateState',
          payload: { loading: false, data: res },
        });
      });
    }
  }, [state.current, state.count]);

  useEffect(() => {
    if (props.form) {
      const historyData = state.historyFieldData[state.searchType];

      Object.keys(props.form.getFieldsValue()).forEach((key: string) => {
        // 切换状态后，还原当前搜索类型中的历史数据
        if (historyData[key] && props.form.getFieldInstance && props.form.getFieldInstance(key)) {
          props.form.setFieldsValue({ [key]: historyData[key] });
        }
      });

      // 在最后一个 effect 里清空 cache，避免重复发请求
      if (cacheKey) {
        cacheData[cacheKey] = (null as unknown) as UserTableInitState;
      }
    }
  }, [state.searchType]);

  /**
   * 表格翻页
   * current 页码
   * focusUpdate 是否使用查询条件刷新当前页
   */
  const changeTable = (e: { current: number; focusUpdate?: false }) => {
    dispatch({
      type: 'updateState',
      payload: {
        current: e.current,
        count: e.focusUpdate ? state.count + 1 : state.count,
      },
    });
  };

  // 表单搜索
  let search;
  let changeSearchType;

  if (props.form) {
    search = (e: { preventDefault?: Function }) => {
      const currentFieldData = props.form && props.form.getFieldsValue();

      if (e && e.preventDefault) {
        e.preventDefault();
      }

      // 保存当前表单的用户输入数据
      dispatch({
        type: 'updateHistoryFiledData',
        payload: {
          [state.searchType]: currentFieldData,
        },
      });

      dispatch({
        type: 'updateState',
        payload: { currentFieldData, current: 1, count: state.count + 1 },
      });
    };

    // 切换搜索类型
    changeSearchType = () => {
      const fileData = props.form && props.form.getFieldsValue();

      // 切换搜索类型时，保存当前表单的用户输入数据
      dispatch({
        type: 'updateHistoryFiledData',
        payload: {
          [state.searchType]: fileData,
        },
      });

      // 更新搜索类型
      dispatch({
        type: 'updateState',
        payload: {
          searchType: state.searchType === 'simple' ? 'advance' : 'simple',
        },
      });
    };
  }

  return {
    table: {
      changeTable,
      data: state.data,
      loading: state.loading,
    },
    form: {
      search,
      searchType: state.searchType,
      changeSearchType,
    },
  };
};
