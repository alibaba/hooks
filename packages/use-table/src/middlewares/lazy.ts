/**
 * 参数管理
 */

import { Middleware } from '../type';
import { methods } from '../config';
import { REQUEST_SYMBOL } from '../symbol';

const lazyMiddleware: Middleware = (ctx, next) => {
  const { [REQUEST_SYMBOL]: request } = ctx;
  const { autoFirstQuery = true } = request;
  const { queryFrom } = ctx.meta;

  if (autoFirstQuery) {
    return next();
  }

  if ([methods.ON_MOUNT].includes(queryFrom)) {
    return Promise.resolve();
  }

  return next();
};

export default lazyMiddleware;
