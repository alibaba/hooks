import { renderHook } from '@testing-library/react-hooks';
import useTable from '../src/index';
import service from './fixtures/service';
import sleep from './fixtures/sleep';

describe('useTable#options', () => {
  it('current', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const CURRENT = 2;
    const { result, waitForNextUpdate } = renderHook(() =>
      useTable(
        (params) => {
          expect(params).toEqual({ current: CURRENT, pageSize: 20 });
          return service({ dataSource, total: TOTAL });
        },
        { current: CURRENT },
      ),
    );

    await waitForNextUpdate();
    await waitForNextUpdate();
    expect(result.current.paginationProps.current).toEqual(CURRENT);
  });

  it('pageSize', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const PAGE_SIZE = 10;
    const { result, waitForNextUpdate } = renderHook(() =>
      useTable(
        (params) => {
          expect(params).toEqual({ current: 1, pageSize: PAGE_SIZE });
          return service({ dataSource, total: TOTAL });
        },
        { pageSize: PAGE_SIZE },
      ),
    );

    await waitForNextUpdate();
    await waitForNextUpdate();
    expect(result.current.paginationProps.pageSize).toEqual(PAGE_SIZE);
  });

  it('autoFirstQuery', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const { result } = renderHook(() =>
      useTable(() => service({ dataSource, total: TOTAL }), { autoFirstQuery: false }),
    );

    expect(result.current.tableProps.dataSource).toEqual([]);
    await sleep(2);
    expect(result.current.tableProps.dataSource).toEqual([]);
  });

  it('refreshDeps', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    let status = true;
    const { result, waitForNextUpdate, rerender } = renderHook(() =>
      useTable(() => service({ dataSource, total: TOTAL }), { refreshDeps: [status] }),
    );

    await waitForNextUpdate();
    await waitForNextUpdate();
    expect(result.current.tableProps.dataSource).toEqual(dataSource);

    rerender();
    await sleep(2);
    expect(result.current.tableProps.dataSource).toEqual(dataSource);

    status = false;
    dataSource[0].name = 'updated';
    rerender();
    await waitForNextUpdate();
    await waitForNextUpdate();
    expect(result.current.tableProps.dataSource[0].name).toEqual('updated');
  });
});
