import { renderHook } from '@testing-library/react-hooks';
import useNoFormTable from '../index';

const handleReset = jest.fn();

interface Query {
  current: number;
  pageSize: number;
  sorter?: any;

  [key: string]: any;
}

describe('useNoFormTable', () => {
  describe('basic', () => {
    const asyncFn = () => {
      return Promise.resolve({
        total: 20,
        list: [],
      });
    };

    let hook: any;

    it('should fetch after first render', async () => {
      hook = renderHook(() => useNoFormTable(asyncFn, {}));
      expect(hook.result.current.tableProps.loading).toEqual(true);
      await hook.waitForNextUpdate();

      expect(hook.result.current.tableProps.loading).toEqual(false);
      expect(hook.result.current.tableProps.pagination.current).toEqual(1);
      expect(hook.result.current.tableProps.pagination.pageSize).toEqual(10);
      expect(hook.result.current.tableProps.pagination.total).toEqual(20);
      hook.unmount();
    });

    it('should reset work', async () => {
      hook = renderHook(() =>
        useNoFormTable(asyncFn, { defaultPageSize: 5, onReset: handleReset }),
      );

      hook.result.current.tableProps.onChange({
        current: 2,
        pageSize: 5,
      });
      await hook.waitForNextUpdate();
      expect(hook.result.current.tableProps.pagination.current).toEqual(2);
      expect(hook.result.current.tableProps.pagination.pageSize).toEqual(5);

      hook.result.current.search.reset();

      await hook.waitForNextUpdate();
      expect(hook.result.current.tableProps.pagination.current).toEqual(1);
      expect(hook.result.current.tableProps.pagination.pageSize).toEqual(5);
      hook.unmount();
    });

    it('should onReset work', async () => {
      hook = renderHook(() => useNoFormTable(asyncFn, { onReset: handleReset }));

      await hook.waitForNextUpdate();
      expect(handleReset).toHaveBeenCalledTimes(0);

      hook.result.current.search.reset();

      await hook.waitForNextUpdate();
      expect(handleReset).toHaveBeenCalledTimes(1);
      hook.unmount();
    });

    it('should submit work', async () => {
      hook = renderHook(() => useNoFormTable(asyncFn, { defaultPageSize: 5 }));

      await hook.waitForNextUpdate();

      hook.result.current.search.submit();

      await hook.waitForNextUpdate();
      expect(hook.result.current.tableProps.pagination.current).toEqual(1);
      expect(hook.result.current.tableProps.pagination.pageSize).toEqual(5);

      hook.unmount();
    });
  });

  describe('advanced', () => {
    let queryArgs: any;
    const asyncFn = (query: Query, formData: any = {}) => {
      queryArgs = { ...query, ...formData };
      return Promise.resolve({
        total: 20,
        list: [],
      });
    };

    let hook: any;

    it('should defaultParams work', async () => {
      hook = renderHook(() =>
        useNoFormTable(asyncFn, {
          defaultParams: [
            {
              current: 1,
              pageSize: 5,
            },
            { name: 'hello', phone: '123' },
          ],
        }),
      );

      await hook.waitForNextUpdate();
      expect(queryArgs).toEqual({ current: 1, pageSize: 5, name: 'hello', phone: '123' });

      hook.result.current.tableProps.onChange({
        current: 2,
        pageSize: 5,
      });
      await hook.waitForNextUpdate();
      expect(queryArgs).toEqual({ current: 2, pageSize: 5, name: 'hello', phone: '123' });

      hook.unmount();
    });

    it('should customForm work', async () => {
      hook = renderHook(() =>
        useNoFormTable(asyncFn, {
          defaultParams: [{ current: 1, pageSize: 5 }, { rate: 3 }],
        }),
      );

      //手动改变表单值并搜索生效
      hook.result.current.search.submit({ rate: 5 });

      await hook.waitForNextUpdate();
      expect(queryArgs).toEqual({ current: 1, pageSize: 5, rate: 5 });

      hook.unmount();
    });

    //设置isResetSorter，重置时回恢复默认排序
    it('should isResetSorter work', async () => {
      hook = renderHook(() =>
        useNoFormTable(asyncFn, {
          isResetSorter: true,
          defaultParams: [
            {
              current: 2,
              pageSize: 5,
              sorter: {
                order: 'ascend',
                field: 'phone',
              },
            },
          ],
        }),
      );

      //点击表格排序
      hook.result.current.tableProps.onChange(
        {
          current: 2,
          pageSize: 5,
        },
        null,
        {
          order: 'descend',
          field: 'phone',
        },
      );
      await hook.waitForNextUpdate();
      expect(hook.result.current.params?.[0]?.sorter?.order).toEqual('descend');

      //点击搜索不重置排序
      hook.result.current.search.submit();
      await hook.waitForNextUpdate();
      expect(hook.result.current.params?.[0]?.sorter?.order).toEqual('descend');

      //点击重置，因为配置了isResetSorter，会回到默认排序
      hook.result.current.search.reset();
      await hook.waitForNextUpdate();
      expect(hook.result.current.params?.[0]?.sorter?.order).toEqual('ascend');
      expect(hook.result.current.params?.[0]?.sorter?.field).toEqual('phone');

      hook.unmount();
    });
  });
});
