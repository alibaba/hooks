import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';
import useSelections from '../index';

/* 暂时关闭 act 警告  见：https://github.com/testing-library/react-testing-library/issues/281#issuecomment-480349256 */
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

const data = [1, 2, 3];

describe('useSelections', () => {
  it('should be defined', () => {
    expect(useSelections).toBeDefined();
  });

  function useTestUseSelections() {
    const [items, setItems] = useState(data);
    const useSelectionsResult = useSelections(items, [1]);
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
    it('defaultSelected should work correct', async () => {
      expect(hookUtils(hook).seleected).toEqual([1]);
      expect(hookUtils(hook).helper.isSelected(1)).toEqual(true);
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
      expect(hookUtils(hook).seleected).toEqual([1]);
      expect(hookUtils(hook).helper.isSelected(1)).toEqual(true);
      expect(hookUtils(hook).helper.allSelected).toEqual(false);
      act(() => {
        hookUtils(hook).helper.toggle(1);
      });
      expect(hookUtils(hook).seleected).toEqual([]);
      expect(hookUtils(hook).helper.isSelected(1)).toEqual(false);
      expect(hookUtils(hook).helper.allSelected).toEqual(false);
    });

    it('selectAll and unSelectAll should work correct', async () => {
      expect(hookUtils(hook).helper.noneSelected).toEqual(true);
      act(() => {
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
      expect(hookUtils(hook).helper.noneSelected).toEqual(true);
      act(() => {
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
      expect(hookUtils(hook).helper.noneSelected).toEqual(true);
      act(() => {
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
