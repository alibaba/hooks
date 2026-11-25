import type { RenderHookResult } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { act, renderHook, waitFor } from '../../utils/tests';
import usePagination from '../';

// 初始化
// 基本 action
// refreshDeps
// cache

describe('usePagination', () => {
  let queryArgs: any;
  const asyncFn = (query: any) => {
    queryArgs = query;
    return Promise.resolve({
      current: query.current,
      total: 55,
      pageSize: query.pageSize,
      list: [],
    });
  };

  const setUp = (
    service: Parameters<typeof usePagination>[0],
    options: Parameters<typeof usePagination>[1],
  ) => renderHook((o) => usePagination(service, o || options));

  let hook: RenderHookResult<any, any>;

  test.each([{ manual: true }, { ready: false }])(
    'should expose the default current before fetching with %o',
    (options) => {
      const service = vi.fn(asyncFn);
      const { result } = renderHook(() =>
        usePagination(service, { defaultCurrent: 3, defaultPageSize: 20, ...options }),
      );

      expect(service).not.toHaveBeenCalled();
      expect(result.current.pagination.current).toBe(3);
      expect(result.current.pagination.pageSize).toBe(20);
    },
  );

  test('uses the configured query when a pagination action starts the first request', async () => {
    const service = vi.fn(
      async (_page: { current: number; pageSize: number; sort: string }, _filter: string) => ({
        list: [],
        total: 0,
      }),
    );
    const { result } = renderHook(() =>
      usePagination(service, {
        manual: true,
        defaultParams: [{ current: 2, pageSize: 25, sort: 'name' }, 'open'],
      }),
    );

    await act(async () => result.current.pagination.changeCurrent(3));
    expect(service).toHaveBeenCalledWith({ current: 3, pageSize: 25, sort: 'name' }, 'open');

    await act(async () => result.current.pagination.changeCurrent(4));
    expect(service).toHaveBeenLastCalledWith({ current: 1, pageSize: 25, sort: 'name' }, 'open');

    await act(async () => {
      await result.current.runAsync({ current: 1, pageSize: 10, sort: 'date' }, 'closed');
    });
    await act(async () => result.current.pagination.changePageSize(50));
    expect(service).toHaveBeenLastCalledWith({ current: 1, pageSize: 50, sort: 'date' }, 'closed');
  });

  test('keeps the starting page when changing page size before the first response', async () => {
    const service = vi.fn(asyncFn);
    const { result } = renderHook(() =>
      usePagination(service, { manual: true, defaultCurrent: 2 }),
    );

    await act(async () => result.current.pagination.changePageSize(20));
    expect(service).toHaveBeenCalledWith({ current: 2, pageSize: 20 });
  });

  test('should prefer request params to the default current', async () => {
    const { result } = renderHook(() =>
      usePagination(asyncFn, { manual: true, defaultCurrent: 3, defaultPageSize: 20 }),
    );

    expect(result.current.pagination.current).toBe(3);
    await act(async () => {
      await result.current.runAsync({ current: 4, pageSize: 10 });
    });
    expect(result.current.pagination.current).toBe(4);
    expect(result.current.pagination.pageSize).toBe(10);
  });

  test('should fetch after first render', async () => {
    queryArgs = undefined;
    act(() => {
      hook = setUp(asyncFn, {});
    });
    expect(hook.result.current.loading).toBe(true);
    expect(queryArgs.current).toBe(1);
    expect(queryArgs.pageSize).toBe(10);
    await waitFor(() => expect(hook.result.current.loading).toBe(false));

    expect(hook.result.current.pagination.current).toBe(1);
    expect(hook.result.current.pagination.pageSize).toBe(10);
    expect(hook.result.current.pagination.total).toBe(55);
    expect(hook.result.current.pagination.totalPage).toBe(6);
  });

  test('should action work', async () => {
    queryArgs = undefined;
    act(() => {
      hook = setUp(asyncFn, {});
    });
    expect(hook.result.current.loading).toBe(true);
    expect(queryArgs.current).toBe(1);
    expect(queryArgs.pageSize).toBe(10);
    await waitFor(() => expect(hook.result.current.loading).toBe(false));

    act(() => {
      hook.result.current.pagination.changeCurrent(2);
    });
    expect(hook.result.current.loading).toBe(true);
    expect(queryArgs.current).toBe(2);
    expect(queryArgs.pageSize).toBe(10);
    await waitFor(() => expect(hook.result.current.pagination.current).toBe(2));

    act(() => {
      hook.result.current.pagination.changeCurrent(10);
    });
    expect(hook.result.current.loading).toBe(true);
    expect(queryArgs.current).toBe(6);
    expect(queryArgs.pageSize).toBe(10);
    await waitFor(() => expect(hook.result.current.pagination.current).toBe(6));

    act(() => {
      hook.result.current.pagination.changePageSize(20);
    });
    expect(hook.result.current.loading).toBe(true);
    expect(queryArgs.current).toBe(3);
    expect(queryArgs.pageSize).toBe(20);
    await waitFor(() => expect(hook.result.current.pagination.current).toBe(3));
    expect(hook.result.current.pagination.pageSize).toBe(20);
    expect(hook.result.current.pagination.totalPage).toBe(3);

    act(() => {
      hook.result.current.pagination.onChange(2, 10);
    });
    expect(hook.result.current.loading).toBe(true);
    expect(queryArgs.current).toBe(2);
    expect(queryArgs.pageSize).toBe(10);
    await waitFor(() => expect(hook.result.current.pagination.current).toBe(2));
    expect(hook.result.current.pagination.pageSize).toBe(10);
    expect(hook.result.current.pagination.totalPage).toBe(6);
  });

  test('should refreshDeps work', async () => {
    queryArgs = undefined;
    let dep = 1;
    act(() => {
      hook = setUp(asyncFn, {
        refreshDeps: [dep],
      });
    });
    expect(hook.result.current.loading).toBe(true);
    expect(queryArgs.current).toBe(1);
    expect(queryArgs.pageSize).toBe(10);
    await waitFor(() => expect(hook.result.current.loading).toBe(false));

    act(() => {
      hook.result.current.pagination.onChange(3, 20);
    });
    expect(hook.result.current.loading).toBe(true);
    await waitFor(() => expect(hook.result.current.pagination.current).toBe(3));
    expect(hook.result.current.pagination.pageSize).toBe(20);

    dep = 2;
    hook.rerender({
      refreshDeps: [dep],
    });

    expect(hook.result.current.loading).toBe(true);
    expect(queryArgs.current).toBe(1);
    expect(queryArgs.pageSize).toBe(20);
    await waitFor(() => expect(hook.result.current.pagination.current).toBe(1));
    expect(hook.result.current.pagination.pageSize).toBe(20);
  });

  test('should default params work', async () => {
    queryArgs = undefined;
    act(() => {
      hook = setUp(asyncFn, {
        defaultPageSize: 5,
        defaultCurrent: 2,
      });
    });
    expect(hook.result.current.loading).toBe(true);
    expect(queryArgs.current).toBe(2);
    expect(queryArgs.pageSize).toBe(5);
    await waitFor(() => expect(hook.result.current.loading).toBe(false));

    expect(hook.result.current.pagination.current).toBe(2);
    expect(hook.result.current.pagination.pageSize).toBe(5);
    expect(hook.result.current.pagination.total).toBe(55);
    expect(hook.result.current.pagination.totalPage).toBe(11);

    act(() => {
      hook.result.current.pagination.changeCurrent(3);
    });
    expect(hook.result.current.loading).toBe(true);
    expect(queryArgs.current).toBe(3);
    expect(queryArgs.pageSize).toBe(5);
    await waitFor(() => expect(hook.result.current.pagination.current).toBe(3));
    expect(hook.result.current.pagination.pageSize).toBe(5);
  });
});
