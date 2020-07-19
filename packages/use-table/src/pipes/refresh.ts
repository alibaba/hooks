import { Pipe } from '../type';

const refreshPipe: Pipe = (ctx) => {
  const { config = {}, store } = ctx;
  const { defaults = {} } = config;
  const memoState = store.stateMap.get();
  const { pagination } = memoState;
  const pageIndex = pagination.current || defaults.pageIndex;
  const pageSize = pagination.pageSize || defaults.pageSize;

  ctx.params = {
    ...ctx.params,
    pageIndex,
    pageSize,
  };

  return ctx;
};

export default refreshPipe;
