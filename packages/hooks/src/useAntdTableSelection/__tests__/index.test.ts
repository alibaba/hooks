import { act, renderHook, waitFor } from '@testing-library/react';
import useAntdTableSelection from '../index';

const dataSource = [{ id: 0 }, { id: 1 }, { id: 2 }];

const setUp = (list, config?: Record<string, any>) =>
  renderHook(() => useAntdTableSelection(list, config));

let hook: any;

describe('useAntdTableSelection type default is checkbox', () => {
  it('should dataSource is undefined work', async () => {
    act(() => {
      hook = setUp(undefined, { rowKey: 'id' });
    });

    act(() => {
      hook.result.current.action.toggleAll();
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([]));
    await waitFor(() => expect(hook.result.current.state.selectedRows).toEqual([]));
  });

  it('should config is undefined work', async () => {
    act(() => {
      hook = setUp(dataSource);
    });

    act(() => {
      hook.result.current.action.toggleAll();
    });

    await waitFor(() => expect(dataSource.length).toBe(3));
    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([]));
  });

  it('should config.rowKey is undefined work', async () => {
    act(() => {
      hook = setUp(dataSource, {});
    });

    const { state, action } = hook.result.current;

    act(() => {
      hook.result.current.action.toggleAll();
    });

    await waitFor(() => expect(state.selectedRowKeys).toEqual([undefined, undefined, undefined]));
    await waitFor(() => expect(state.allSelected).toBe(false));

    act(() => {
      action.toggleAll();
    });

    await waitFor(() => expect(state.allSelected).toBe(false));
    await waitFor(() => expect(state.selectedRowKeys).toEqual([]));
  });

  it('should config.rowKey is undefined but dataSource has key work', async () => {
    act(() => {
      hook = setUp(dataSource.map((t, idx) => ({ ...t, key: idx + '__key__' })));
    });

    act(() => {
      hook.result.current.action.toggleAll();
    });

    await waitFor(() =>
      expect(hook.result.current.state.selectedRowKeys).toEqual([
        '0__key__',
        '1__key__',
        '2__key__',
      ]),
    );

    await waitFor(() => expect(hook.result.current.state.allSelected).toBe(true));

    act(() => {
      hook.result.current.action.toggleAll();
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([]));
    await waitFor(() => expect(hook.result.current.state.allSelected).toBe(false));
  });

  it('should config.rowKey is function work', async () => {
    act(() => {
      hook = setUp(dataSource, {
        rowKey: (row) => row.id,
      });
    });

    act(() => {
      hook.result.current.action.toggleAll();
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([0, 1, 2]));
    await waitFor(() => expect(hook.result.current.state.allSelected).toBe(true));

    act(() => {
      hook.result.current.action.toggleAll();
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([]));
    await waitFor(() => expect(hook.result.current.state.allSelected).toBe(false));
  });

  it('should config.rowKey is function and args[1] is index(in table dataSource) case1 work', async () => {
    act(() => {
      hook = setUp(dataSource, {
        rowKey: (row, idx) => row.id + idx,
      });
    });

    act(() => {
      hook.result.current.action.toggleAll();
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([0, 2, 4]));
  });

  it('should config.rowKey is function and args[1] is index(in table dataSource) case2 work', async () => {
    act(() => {
      hook = setUp(dataSource, {
        rowKey: (row, idx) => `${row.id}_${idx + 1}`,
      });
    });

    act(() => {
      hook.result.current.action.toggleAll();
    });

    await waitFor(() =>
      expect(hook.result.current.state.selectedRowKeys).toEqual(['0_1', '1_2', '2_3']),
    );
  });

  it('should config.rowKey is function and args[1] is index(in table dataSource), than disabled is function, work', async () => {
    act(() => {
      hook = setUp(dataSource, {
        rowKey: (row, idx) => row.id + idx,
        disabled: (row) => row.id === 2,
      });
    });

    act(() => {
      hook.result.current.action.toggleAll();
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([0, 2]));
  });

  it('should config.rowKey is string work', async () => {
    act(() => {
      hook = setUp(dataSource, {
        rowKey: 'id',
      });
    });

    act(() => {
      hook.result.current.action.toggleAll();
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([0, 1, 2]));
    await waitFor(() => expect(hook.result.current.state.allSelected).toBe(true));

    act(() => {
      hook.result.current.action.toggleAll();
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([]));
    await waitFor(() => expect(hook.result.current.state.allSelected).toBe(false));
  });

  it('should config.disabled is true', async () => {
    act(() => {
      hook = setUp(dataSource, {
        rowKey: 'id',
        disabled: true,
      });
    });

    act(() => {
      hook.result.current.action.toggleAll();
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([]));
    await waitFor(() => expect(hook.result.current.state.allSelected).toBe(false));

    act(() => {
      hook.result.current.action.setSelected([0, 1, 2]);
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([]));
    await waitFor(() => expect(hook.result.current.state.allSelected).toBe(false));
  });

  it('should config.disabled is true but has config.getCheckboxProps return disabled false', async () => {
    act(() => {
      hook = setUp(dataSource, {
        rowKey: 'id',
        disabled: true,
        getCheckboxProps: () => ({ disabled: false }),
      });
    });

    act(() => {
      hook.result.current.action.toggleAll();
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([0, 1, 2]));
    await waitFor(() => expect(hook.result.current.state.allSelected).toBe(true));

    act(() => {
      hook.result.current.action.setSelected([0, 1]);
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([0, 1]));
    await waitFor(() => expect(hook.result.current.state.allSelected).toBe(false));
  });

  it('should toogle work', async () => {
    act(() => {
      hook = setUp(dataSource, {
        rowKey: 'id',
      });
    });

    act(() => {
      hook.result.current.action.toggle(dataSource[0]);
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([0]));
  });

  it('should select/toggle data other than list work', async () => {
    act(() => {
      hook = setUp(dataSource, {
        rowKey: 'id',
      });
    });

    act(() => {
      hook.result.current.action.toggle({ id: 4 });
      hook.result.current.action.toggle({ id: 5 });
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([]));

    act(() => {
      hook.result.current.action.select({ id: 4 });
      hook.result.current.action.select({ id: 5 });
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([]));
  });

  it('should setSelected work', async () => {
    act(() => {
      hook = setUp(dataSource, { rowKey: 'id' });
    });

    act(() => {
      hook.result.current.action.setSelected(dataSource.map((t) => t.id));
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([0, 1, 2]));

    act(() => {
      hook.result.current.action.unSelect(dataSource[0]);
      hook.result.current.action.unSelect(dataSource[1]);
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([2]));

    act(() => {
      hook.result.current.action.unSelectAll();
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([]));
  });
});

describe('useAntdTableSelection type is radio', () => {
  it('should config.type is radio then call action.setSelected/action.toggleAll/action.selectAll/ work', async () => {
    act(() => {
      hook = setUp(dataSource, { rowKey: 'id', type: 'radio' });
    });

    act(() => {
      hook.result.current.action.setSelected(dataSource.map((t) => t.id));
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([0]));

    act(() => {
      hook.result.current.action.toggleAll();
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([0]));

    act(() => {
      hook.result.current.action.selectAll();
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([0]));
    await waitFor(() => expect(hook.result.current.action.isSelected(dataSource[0])).toBe(true));

    act(() => {
      hook.result.current.action.unSelectAll();
    });

    await waitFor(() => expect(hook.result.current.state.selectedRowKeys).toEqual([]));
  });
});
