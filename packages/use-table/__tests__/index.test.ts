import { renderHook } from '@testing-library/react-hooks';
import useTable from '../src/index';
import service from './fixtures/service';

describe('useTable', () => {
  it('default', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const { result, waitForNextUpdate } = renderHook(() =>
      useTable(() => service({ dataSource, total: TOTAL })),
    );
    expect(result.current.tableProps.loading).toEqual(false);
    expect(result.current.tableProps.dataSource).toEqual([]);

    await waitForNextUpdate();
    expect(result.current.tableProps.loading).toEqual(true);
    expect(result.current.tableProps.dataSource).toEqual([]);

    await waitForNextUpdate();
    expect(result.current.tableProps.loading).toEqual(false);
    expect(result.current.tableProps.dataSource).toEqual(dataSource);
    expect(result.current.paginationProps.current).toEqual(1);
    expect(result.current.paginationProps.pageSize).toEqual(20);
    expect(result.current.paginationProps.total).toEqual(TOTAL);
  });
});
