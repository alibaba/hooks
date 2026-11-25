import { act, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { sleep } from '../../utils/testingHelpers';
import useDebounce from '../index';

describe('useDebounce', () => {
  test('updates a function value without invoking either callback', () => {
    vi.useFakeTimers();
    try {
      const first = vi.fn();
      const next = vi.fn();
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, { wait: 100 }), {
        initialProps: { value: first },
      });

      expect(first).not.toHaveBeenCalled();
      expect(result.current).toBe(first);
      rerender({ value: next });
      expect(result.current).toBe(first);
      act(() => {
        vi.advanceTimersByTime(100);
      });
      expect(result.current).toBe(next);
      expect(next).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });

  test('useDebounce wait:200ms', async () => {
    let mountedState = 0;
    const { result, rerender } = renderHook(() => useDebounce(mountedState, { wait: 200 }));
    expect(result.current).toBe(0);

    mountedState = 1;
    rerender();
    await sleep(50);
    expect(result.current).toBe(0);

    mountedState = 2;
    rerender();
    await sleep(100);
    expect(result.current).toBe(0);

    mountedState = 3;
    rerender();
    await sleep(150);
    expect(result.current).toBe(0);

    mountedState = 4;
    rerender();
    await act(async () => {
      await sleep(250);
    });
    expect(result.current).toBe(4);
  });
});
