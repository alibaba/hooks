import { Obj } from './type';

const createStore = () => {
  let $params: Obj = {};
  let $memoProps: Obj = {};
  let $ctx: Obj = {};
  let $memoState: Obj = {
    pagination: {},
    formState: {},
  };

  const paramMap = {
    get: () => $params,
    set: (params: Obj) => {
      $params = params;
    },
  };

  const ctxMap = {
    get: (key: string) => (key ? $ctx[key] : $ctx),
    set: (ctx: Obj) => {
      $ctx = { ...$ctx, ...ctx };
    },
  };

  const stateMap = {
    get: () => $memoState,
    set: (memoState: Obj) => {
      $memoState = memoState;
    },
  };

  const optionsMap = {
    get: () => $memoProps,
    set: (memoProps: Obj) => {
      $memoProps = memoProps;
    },
  };

  return { paramMap, stateMap, optionsMap, ctxMap };
};

export default createStore;
