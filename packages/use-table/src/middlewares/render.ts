import { Middleware } from '../type';
import { REQUEST_SYMBOL, LOADING_TIMER } from '../symbol';

const renderMiddleware: Middleware = (ctx, next) => {
  return next().then(() => {
    const { response, params, [REQUEST_SYMBOL]: request, meta, actions, store } = ctx;

    const { data = {} } = response;
    const { current, pageSize } = data;
    // 以后端返回的为首要
    params.current = current || params.current;
    params.pageSize = pageSize || params.pageSize;

    const resolve = request.resolve || (() => {});
    store.paramMap.set(params);
    clearTimeout(meta[LOADING_TIMER]);

    actions.setState({
      loading: false,
      dataSource: data.dataSource || [],
      current: params.current,
      pageSize: params.pageSize,
      total: data.total || 0,
    });

    resolve(response);
    return Promise.resolve(response);
  });
};

export default renderMiddleware;
