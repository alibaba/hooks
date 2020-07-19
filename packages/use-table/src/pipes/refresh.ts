import { Pipe } from '../type';

const refreshPipe: Pipe = (ctx) => {
  const { config = {}, store } = ctx;
  const { defaults = {} } = config;
  const memoState = store.stateMap.get();
  const { pagination } = memoState;
  const current = pagination.current || defaults.current;
  const pageSize = pagination.pageSize || defaults.pageSize;

  ctx.params = {
    ...ctx.params,
    current,
    pageSize,
  };

  return ctx;
};

export default refreshPipe;
