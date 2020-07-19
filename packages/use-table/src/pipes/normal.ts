// 一些常规操作
import { Pipe, Obj } from '../type';
import { PAYLOAD_SYMBOL } from '../symbol';

const normalPipe: Pipe = (ctx) => {
  const { actions, [PAYLOAD_SYMBOL]: payload, store, config = {} } = ctx;
  const { stateMap } = store;
  const { defaults } = config;

  const { pageSize: $pageSize, current: $current } = actions.getState() || {
    pageSize: 20,
    current: 1,
  };

  const current = (payload as Obj).current || $current || defaults.current;
  const pageSize = (payload as Obj).pageSize || $pageSize || defaults.pageSize;

  ctx.params = {
    ...ctx.params,
    ...payload,
    current,
    pageSize,
  };

  // 打算存储起来下次备用，所以应该更新最新的。
  // 因为咱们的查询条件是通过 state + payload 决定的，
  // 需要下一次 state 把之前的 playload 也记录下来
  stateMap.set({
    pagination: { current, pageSize },
  });

  return ctx;
};

export default normalPipe;
