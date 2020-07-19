import { Middleware } from '../type';
import { REQUEST_SYMBOL, LOADING_TIMER } from '../symbol';

const renderMiddleware: Middleware = (ctx, next) => {
  return next().then(() => {
    const { response, rawResponse, params, [REQUEST_SYMBOL]: request, meta, actions, store } = ctx;

    const { data = {} } = response;
    const { pageIndex, pageSize } = data;
    // 以后端返回的 pageIndex, pageSize 为首要
    params.pageIndex = pageIndex || params.pageIndex;
    params.pageSize = pageSize || params.pageSize;

    const resolve = request.resolve || (() => {});
    store.paramMap.set(params);
    clearTimeout(meta[LOADING_TIMER]);

    actions.setState({
      loading: false,
      dataSource: data.dataSource || [],
      current: params.pageIndex,
      pageSize: params.pageSize,
      total: data.total || 0,
    });

    resolve(rawResponse);
    return Promise.resolve(rawResponse);
  });
};

export default renderMiddleware;
