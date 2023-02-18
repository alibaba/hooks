import { renderHook, act, waitFor } from '@testing-library/react';
import usePagination from '../';

// 初始化
// 基本 action
// refreshDeps
// cache

describe('usePagination', () => {
  let queryArgs;
  const asyncFn = (query) => {
    queryArgs = query;
    return Promise.resolve({
      current: query.current,
      total: 55,
      pageSize: query.pageSize,
      list: [],
    });
  };

  const setUp = (service, options) => renderHook((o) => usePagination(service, o || options));

  let hook;

  it('should fetch after first render', async () => {
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

  it('should action work', async () => {
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

  it('should refreshDeps work', async () => {
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

  it('should default params work', async () => {
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
