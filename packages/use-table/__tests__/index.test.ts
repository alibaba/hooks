import { renderHook, act } from '@testing-library/react-hooks';
import useTable from '../src/index';
import service from './fixtures/service';

describe('useTable#basic', () => {
  it('default', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const { result, waitForNextUpdate } = renderHook(() =>
      useTable((params) => {
        expect(params).toEqual({ current: 1, pageSize: 20 });
        return service({ dataSource, total: TOTAL });
      }),
    );
    expect(result.current.tableProps.loading).toEqual(false);
    expect(result.current.tableProps.dataSource).toEqual([]);

    // Loading
    await waitForNextUpdate();
    expect(result.current.tableProps.loading).toEqual(true);
    expect(result.current.tableProps.dataSource).toEqual([]);

    // Response
    await waitForNextUpdate();
    expect(result.current.tableProps.loading).toEqual(false);
    expect(result.current.tableProps.dataSource).toEqual(dataSource);
    expect(result.current.paginationProps.current).toEqual(1);
    expect(result.current.paginationProps.pageSize).toEqual(20);
    expect(result.current.paginationProps.total).toEqual(TOTAL);
  });

  it('pagination change', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const params = { current: 1, pageSize: 20 };
    const { result, waitForNextUpdate } = renderHook(() =>
      useTable((p) => {
        expect(p).toEqual(params);
        return service({ dataSource });
      }),
    );
    // Loading
    await waitForNextUpdate();
    // Response
    await waitForNextUpdate();

    // Click second page
    const { onChange } = result.current.paginationProps;
    params.current = 2;
    act(() => {
      onChange(params.current);
    });
    await waitForNextUpdate();
    await waitForNextUpdate();
    expect(result.current.paginationProps.current).toEqual(2);
    expect(result.current.paginationProps.pageSize).toEqual(20);
  });

  it('pagination pageSize change', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const params = { current: 1, pageSize: 20 };
    const { result, waitForNextUpdate } = renderHook(() =>
      useTable((p) => {
        expect(p).toEqual(params);
        return service({ dataSource });
      }),
    );
    // Loading
    await waitForNextUpdate();
    // Response
    await waitForNextUpdate();

    const { onChange } = result.current.paginationProps;
    params.current = 2;
    act(() => {
      onChange(params.current);
    });
    await waitForNextUpdate();
    await waitForNextUpdate();

    const { onPageSizeChange } = result.current.paginationProps;
    params.pageSize = 10;
    params.current = 1;
    act(() => {
      onPageSizeChange(params.pageSize);
    });
    await waitForNextUpdate();
    await waitForNextUpdate();
    // it will reset current when change pageSize
    expect(result.current.paginationProps.current).toEqual(1);
    expect(result.current.paginationProps.pageSize).toEqual(10);
  });
});
