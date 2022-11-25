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
    expect(hook.result.current.loading).toEqual(true);
    expect(queryArgs.current).toEqual(1);
    expect(queryArgs.pageSize).toEqual(10);
    await waitFor(() => expect(hook.result.current.loading).toEqual(false));

    expect(hook.result.current.pagination.current).toEqual(1);
    expect(hook.result.current.pagination.pageSize).toEqual(10);
    expect(hook.result.current.pagination.total).toEqual(55);
    expect(hook.result.current.pagination.totalPage).toEqual(6);
  });

  it('should action work', async () => {
    queryArgs = undefined;
    act(() => {
      hook = setUp(asyncFn, {});
    });
    expect(hook.result.current.loading).toEqual(true);
    expect(queryArgs.current).toEqual(1);
    expect(queryArgs.pageSize).toEqual(10);
    await waitFor(() => expect(hook.result.current.loading).toEqual(false));

    act(() => {
      hook.result.current.pagination.changeCurrent(2);
    });
    expect(hook.result.current.loading).toEqual(true);
    expect(queryArgs.current).toEqual(2);
    expect(queryArgs.pageSize).toEqual(10);
    await waitFor(() => expect(hook.result.current.pagination.current).toEqual(2));

    act(() => {
      hook.result.current.pagination.changeCurrent(10);
    });
    expect(hook.result.current.loading).toEqual(true);
    expect(queryArgs.current).toEqual(6);
    expect(queryArgs.pageSize).toEqual(10);
    await waitFor(() => expect(hook.result.current.pagination.current).toEqual(6));

    act(() => {
      hook.result.current.pagination.changePageSize(20);
    });
    expect(hook.result.current.loading).toEqual(true);
    expect(queryArgs.current).toEqual(3);
    expect(queryArgs.pageSize).toEqual(20);
    await waitFor(() => expect(hook.result.current.pagination.current).toEqual(3));
    expect(hook.result.current.pagination.pageSize).toEqual(20);
    expect(hook.result.current.pagination.totalPage).toEqual(3);

    act(() => {
      hook.result.current.pagination.onChange(2, 10);
    });
    expect(hook.result.current.loading).toEqual(true);
    expect(queryArgs.current).toEqual(2);
    expect(queryArgs.pageSize).toEqual(10);
    await waitFor(() => expect(hook.result.current.pagination.current).toEqual(2));
    expect(hook.result.current.pagination.pageSize).toEqual(10);
    expect(hook.result.current.pagination.totalPage).toEqual(6);
  });

  it('should refreshDeps work', async () => {
    queryArgs = undefined;
    let dep = 1;
    act(() => {
      hook = setUp(asyncFn, {
        refreshDeps: [dep],
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    expect(queryArgs.current).toEqual(1);
    expect(queryArgs.pageSize).toEqual(10);
    await waitFor(() => expect(hook.result.current.loading).toEqual(false));

    act(() => {
      hook.result.current.pagination.onChange(3, 20);
    });
    expect(hook.result.current.loading).toEqual(true);
    await waitFor(() => expect(hook.result.current.pagination.current).toEqual(3));
    expect(hook.result.current.pagination.pageSize).toEqual(20);

    dep = 2;
    hook.rerender({
      refreshDeps: [dep],
    });

    expect(hook.result.current.loading).toEqual(true);
    expect(queryArgs.current).toEqual(1);
    expect(queryArgs.pageSize).toEqual(20);
    await waitFor(() => expect(hook.result.current.pagination.current).toEqual(1));
    expect(hook.result.current.pagination.pageSize).toEqual(20);
  });

  it('should default params work', async () => {
    queryArgs = undefined;
    act(() => {
      hook = setUp(asyncFn, {
        defaultPageSize: 5,
        defaultCurrent: 2,
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    expect(queryArgs.current).toEqual(2);
    expect(queryArgs.pageSize).toEqual(5);
    await waitFor(() => expect(hook.result.current.loading).toEqual(false));

    expect(hook.result.current.pagination.current).toEqual(2);
    expect(hook.result.current.pagination.pageSize).toEqual(5);
    expect(hook.result.current.pagination.total).toEqual(55);
    expect(hook.result.current.pagination.totalPage).toEqual(11);

    act(() => {
      hook.result.current.pagination.changeCurrent(3);
    });
    expect(hook.result.current.loading).toEqual(true);
    expect(queryArgs.current).toEqual(3);
    expect(queryArgs.pageSize).toEqual(5);
    await waitFor(() => expect(hook.result.current.pagination.current).toEqual(3));
    expect(hook.result.current.pagination.pageSize).toEqual(5);
  });
});
