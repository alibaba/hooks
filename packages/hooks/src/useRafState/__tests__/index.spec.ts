import { act, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import useRafState from '../index';

describe('useRafState', () => {
  test('should work', () => {
    const mockRaf = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      });
    const { result } = renderHook(() => useRafState(0));
    const setRafState = result.current[1];
    expect(result.current[0]).toBe(0);

    act(() => {
      setRafState(1);
    });
    expect(result.current[0]).toBe(1);
    mockRaf.mockRestore();
  });
  test('applies queued state updates in order on the next frame', () => {
    vi.useFakeTimers();
    try {
      const { result, unmount } = renderHook(() => useRafState(1));
      const setRafState = result.current[1];

      act(() => {
        setRafState((value) => value + 1);
        setRafState((value) => value * 3);
      });
      expect(result.current[0]).toBe(1);

      act(() => vi.advanceTimersToNextFrame());
      expect(result.current[0]).toBe(6);

      act(() => {
        setRafState(4);
        setRafState((value) => value + 2);
      });
      act(() => vi.advanceTimersToNextFrame());
      expect(result.current[0]).toBe(6);

      const update = vi.fn((value: number) => value + 1);
      act(() => setRafState(update));
      unmount();
      act(() => vi.advanceTimersToNextFrame());
      expect(update).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });
});
