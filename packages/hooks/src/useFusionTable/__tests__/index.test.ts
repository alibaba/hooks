import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useFusionTable, { BaseOptions, Result } from '../index';

interface Query {
  current: number;
  pageSize: number;
  [key: string]: any;
}

describe('useFusionTable', () => {
  const originalError = console.error;
  beforeEach(() => {
    // jest.useFakeTimers();
    console.error = (...args: any) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return;
      }
      originalError.call(console, ...args);
    };
  });
  afterEach(() => {
    changeSearchType('simple');
    jest.useRealTimers();
    console.error = originalError;
  });
  // jest.useFakeTimers();
  let queryArgs: any;
  const asyncFn = (query: Query, formData: any = {}) => {
    queryArgs = { ...query, ...formData };
    return Promise.resolve({
      current: query.current,
      total: 20,
      pageSize: query.pageSize,
      data: [],
    });
  };

  let searchType = 'simple';

  const field: any = {
    initialValue: {
      name: 'default name',
    },
    fieldsValue: {
      name: 'default name',
    },
    getValues: () => field.fieldsValue || {},
    getNames: () => {
      // 根据不同的 type 返回不同的 fieldsValues
      if (searchType === 'simple') {
        return ['name'];
      }
      return ['name', 'email', 'phone'];
    },
    setValues: (values: object) => {
      field.fieldsValue = {
        ...field.fieldsValue,
        ...values,
      };
    },
    reset: () => {
      field.fieldsValue = { ...field.initialValue };
    },
    validate: (callback) => {
      callback(null);
    },
  };

  const changeSearchType = (type: any) => {
    searchType = type;
  };

  const setUp = ({ asyncFn: fn, options }: any) => renderHook(() => useFusionTable(fn, options));

  let hook: RenderHookResult<
    { func: (...args: any[]) => Promise<{}>; opt: BaseOptions<any> },
    Result<any>
  >;

  it('should be defined', () => {
    expect(useFusionTable).toBeDefined();
  });

  it('should fetch after first render', async () => {
    queryArgs = undefined;
    act(() => {
      hook = setUp({
        asyncFn,
        options: { field },
      });
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.tableProps.loading).toEqual(false);
    expect(hook.result.current.paginationProps.current).toEqual(1);
    expect(hook.result.current.paginationProps.pageSize).toEqual(10);
    expect(hook.result.current.paginationProps.total).toEqual(20);
    expect(queryArgs.name).toEqual('default name');
  });
  it('should form, defaultPageSize, id work', async () => {
    queryArgs = undefined;
    act(() => {
      hook = setUp({
        asyncFn,
        options: { field, defaultPageSize: 5, cacheKey: 'tableId' },
      });
    });
    await hook.waitForNextUpdate();
    const { search } = hook.result.current;
    expect(hook.result.current.tableProps.loading).toEqual(false);
    expect(queryArgs.current).toEqual(1);
    expect(queryArgs.pageSize).toEqual(5);
    // expect(queryArgs.name).toEqual('default name');
    expect(search).toBeDefined();
    if (search) {
      expect(search.type).toEqual('simple');
    }

    // /* 切换 分页 */
    hook.result.current.paginationProps.onChange(2);
    hook.result.current.paginationProps.onPageSizeChange(5);

    await hook.waitForNextUpdate();
    expect(queryArgs.current).toEqual(2);
    expect(queryArgs.pageSize).toEqual(5);
    // expect(queryArgs.name).toEqual('default name');

    /* 改变 name， 提交表单 */
    field.fieldsValue.name = 'change name';
    act(() => {
      if (search) {
        search.submit();
      }
    });
    await hook.waitForNextUpdate();

    expect(queryArgs.current).toEqual(1);
    expect(queryArgs.pageSize).toEqual(5);
    expect(queryArgs.name).toEqual('change name');

    // /* 切换 searchType 到 advance */
    act(() => {
      if (search) {
        search.changeType();
        changeSearchType('advance');
      }
    });
    if (hook.result.current.search) {
      expect(hook.result.current.search.type).toEqual('advance');
    }
    act(() => {
      if (hook.result.current.search) {
        hook.result.current.search.submit();
      }
    });
    await hook.waitForNextUpdate();

    expect(queryArgs.current).toEqual(1);
    expect(queryArgs.name).toEqual('change name');

    // /* 手动改变其他两个字段的值 */
    field.fieldsValue.phone = '13344556677';
    field.fieldsValue.email = 'x@qq.com';

    act(() => {
      if (hook.result.current.search) {
        hook.result.current.search.submit();
      }
    });
    await hook.waitForNextUpdate();
    expect(queryArgs.current).toEqual(1);
    expect(queryArgs.name).toEqual('change name');
    expect(queryArgs.phone).toEqual('13344556677');
    expect(queryArgs.email).toEqual('x@qq.com');

    // /* 改变 name，但是不提交，切换到 simple 去 */
    field.fieldsValue.name = 'change name 2';
    act(() => {
      if (hook.result.current.search) {
        hook.result.current.search.changeType();
        changeSearchType('simple');
      }
    });

    if (hook.result.current.search) {
      expect(hook.result.current.search.type).toEqual('simple');
    }
    expect(field.fieldsValue.name).toEqual('change name 2');

    // /* 提交 */
    act(() => {
      if (hook.result.current.search) {
        hook.result.current.search.submit();
      }
    });
    await hook.waitForNextUpdate();

    expect(queryArgs.name).toEqual('change name 2');
    expect(queryArgs.phone).toBeUndefined();
    expect(queryArgs.email).toBeUndefined();

    // /* 切换回 advance，恢复之前的条件 */
    act(() => {
      if (hook.result.current.search) {
        hook.result.current.search.changeType();
      }
      changeSearchType('advance');
    });

    if (hook.result.current.search) {
      expect(hook.result.current.search.type).toEqual('advance');
    }
    expect(field.fieldsValue.name).toEqual('change name 2');
    expect(field.fieldsValue.phone).toEqual('13344556677');
    expect(field.fieldsValue.email).toEqual('x@qq.com');

    act(() => {
      hook.result.current.paginationProps.onPageSizeChange(5);
      hook.result.current.paginationProps.onChange(3);
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.paginationProps.current).toEqual(3);
    // /* 卸载重装 */
    field.fieldsValue = {
      name: '',
      phone: '',
      email: '',
    };
    act(() => {
      hook.unmount();
    });
    act(() => {
      hook = setUp({
        asyncFn,
        options: { field, defaultPageSize: 5, cacheKey: 'tableId' },
      });
    });
    await hook.waitForNextUpdate();
    if (hook.result.current.search) {
      expect(hook.result.current.search.type).toEqual('simple');
    }
    expect(hook.result.current.paginationProps.current).toEqual(3);
    expect(field.fieldsValue.name).toEqual('change name 2');
    expect(field.fieldsValue.phone).toEqual('13344556677');
    expect(field.fieldsValue.email).toEqual('x@qq.com');

    /* refresh */
    act(() => {
      hook.result.current.refresh();
    });
    expect(hook.result.current.tableProps.loading).toEqual(true);
    await hook.waitForNextUpdate();
    /* reset */
    act(() => {
      if (hook.result.current.search) {
        hook.result.current.search.reset();
      }
    });

    expect(field.fieldsValue.name).toEqual('default name');
    expect(field.fieldsValue.phone).toBeUndefined();
    expect(field.fieldsValue.email).toBeUndefined();
  });

  it('should defaultParams work', async () => {
    queryArgs = undefined;
    changeSearchType('advance');
    act(() => {
      hook = setUp({
        asyncFn,
        options: {
          field,
          defaultParams: [
            {
              current: 2,
              pageSize: 10,
            },
            { name: 'hello', phone: '123' },
          ],
          defaultType: 'advance',
        },
      });
    });
    await hook.waitForNextUpdate();
    const { search } = hook.result.current;
    expect(hook.result.current.tableProps.loading).toEqual(false);
    expect(queryArgs.current).toEqual(2);
    expect(queryArgs.pageSize).toEqual(10);
    expect(queryArgs.name).toEqual('hello');
    expect(queryArgs.phone).toEqual('123');
    expect(search).toBeDefined();
    if (search) {
      expect(search.type).toEqual('advance');
    }
  });
});
