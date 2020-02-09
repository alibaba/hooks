import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useRequest from '../index';

describe('useRequest', () => {
  const originalError = console.error;
  beforeAll(() => {
    jest.useFakeTimers();
    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return;
      }
      originalError.call(console, ...args);
    };
  });
  afterAll(() => {
    console.error = originalError;
  });

  let queryArgs;
  const asyncFn = query => {
    queryArgs = query;
    return Promise.resolve({
      current: query.current,
      total: 20,
      pageSize: query.pageSize,
      list: [],
    });
  };

  const setUp = (service, options) => renderHook(() => useRequest(service, options))

  let hook;

  it('should fetch after first render', async () => {
    queryArgs = undefined;
    act(() => {
      hook = setUp(asyncFn, {
        paginated: true
      });
    });
    expect(hook.result.current.tableProps.loading).toEqual(true);
    expect(queryArgs.current).toEqual(1);
    expect(queryArgs.pageSize).toEqual(10);
    await hook.waitForNextUpdate();

    expect(hook.result.current.tableProps.loading).toEqual(false);
    expect(hook.result.current.tableProps.pagination.current).toEqual(1);
    expect(hook.result.current.tableProps.pagination.pageSize).toEqual(10);
    expect(hook.result.current.tableProps.pagination.total).toEqual(20);

    expect(hook.result.current.pagination.current).toEqual(1);
    expect(hook.result.current.pagination.pageSize).toEqual(10);
    expect(hook.result.current.pagination.total).toEqual(20);
  });

  it('should sorter, filters work', async () => {
    queryArgs = undefined;
    act(() => {
      hook = setUp(asyncFn, {
        paginated: true
      });
    });
    await hook.waitForNextUpdate();
    act(() => {
      hook.result.current.tableProps.onChange({
        current: 2,
        pageSize: 5,
      });
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.tableProps.pagination.current).toEqual(2);
    /* 改变 filter, sorter */
    act(() => {
      hook.result.current.tableProps.onChange(
        {
          current: 2,
          pageSize: 5,
        },
        { gender: ['male'] },
        { field: 'email', order: 'ascend' },
      );
    });
    await hook.waitForNextUpdate();
    expect(queryArgs.current).toEqual(2);
    expect(queryArgs.pageSize).toEqual(5);
    expect(queryArgs.sorter.field).toEqual('email');
    expect(queryArgs.sorter.order).toEqual('ascend');
    expect(queryArgs.filters.gender[0]).toEqual('male');
  });
});
