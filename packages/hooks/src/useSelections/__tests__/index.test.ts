import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';
import useSelections from '../index';

const data = [1, 2, 3];

describe('useSelections', () => {
  it('should be defined', () => {
    expect(useSelections).toBeDefined();
  });

  function useTestUseSelections() {
    const [items, setItems] = useState(data);
    const useSelectionsResult = useSelections(items, [1], [2]);
    return [useSelectionsResult, setItems] as const;
  }

  const setUp = () => renderHook(() => useTestUseSelections());

  const hookUtils = (hook: ReturnType<typeof setUp>) => {
    const { current } = hook.result;
    return {
      seleected: current[0].selected,
      helper: current[0],
      setItems: current[1],
    };
  };

  describe('test helper ', () => {
    const hook = setUp();
    afterEach(() => {
      hookUtils(hook).helper.setSelected([1]);
      hookUtils(hook).helper.setDisabled([2]);
    });
    it('defaultSelected should work correct', async () => {
      expect(hookUtils(hook).seleected).toEqual([1]);
      expect(hookUtils(hook).helper.isSelected(1)).toEqual(true);
    });
    it('defaultDisabled should work correct', async () => {
      act(() => {
        hookUtils(hook).helper.select(2);
      });
      expect(hookUtils(hook).seleected).toEqual([1]);
      expect(hookUtils(hook).helper.isSelected(2)).toEqual(false);
      act(() => {
        hookUtils(hook).helper.toggle(2);
      });
      expect(hookUtils(hook).helper.isSelected(2)).toEqual(false);
    });
    it('disable should work correct', async () => {
      act(() => {
        hookUtils(hook).helper.disable(3);
        hookUtils(hook).helper.select(3);
        hookUtils(hook).helper.select(1);
        hookUtils(hook).helper.disable(1);
        hookUtils(hook).helper.unSelect(1);
      });
      expect(hookUtils(hook).helper.isSelected(1)).toEqual(true);
      expect(hookUtils(hook).helper.isSelected(3)).toEqual(false);
      act(() => {
        hookUtils(hook).helper.toggleAll();
      });
      expect(hookUtils(hook).helper.isSelected(3)).toEqual(false);
      act(() => {
        hookUtils(hook).helper.selectAll();
      });
      expect(hookUtils(hook).helper.isSelected(3)).toEqual(false);
    });
    it('enable should work correct', async () => {
      act(() => {
        hookUtils(hook).helper.enable(2);
        hookUtils(hook).helper.select(2);
      });
      expect(hookUtils(hook).helper.isSelected(2)).toEqual(true);
    });

    it('isdisable and disable should work correct', async () => {
      expect(hookUtils(hook).helper.isDisabled(2)).toEqual(true);
      act(() => {
        hookUtils(hook).helper.disable(3);
      });
      expect(hookUtils(hook).helper.isDisabled(3)).toEqual(true);
    });
    it('select and unSelect should work correct', async () => {
      act(() => {
        hookUtils(hook).helper.unSelect(1);
      });
      expect(hookUtils(hook).seleected).toEqual([]);
      expect(hookUtils(hook).helper.isSelected(1)).toEqual(false);
      expect(hookUtils(hook).helper.allSelected).toEqual(false);
      act(() => {
        hookUtils(hook).helper.select(1);
      });
      expect(hookUtils(hook).seleected).toEqual([1]);
      expect(hookUtils(hook).helper.isSelected(1)).toEqual(true);
      expect(hookUtils(hook).helper.allSelected).toEqual(false);
      act(() => {
        hookUtils(hook).helper.unSelect(1);
      });
    });

    it('toggle should work correct', async () => {
      act(() => {
        hookUtils(hook).helper.toggle(1);
      });
      expect(hookUtils(hook).seleected).toEqual([]);
      expect(hookUtils(hook).helper.isSelected(1)).toEqual(false);
      expect(hookUtils(hook).helper.allSelected).toEqual(false);
      act(() => {
        hookUtils(hook).helper.toggle(1);
      });
      expect(hookUtils(hook).seleected).toEqual([1]);
      expect(hookUtils(hook).helper.isSelected(1)).toEqual(true);
      expect(hookUtils(hook).helper.allSelected).toEqual(false);
    });

    it('selectAll and unSelectAll should work correct', async () => {
      expect(hookUtils(hook).helper.noneSelected).toEqual(false);
      act(() => {
        hookUtils(hook).helper.enable(2);
        hookUtils(hook).helper.selectAll();
      });
      expect(hookUtils(hook).seleected).toEqual([1, 2, 3]);
      expect(hookUtils(hook).helper.allSelected).toEqual(true);
      expect(hookUtils(hook).helper.noneSelected).toEqual(false);
      expect(hookUtils(hook).helper.partiallySelected).toEqual(false);

      act(() => {
        hookUtils(hook).helper.unSelectAll();
      });
      expect(hookUtils(hook).seleected).toEqual([]);
      expect(hookUtils(hook).helper.allSelected).toEqual(false);
      expect(hookUtils(hook).helper.noneSelected).toEqual(true);
      expect(hookUtils(hook).helper.partiallySelected).toEqual(false);
    });

    it('toggleAll should work correct', async () => {
      expect(hookUtils(hook).helper.noneSelected).toEqual(false);
      act(() => {
        hookUtils(hook).helper.enable(2);
        hookUtils(hook).helper.toggleAll();
      });
      expect(hookUtils(hook).seleected).toEqual([1, 2, 3]);
      expect(hookUtils(hook).helper.allSelected).toEqual(true);
      expect(hookUtils(hook).helper.noneSelected).toEqual(false);
      expect(hookUtils(hook).helper.partiallySelected).toEqual(false);

      act(() => {
        hookUtils(hook).helper.toggleAll();
      });
      expect(hookUtils(hook).seleected).toEqual([]);
      expect(hookUtils(hook).helper.allSelected).toEqual(false);
      expect(hookUtils(hook).helper.noneSelected).toEqual(true);
      expect(hookUtils(hook).helper.partiallySelected).toEqual(false);
    });

    it('setSelected should work correct', async () => {
      expect(hookUtils(hook).helper.noneSelected).toEqual(false);
      act(() => {
        hookUtils(hook).helper.enable(2);
        hookUtils(hook).helper.setSelected([1]);
      });
      expect(hookUtils(hook).seleected).toEqual([1]);
      expect(hookUtils(hook).helper.isSelected(1)).toEqual(true);
      expect(hookUtils(hook).helper.noneSelected).toEqual(false);
      expect(hookUtils(hook).helper.allSelected).toEqual(false);
      expect(hookUtils(hook).helper.partiallySelected).toEqual(true);

      act(() => {
        hookUtils(hook).helper.setSelected([]);
      });
      expect(hookUtils(hook).seleected).toEqual([]);
      expect(hookUtils(hook).helper.isSelected(1)).toEqual(false);
      expect(hookUtils(hook).helper.noneSelected).toEqual(true);
      expect(hookUtils(hook).helper.allSelected).toEqual(false);
      expect(hookUtils(hook).helper.partiallySelected).toEqual(false);

      act(() => {
        hookUtils(hook).helper.setSelected([1, 2, 3]);
      });
      expect(hookUtils(hook).seleected).toEqual([1, 2, 3]);
      expect(hookUtils(hook).helper.isSelected(1)).toEqual(true);
      expect(hookUtils(hook).helper.noneSelected).toEqual(false);
      expect(hookUtils(hook).helper.allSelected).toEqual(true);
      expect(hookUtils(hook).helper.partiallySelected).toEqual(false);
    });
  });
});
