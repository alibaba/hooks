import { useEffect, useReducer, useRef, useCallback } from 'react';
import axios, { Canceler } from 'axios';

const { CancelToken } = axios;

interface IProps {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'head' | 'options' | 'patch';
  body?: string;
  onError?: (code: number, res: any) => void;
  onCancel?: () => void;
}

const initState = {
  loading: true,
  data: undefined,
  refreshToken: true,
};

const reducer = (state = initState, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case 'beforeFetch':
      return { ...state, loading: true };
    case 'saveData':
      return { ...state, loading: false, data: action.payload };
    case 'onError':
    case 'onCancel':
      return { ...state, loading: false, data: undefined };
    case 'onRetry':
      return { ...state, refreshToken: !state.refreshToken };
    default:
      throw new Error();
  }
};

const useAPI = (props: IProps) => {
  const cancelRef = useRef<Canceler | undefined>(undefined);
  const [state, dispatch] = useReducer(reducer, initState);

  const cancel = useCallback(() => {
    if (props.onCancel) {
      props.onCancel();
    }
    if (cancelRef.current) {
      cancelRef.current('请求被取消');
    }
    if (state.loading) {
      dispatch({ type: 'onCancel' });
    }
  }, [state.loading, props.onCancel]);

  useEffect(() => {
    const fetch = async () => {
      if (props.url) {
        dispatch({ type: 'beforeFetch' });

        const res = await axios({
          method: props.method || 'GET',
          url: props.url,
          data: props.body,
          responseType: 'json',
          cancelToken: new CancelToken(c => {
            cancelRef.current = c;
          }),
        });
        const { data, status } = res;

        if (status === 200 && data) {
          // 如果成功则保存数据
          dispatch({ type: 'saveData', payload: (data || {}).data });
          cancelRef.current = undefined;
        } else {
          // 如果指定了错误回调，执行错误回调
          if (props.onError) {
            props.onError(status, res);
          }
          dispatch({ type: 'onError' });
          cancelRef.current = undefined;
        }
      } else {
        // 没有 url 地址
        dispatch({ type: 'onError' });
      }
    };

    fetch();
    return () => {
      cancel();
    };
  }, [props.url, props.body, state.refreshToken]);

  const forceRefresh = useCallback(() => {
    if (cancelRef.current) {
      cancelRef.current('请求被取消');
    }
    dispatch({ type: 'onRetry' });
  }, []);

  return {
    data: state.data,
    loading: state.loading,
    cancel,
    reload: forceRefresh,
  };
};

export default useAPI;
