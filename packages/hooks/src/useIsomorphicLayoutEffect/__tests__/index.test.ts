import { describe, expect, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useIsomorphicLayoutEffect from '../index';

describe('useIsomorphicLayoutEffect', () => {
  const callback = vi.fn();
  const { result } = renderHook(() => useIsomorphicLayoutEffect(callback));

  test('cheak return value', () => {
    expect(result.current).toBeUndefined();
  });
});
