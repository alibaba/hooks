import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useTable, { Obj } from '../src/index';
import service from './fixtures/service';

describe('useTable#plugin', () => {
  it('middlewares', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const updatedDataSource = [{ name: 'updated' }];
    const TOTAL = 25;
    const plugin = {
      middlewares: (ctx, next) => {
        expect(ctx.params).toEqual({ current: 1, pageSize: 20 });
        return next().then(() => {
          ctx.response.data.dataSource = updatedDataSource;
        });
      },
    };
    const { waitForNextUpdate, result } = renderHook(() =>
      useTable(() => service({ dataSource, total: TOTAL }), { plugins: [plugin] }),
    );

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.tableProps.dataSource).not.toEqual(dataSource);
    expect(result.current.tableProps.dataSource).toEqual(updatedDataSource);
  });

  it('tableProps', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const plugin = {
      props: {
        tableProps: { isTree: true },
      },
    };
    const plugin1 = {
      props: {
        tableProps: { isZebra: true },
      },
    };
    const { waitForNextUpdate, result } = renderHook(() =>
      useTable(() => service({ dataSource, total: TOTAL }), { plugins: [plugin, plugin1] }),
    );

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect((result.current.tableProps as Obj).isTree).toEqual(true);
    expect((result.current.tableProps as Obj).isZebra).toEqual(true);
  });

  it('paginationProps', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const plugin = {
      props: {
        paginationProps: { pageSizeSelector: 'dropdown' },
      },
    };
    const { waitForNextUpdate, result } = renderHook(() =>
      useTable(() => service({ dataSource, total: TOTAL }), { plugins: [plugin] }),
    );

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect((result.current.paginationProps as Obj).pageSizeSelector).toEqual('dropdown');
  });

  it('external props', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const plugin = {
      props: {
        test: true,
      },
    };
    const { waitForNextUpdate, result } = renderHook(() =>
      useTable(() => service({ dataSource, total: TOTAL }), { plugins: [plugin] }),
    );

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.test).toEqual(true);
  });

  it('function props', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const plugin = {
      props: () => ({
        test: true,
      }),
    };
    const { waitForNextUpdate, result } = renderHook(() =>
      useTable(() => service({ dataSource, total: TOTAL }), { plugins: [plugin] }),
    );

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.test).toEqual(true);
  });

  it('all', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const usePlugin = () => {
      const [state, setState] = useState(true);
      return {
        props: {
          state,
          setState,
        },
      };
    };
    const { waitForNextUpdate, result } = renderHook(() => {
      const plugin = usePlugin();
      return useTable(() => service({ dataSource, total: TOTAL }), { plugins: [plugin] });
    });

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.state).toEqual(true);
    act(() => {
      result.current.setState(false);
    });
    expect(result.current.state).toEqual(false);
  });
});
