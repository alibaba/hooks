import { Pipe } from '../type';
import { REQUEST_SYMBOL } from '../symbol';

// 全局的 transformer，也就是每一个query的时候都会带上
const transformer: Pipe = (ctx) => {
  const { params, [REQUEST_SYMBOL]: request } = ctx;
  if (request.transformer) {
    ctx.params = request.transformer(params);
  }

  return ctx;
};

export default transformer;
