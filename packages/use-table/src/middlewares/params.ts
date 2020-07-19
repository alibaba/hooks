/**
 * 参数管理
 */

import { Middleware } from '../type';
import pipes from '../pipes/index';

const paramsMiddleware: Middleware = (ctx, next) => {
  const { helper } = ctx;
  const { pipeCompose } = helper;
  const { params } = pipeCompose(pipes)({ ...ctx, params: {} });
  ctx.params = params;

  return next();
};

export default paramsMiddleware;
