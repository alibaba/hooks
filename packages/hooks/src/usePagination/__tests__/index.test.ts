import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { DependencyList } from 'react';
import usePagination, { Options, ReturnValue, FnParams } from '../index';

/* 暂时关闭 act 警告  见：https://github.com/testing-library/react-testing-library/issues/281#issuecomment-480349256 */
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});
afterAll(() => {
  console.error = originalError;
});

interface Params {
  asyncFn: (params: FnParams) => Promise<any>;
  deps?: DependencyList;
  options?: Options<any, any>;
}

describe('usePagination', () => {
  let queryArgs: any;
  const asyncFn = (query: FnParams) => {
    queryArgs = query;
    return Promise.resolve({
      current: query.current,
      total: 20,
      pageSize: query.pageSize,
      data: [],
    });
  };

  const setUp = ({ asyncFn: fn, deps, options }: Params) =>
    renderHook(params => usePagination(params.asyncFn, params.deps, params.options), {
      initialProps: {
        asyncFn: fn,
        deps,
        options,
      } as Params,
    });

  let hook: RenderHookResult<Params, ReturnValue<any>>;

  it('should be defined', () => {
    expect(usePagination).toBeDefined();
  });

  it('should fetch after first render', async () => {
    queryArgs = undefined;
    act(() => {
      hook = setUp({
        asyncFn,
      });
    });

    expect(hook.result.current.loading).toEqual(true);
    expect(queryArgs.current).toEqual(1);
    expect(queryArgs.pageSize).toEqual(10);
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.pagination.current).toEqual(1);
    expect(hook.result.current.pagination.pageSize).toEqual(10);
    expect(hook.result.current.pagination.total).toEqual(20);
  });

  it('should options work', async () => {
    queryArgs = undefined;
    act(() => {
      hook = setUp({
        asyncFn,
        options: {
          defaultPageSize: 5,
          formatResult: (res: any) => ({
            ...res,
            total: 22,
          }),
        },
      });
    });
    expect(queryArgs.current).toEqual(1);
    expect(queryArgs.pageSize).toEqual(5);
    await hook.waitForNextUpdate();
    expect(hook.result.current.pagination.pageSize).toEqual(5);
    expect(hook.result.current.pagination.total).toEqual(22);
  });

  it('should actions work', async () => {
    queryArgs = undefined;
    act(() => {
      hook = setUp({
        asyncFn,
      });
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.pagination.current).toEqual(1);
    expect(hook.result.current.pagination.pageSize).toEqual(10);
    expect(hook.result.current.pagination.totalPage).toEqual(2);
    /* should changeCurrent work */
    act(() => {
      hook.result.current.pagination.changeCurrent(3);
    });
    expect(hook.result.current.loading).toEqual(true);
    expect(queryArgs.current).toEqual(2);
    expect(queryArgs.pageSize).toEqual(10);
    await hook.waitForNextUpdate();
    expect(hook.result.current.pagination.current).toEqual(2);
    /* should changePageSize work */
    act(() => {
      hook.result.current.pagination.changePageSize(5);
    });
    expect(hook.result.current.loading).toEqual(true);
    expect(queryArgs.current).toEqual(2);
    expect(queryArgs.pageSize).toEqual(5);
    await hook.waitForNextUpdate();
    expect(hook.result.current.pagination.pageSize).toEqual(5);
    /* should onChange work */
    act(() => {
      hook.result.current.pagination.onChange(10, 50);
    });
    expect(hook.result.current.loading).toEqual(true);
    expect(queryArgs.current).toEqual(1);
    expect(queryArgs.pageSize).toEqual(50);
    await hook.waitForNextUpdate();
    expect(hook.result.current.pagination.current).toEqual(1);
    expect(hook.result.current.pagination.pageSize).toEqual(50);
    /* should onChange work when current and pageSize error */
    act(() => {
      hook.result.current.pagination.onChange(-1, -1);
    });
    expect(hook.result.current.loading).toEqual(true);
    expect(queryArgs.current).toEqual(1);
    expect(queryArgs.pageSize).toEqual(1);
    await hook.waitForNextUpdate();
    expect(hook.result.current.pagination.current).toEqual(1);
    expect(hook.result.current.pagination.pageSize).toEqual(1);
    expect(hook.result.current.pagination.totalPage).toEqual(20);
    /* should refresh work */
    act(() => {
      hook.result.current.refresh();
    });
    expect(hook.result.current.loading).toEqual(true);
    expect(queryArgs.current).toEqual(1);
    expect(queryArgs.pageSize).toEqual(1);
  });

  it('should refresh after deps change', async () => {
    queryArgs = undefined;

    act(() => {
      hook = setUp({
        asyncFn,
        deps: [1],
      });
    });

    expect(hook.result.current.loading).toEqual(true);
    expect(queryArgs.current).toEqual(1);
    expect(queryArgs.pageSize).toEqual(10);
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    act(() => {
      hook.result.current.pagination.onChange(2, 5);
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.pagination.current).toEqual(2);
    expect(hook.result.current.pagination.pageSize).toEqual(5);

    act(() => {
      hook.rerender({
        asyncFn,
        deps: [2],
      });
    });
    expect(queryArgs.current).toEqual(1);
    expect(queryArgs.pageSize).toEqual(5);
  });
});
