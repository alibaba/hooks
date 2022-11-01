import { act, renderHook } from '@testing-library/react';
import useSelections from '../index';

const data = [1, 2, 3];

const setup = <T>(items: T[], defaultSelected?: T[]) => {
  return renderHook(() => useSelections(items, defaultSelected));
};

describe('useSelections', () => {
  it('defaultSelected should work correct', () => {
    const { result } = setup(data, [1]);
    expect(result.current.selected).toEqual([1]);
    expect(result.current.isSelected(1)).toEqual(true);
  });

  it('select and unSelect should work correct', () => {
    const { result } = setup(data, [1]);
    const { unSelect, select } = result.current;
    act(() => {
      unSelect(1);
    });
    expect(result.current.selected).toEqual([]);
    expect(result.current.isSelected(1)).toEqual(false);
    expect(result.current.allSelected).toEqual(false);
    act(() => {
      select(1);
    });
    expect(result.current.selected).toEqual([1]);
    expect(result.current.isSelected(1)).toEqual(true);
    expect(result.current.allSelected).toEqual(false);
  });

  it('toggle should work correct', () => {
    const { result } = setup(data);
    const { toggle } = result.current;
    act(() => {
      toggle(1);
    });
    expect(result.current.selected).toEqual([1]);
    expect(result.current.isSelected(1)).toEqual(true);
    expect(result.current.allSelected).toEqual(false);
    act(() => {
      toggle(1);
    });
    expect(result.current.selected).toEqual([]);
    expect(result.current.isSelected(1)).toEqual(false);
    expect(result.current.allSelected).toEqual(false);
  });

  it('selectAll and unSelectAll should work correct', async () => {
    const { result } = setup(data);
    const { selectAll, unSelectAll } = result.current;

    expect(result.current.noneSelected).toEqual(true);
    act(() => {
      selectAll();
    });
    expect(result.current.selected).toEqual([1, 2, 3]);
    expect(result.current.allSelected).toEqual(true);
    expect(result.current.noneSelected).toEqual(false);
    expect(result.current.partiallySelected).toEqual(false);

    act(() => {
      unSelectAll();
    });
    expect(result.current.selected).toEqual([]);
    expect(result.current.allSelected).toEqual(false);
    expect(result.current.noneSelected).toEqual(true);
    expect(result.current.partiallySelected).toEqual(false);
  });

  it('toggleAll should work correct', async () => {
    const { result } = setup(data);
    const { toggleAll } = result.current;
    expect(result.current.noneSelected).toEqual(true);
    act(() => {
      toggleAll();
    });
    expect(result.current.selected).toEqual([1, 2, 3]);
    expect(result.current.allSelected).toEqual(true);
    expect(result.current.noneSelected).toEqual(false);
    expect(result.current.partiallySelected).toEqual(false);

    act(() => {
      toggleAll();
    });
    expect(result.current.selected).toEqual([]);
    expect(result.current.allSelected).toEqual(false);
    expect(result.current.noneSelected).toEqual(true);
    expect(result.current.partiallySelected).toEqual(false);
  });

  it('setSelected should work correct', async () => {
    const { result } = setup(data);
    const { setSelected } = result.current;
    expect(result.current.noneSelected).toEqual(true);
    act(() => {
      setSelected([1]);
    });
    expect(result.current.selected).toEqual([1]);
    expect(result.current.isSelected(1)).toEqual(true);
    expect(result.current.noneSelected).toEqual(false);
    expect(result.current.allSelected).toEqual(false);
    expect(result.current.partiallySelected).toEqual(true);

    act(() => {
      setSelected([]);
    });
    expect(result.current.selected).toEqual([]);
    expect(result.current.isSelected(1)).toEqual(false);
    expect(result.current.noneSelected).toEqual(true);
    expect(result.current.allSelected).toEqual(false);
    expect(result.current.partiallySelected).toEqual(false);

    act(() => {
      setSelected([1, 2, 3]);
    });
    expect(result.current.selected).toEqual([1, 2, 3]);
    expect(result.current.isSelected(1)).toEqual(true);
    expect(result.current.noneSelected).toEqual(false);
    expect(result.current.allSelected).toEqual(true);
    expect(result.current.partiallySelected).toEqual(false);
  });
});
