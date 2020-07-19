import { Pipe } from '../type';

const refreshPipe: Pipe = (ctx) => {
  const { config = {}, store } = ctx;
  const { defaults = {} } = config;
  const memoState = store.stateMap.get();
  const { formState, pagination } = memoState;
  const pageIndex = pagination.current || defaults.pageIndex;
  const pageSize = pagination.pageSize || defaults.pageSize;
  const { values = {} } = formState;

  ctx.params = {
    ...ctx.params,
    ...values,
    pageIndex,
    pageSize,
  };

  return ctx;
};

export default refreshPipe;
