import { useMemo, useCallback, useState } from 'react';
import useQueryDisplay from 'use-query-display';
import { timelines, defaults, PREPARE } from './config';
import createStore from './store';
import middlewares from './middlewares/index';
import { useTableProps, usePaginationProps } from './props/table';
import { Obj, ReturnValue, RawPlugins, Options, Plugin, IContext } from './type';
import { createFormPropsGetter, addYourMiddlewares } from './shared';
import { IS_NORMAL_SYMBOL } from './symbol';
import { checkQueryFrom } from './helper';

export * from './type';

const useMutableState = (initalState: Obj = {}) => {
  const [state, setState] = useState(initalState);
  const mutableState = useMemo(() => ({}), []);
  Object.assign(mutableState, state);
  return [mutableState, setState];
};

const useParams = (ctx: Obj) => {
  ctx.getParams = ctx.store.paramMap.get;
};

const propProcessors = [usePaginationProps, useTableProps, useParams];

const useTableQueryPlugin = (options): Plugin => {
  const [state, setState] = useMutableState({
    loading: false,
    dataSource: [],
    total: 0,
    pageSize: options.pageSize,
    current: options.pageIndex,

    // sticky
    sticky: false,
    height: 0,
  });

  const store = useMemo(createStore, []);
  const getState = useCallback(() => state, [state]);
  const actions = { getState, setState };

  return ({ app }) => {
    return {
      middlewares: {
        [PREPARE]: (ctx, next) => {
          const { helper, query } = app;
          const isNormal = !!ctx.meta.queryFrom;

          ctx.store = store;
          ctx.query = query;
          ctx.actions = actions;
          ctx.helper = {
            ...helper,
            checkQueryFrom: () => checkQueryFrom(ctx as IContext),
          };
          ctx.meta = { ...ctx.meta, [IS_NORMAL_SYMBOL]: isNormal };

          return next();
        },
        ...middlewares,
      },

      props: (props) => {
        const { helper } = app;
        return helper.processCompose(propProcessors)({
          options,
          props,
          store,
          actions,
          helper,
          app,
        });
      },
    };
  };
};

function useTable(service: (params?: Obj) => Promise<any>, deps?: any[]): ReturnValue;

function useTable(
  service: (params?: Obj) => Promise<any>,
  options?: Options,
  deps?: any[],
): ReturnValue;

function useTable(service, options?) {
  const realOptions = Array.isArray(options) ? {} : options || {};

  const {
    plugins = [],
    pageIndex = defaults.pageIndex,
    pageSize = defaults.pageSize,
  } = realOptions;
  const plugin: RawPlugins = [useTableQueryPlugin({ ...options, pageIndex, pageSize })];

  const { props: formTableQueryProps = {}, query } = useQueryDisplay(
    { timelines: [PREPARE].concat(timelines), ...options, service },
    plugin.concat(addYourMiddlewares(plugins)),
  );

  const { tableProps, getParams, actions, props } = formTableQueryProps;

  return { ...props, tableProps, query, getParams, actions };
}

export default useTable;
