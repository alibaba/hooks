import { methods } from '../config';
import { Processor } from '../type';

const usePaginationProps: Processor = (ctx) => {
  const { actions, app, options } = ctx;
  const { total, pageSize, current } = actions.getState();
  const { query } = app;

  ctx.paginationProps = {
    total,
    pageSize,
    current,
    onChange: ($current: number) => {
      query(
        { current: $current },
        {
          queryFrom: methods.ON_PAGE_CHANGE,
        },
      );
    },
    onPageSizeChange: ($pageSize: number) => {
      query(
        { pageSize: $pageSize, current: options.current },
        {
          queryFrom: methods.ON_PAGE_SIZE_CHANGE,
        },
      );
    },
  };
};

const useTableProps: Processor = (ctx) => {
  const { props, actions, helper, paginationProps } = ctx;
  const state = actions.getState();
  const { pipeCompose } = helper;
  const tablePluginProps = Array.isArray(props.tableProps) ? props.tableProps : [props.tableProps];
  const paginationPluginProps = Array.isArray(props.paginationProps)
    ? props.paginationProps
    : [props.paginationProps];

  const tableProps = {
    ...pipeCompose(tablePluginProps)({}),
    dataSource: state.dataSource,
    loading: state.loading,
    paginationProps: {
      ...paginationProps,
      ...pipeCompose(paginationPluginProps)({}),
    },
  };

  ctx.tableProps = tableProps;
};

export { useTableProps, usePaginationProps };
