import { act, renderHook } from '@testing-library/react';
import { expect, test } from 'vitest';
import useSelections from '..';
test('selection is immediately observable by another handler in the same event', () => {
  const { result } = renderHook(() => useSelections([1, 2, 3]));
  act(() => {
    result.current.select(2);
    expect(result.current.isSelected(2)).toBe(true);
  });
});
