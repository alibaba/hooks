import { IS_NORMAL_SYMBOL, PAYLOAD_SYMBOL } from '../symbol';

import { Pipe, Transformer } from '../type';

// 单个请求参数更新
const updatePipe: Pipe = (ctx) => {
  const { [PAYLOAD_SYMBOL]: payload, params, actions, meta, store, helper } = ctx;
  const { isFunction, isObject } = helper;
  const { ctxMap } = store;
  const nextParams = meta[IS_NORMAL_SYMBOL] ? params : ctxMap.get('prevParams');

  // 局部的 transformer, 局部覆盖全局
  // 需要把 transform 之后的值保留下来
  if (isFunction(payload)) {
    ctx.params = (payload as Transformer)(nextParams, {
      payload,
      actions,
    });
  }

  // 比如 this.query({})
  if (isObject(payload) && !meta[IS_NORMAL_SYMBOL]) {
    ctx.params = {
      ...nextParams,
      ...payload,
    };
  }

  ctxMap.set({ prevParams: ctx.params });

  return ctx;
};

export default updatePipe;
