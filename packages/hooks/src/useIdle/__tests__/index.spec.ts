import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import useIdle from '../index';

describe('useIdle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('turns idle after the timeout and wakes on activity', () => {
    const { result } = renderHook(() => useIdle(1000));

    expect(result.current).toBe(false);
    act(() => {
      vi.advanceTimersByTime(999);
    });
    expect(result.current).toBe(false);
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe(true);

    act(() => {
      document.dispatchEvent(new Event('mousemove'));
    });
    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(true);
  });

  test('restarts the timer on every activity event', () => {
    const { result } = renderHook(() => useIdle(1000));

    act(() => {
      vi.advanceTimersByTime(800);
      document.dispatchEvent(new Event('keydown'));
      vi.advanceTimersByTime(800);
    });
    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe(true);
  });

  test('reports transitions through onChange', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useIdle(1000, { onChange }));

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(onChange).toHaveBeenCalledWith(true);

    act(() => {
      document.dispatchEvent(new Event('mousedown'));
    });
    expect(onChange).toHaveBeenLastCalledWith(false);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(result.current).toBe(false);
  });

  test('observes only the custom target', () => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    const { result } = renderHook(() => useIdle(1000, { target: element }));

    act(() => {
      document.dispatchEvent(new Event('mousemove'));
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(true);

    act(() => {
      element.dispatchEvent(new Event('mousemove'));
    });
    expect(result.current).toBe(false);
    element.remove();
  });

  test('honours a custom event list', () => {
    const { result } = renderHook(() => useIdle(1000, { events: ['click'] }));

    act(() => {
      document.dispatchEvent(new Event('mousemove'));
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(true);

    act(() => {
      document.dispatchEvent(new Event('click'));
    });
    expect(result.current).toBe(false);
  });

  test('starts idle with initialState and wakes on activity', () => {
    const { result } = renderHook(() => useIdle(1000, { initialState: true }));

    expect(result.current).toBe(true);

    act(() => {
      document.dispatchEvent(new Event('mousemove'));
    });
    expect(result.current).toBe(false);
  });

  test('disables detection for a non-positive timeout', () => {
    const { result } = renderHook(() => useIdle(0));

    act(() => {
      vi.advanceTimersByTime(10_000);
    });
    expect(result.current).toBe(false);
  });

  test('clears its timer on unmount', () => {
    const { result, unmount } = renderHook(() => useIdle(1000));

    act(() => {
      vi.advanceTimersByTime(500);
    });
    unmount();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(false);
  });
});
