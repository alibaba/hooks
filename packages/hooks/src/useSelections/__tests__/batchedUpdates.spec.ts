import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import useSelections from '../index';

describe('batched selection updates', () => {
  test.each([
    ['select', [2, 4, 3]],
    ['unSelect', [4]],
    ['toggle', [4]],
    ['selectAll', [2, 4, 1, 3]],
    ['unSelectAll', [4]],
    ['toggleAll', [2, 4, 1, 3]],
  ] as const)('%s uses the latest pending selection', (operation, expected) => {
    const { result } = renderHook(() => useSelections([1, 2, 3], [1]));

    act(() => {
      result.current.setSelected([2, 4]);
      if (operation === 'select') {
        result.current.select(3);
      } else if (operation === 'unSelect' || operation === 'toggle') {
        result.current[operation](2);
      } else {
        result.current[operation]();
      }
    });

    expect(result.current.selected).toEqual(expected);
  });

  test('two toggleAll calls restore the selection outside the current page', () => {
    const { result } = renderHook(() => useSelections([1, 2], [4]));

    act(() => {
      result.current.toggleAll();
      result.current.toggleAll();
    });

    expect(result.current.selected).toEqual([4]);
    expect(result.current.noneSelected).toBe(true);
  });

  test.each(['id', (item: { id: number }) => item.id])(
    'composes functional updates with itemKey %s',
    (itemKey) => {
      const first = { id: 1 };
      const second = { id: 2 };
      const { result } = renderHook(() =>
        useSelections([first, second], { defaultSelected: [first], itemKey }),
      );

      act(() => {
        result.current.setSelected((previous) => [...previous, second]);
        result.current.unSelect({ id: 1 });
        result.current.toggle({ id: 3 });
      });

      expect(result.current.selected).toEqual([second, { id: 3 }]);
      expect(result.current.isSelected({ id: 2 })).toBe(true);
    },
  );
});
