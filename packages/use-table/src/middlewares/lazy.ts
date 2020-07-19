/**
 * 参数管理
 */

import { Middleware } from '../type';
import { methods } from '../config';
import { USE_CUSTOM_FIELDS_SYMBOL, REQUEST_SYMBOL } from '../symbol';

// TODO 这一个逻辑写得有点绕
const lazyMiddleware: Middleware = (ctx, next) => {
  const { [REQUEST_SYMBOL]: request } = ctx;
  const { autoFirstQuery = true } = request;
  const { queryFrom } = ctx.meta;

  if (autoFirstQuery) {
    if (ctx.meta[USE_CUSTOM_FIELDS_SYMBOL] && queryFrom === methods.ON_FORM_MOUNT) {
      return Promise.resolve();
    }
    return next();
  }
  if ([methods.ON_CUSTOM_FIELDS_SUBMIT, methods.ON_FORM_MOUNT].includes(queryFrom)) {
    return Promise.resolve();
  }
  return next();
};

export default lazyMiddleware;
