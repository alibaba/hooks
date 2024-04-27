import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import useSelections from '../index';
import type { Options } from '../index';

const _data = [1, 2, 3];
const _selected = [1];
const _selectedItem = 1;

const _dataObj = [{ id: 1 }, { id: 2 }, { id: 3 }];
const _selectedObj = [{ id: 1 }];
const _selectedItemObj = { id: 1 };

const setup = <T>(items: T[], options?: T[] | Options<T>) => {
  return renderHook(() => useSelections(items, options));
};

interface CaseCallback<T = number | object> {
  (data: T[], selected: T[], selectedItem: T): void;
}

const runCaseCallback = (
  dataCallback: CaseCallback<number>,
  objDataCallback: CaseCallback<object>,
) => {
  dataCallback(_data, _selected, _selectedItem);
  objDataCallback(_dataObj, _selectedObj, _selectedItemObj);
};

describe('useSelections', () => {
  it('defaultSelected should work correct', () => {
    const caseCallback: CaseCallback = (data, selected, selectedItem) => {
      const { result } = setup(data, {
        defaultSelected: selected,
        itemKey: 'id',
      });

      expect(result.current.selected).toEqual(selected);
      expect(result.current.isSelected(selectedItem)).toBe(true);
    };

    runCaseCallback(caseCallback, caseCallback);
  });

  it('select and unSelect should work correct', () => {
    const caseCallback: CaseCallback = (data, selected, selectedItem) => {
      const { result } = setup(data, {
        defaultSelected: selected,
        itemKey: 'id',
      });
      const { unSelect, select } = result.current;

      act(() => {
        unSelect(selectedItem);
      });
      expect(result.current.selected).toEqual([]);
      expect(result.current.isSelected(selectedItem)).toBe(false);
      expect(result.current.allSelected).toBe(false);

      act(() => {
        select(selectedItem);
      });
      expect(result.current.selected).toEqual(selected);
      expect(result.current.isSelected(selectedItem)).toBe(true);
      expect(result.current.allSelected).toBe(false);
    };

    runCaseCallback(caseCallback, caseCallback);
  });

  it('toggle should work correct', () => {
    const caseCallback: CaseCallback = (data, selected, selectedItem) => {
      const { result } = setup(data, {
        itemKey: 'id',
      });
      const { toggle } = result.current;

      act(() => {
        toggle(selectedItem);
      });
      expect(result.current.selected).toEqual(selected);
      expect(result.current.isSelected(selectedItem)).toBe(true);
      expect(result.current.allSelected).toBe(false);

      act(() => {
        toggle(selectedItem);
      });
      expect(result.current.selected).toEqual([]);
      expect(result.current.isSelected(selectedItem)).toBe(false);
      expect(result.current.allSelected).toBe(false);
    };

    runCaseCallback(caseCallback, caseCallback);
  });

  it('selectAll and unSelectAll should work correct', async () => {
    const caseCallback: CaseCallback = (data) => {
      const { result } = setup(data, {
        itemKey: 'id',
      });
      const { selectAll, unSelectAll } = result.current;

      expect(result.current.noneSelected).toBe(true);
      act(() => {
        selectAll();
      });
      expect(result.current.selected).toEqual(data);
      expect(result.current.allSelected).toBe(true);
      expect(result.current.noneSelected).toBe(false);
      expect(result.current.partiallySelected).toBe(false);

      act(() => {
        unSelectAll();
      });
      expect(result.current.selected).toEqual([]);
      expect(result.current.allSelected).toBe(false);
      expect(result.current.noneSelected).toBe(true);
      expect(result.current.partiallySelected).toBe(false);
    };

    runCaseCallback(caseCallback, caseCallback);
  });

  it('toggleAll should work correct', async () => {
    const caseCallback: CaseCallback = (data) => {
      const { result } = setup(data, {
        itemKey: 'id',
      });
      const { toggleAll } = result.current;

      expect(result.current.noneSelected).toBe(true);
      act(() => {
        toggleAll();
      });
      expect(result.current.selected).toEqual(data);
      expect(result.current.allSelected).toBe(true);
      expect(result.current.noneSelected).toBe(false);
      expect(result.current.partiallySelected).toBe(false);

      act(() => {
        toggleAll();
      });
      expect(result.current.selected).toEqual([]);
      expect(result.current.allSelected).toBe(false);
      expect(result.current.noneSelected).toBe(true);
      expect(result.current.partiallySelected).toBe(false);
    };

    runCaseCallback(caseCallback, caseCallback);
  });

  it('setSelected should work correct', async () => {
    const caseCallback: CaseCallback = (data, selected, selectedItem) => {
      const { result } = setup(data, {
        itemKey: 'id',
      });
      const { setSelected } = result.current;

      expect(result.current.noneSelected).toBe(true);
      act(() => {
        setSelected(selected);
      });
      expect(result.current.selected).toEqual(selected);
      expect(result.current.isSelected(selectedItem)).toBe(true);
      expect(result.current.noneSelected).toBe(false);
      expect(result.current.allSelected).toBe(false);
      expect(result.current.partiallySelected).toBe(true);

      act(() => {
        setSelected([]);
      });
      expect(result.current.selected).toEqual([]);
      expect(result.current.isSelected(selectedItem)).toBe(false);
      expect(result.current.noneSelected).toBe(true);
      expect(result.current.allSelected).toBe(false);
      expect(result.current.partiallySelected).toBe(false);

      act(() => {
        setSelected(data);
      });
      expect(result.current.selected).toEqual(data);
      expect(result.current.isSelected(selectedItem)).toBe(true);
      expect(result.current.noneSelected).toBe(false);
      expect(result.current.allSelected).toBe(true);
      expect(result.current.partiallySelected).toBe(false);
    };

    runCaseCallback(caseCallback, caseCallback);
  });

  it('legacy parameter should work in <4.0', async () => {
    const { result } = setup(_data, _selected);

    expect(result.current.selected).toEqual(_selected);
    expect(result.current.isSelected(_selectedItem)).toBe(true);
  });

  it('clearAll should work correct', async () => {
    const runCase = (data, newData, remainData) => {
      const { result } = renderHook(() => {
        const [list, setList] = useState(data);
        const hook = useSelections(list, {
          itemKey: 'id',
        });

        return { setList, hook };
      });
      const { setSelected, unSelectAll, clearAll } = result.current.hook;

      act(() => {
        setSelected(data);
      });
      expect(result.current.hook.selected).toEqual(data);
      expect(result.current.hook.allSelected).toBe(true);

      act(() => {
        result.current.setList(newData);
      });
      expect(result.current.hook.allSelected).toBe(false);

      act(() => {
        unSelectAll();
      });
      expect(result.current.hook.selected).toEqual(remainData);

      act(() => {
        clearAll();
      });
      expect(result.current.hook.selected).toEqual([]);
      expect(result.current.hook.allSelected).toEqual(false);
      expect(result.current.hook.noneSelected).toBe(true);
      expect(result.current.hook.partiallySelected).toBe(false);
    };

    runCase(_data, [3, 4, 5], [1, 2]);
    runCase(_dataObj, [{ id: 3 }, { id: 4 }, { id: 5 }], [{ id: 1 }, { id: 2 }]);
  });
});
