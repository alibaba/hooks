import { Obj, Middleware } from '../type';
import { REQUEST_SYMBOL, PAYLOAD_SYMBOL, LOADING_TIMER } from '../symbol';

const fetchMiddleware: Middleware = (ctx, next) => {
  const { [REQUEST_SYMBOL]: request, params, [PAYLOAD_SYMBOL]: payload, state, actions } = ctx;
  const { threshold } = request;

  if (parseInt(threshold, 10) === 0) {
    actions.setState({ loading: true });
  } else {
    const loadingTimer = setTimeout(() => {
      actions.setState({ loading: true });
    }, threshold);

    ctx.meta[LOADING_TIMER] = loadingTimer;
  }

  return request
    .service(params, {
      payload,
      state,
      actions,
    })
    .then(
      (res: Obj) => {
        ctx.response = res;
        return next().then(() => Promise.resolve(ctx.response));
      },
      (err: Obj = {}) => {
        const reject = request.reject || (() => {});
        const { content = {} } = err;
        clearTimeout(ctx.meta[LOADING_TIMER]);
        actions.setState({ loading: false, dataSource: [], current: 1, total: 0 });
        reject(content.data, err);
        return Promise.reject(err);
      },
    );
};

export default fetchMiddleware;
