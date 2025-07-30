import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useTimeout from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  delay?: number;
}

const setUp = ({ fn, delay }: ParamsObj) => renderHook(() => useTimeout(fn, delay));

describe('useTimeout', () => {
  let clearTimeoutSpy: any;

  beforeEach(() => {
    vi.useFakeTimers();
    clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
  });

  afterEach(() => {
    vi.useRealTimers();
    clearTimeoutSpy.mockRestore();
  });

  test('timeout should work', () => {
    const callback = vi.fn();

    setUp({ fn: callback, delay: 20 });

    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(70);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('timeout should stop', () => {
    const callback = vi.fn();

    setUp({ fn: callback, delay: undefined });
    vi.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(0);

    setUp({ fn: callback, delay: -2 });
    vi.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  test('timeout should be clear', () => {
    const callback = vi.fn();

    const hook = setUp({ fn: callback, delay: 20 });
    expect(callback).not.toHaveBeenCalled();

    hook.result.current();
    vi.advanceTimersByTime(30);
    expect(callback).toHaveBeenCalledTimes(0);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
  });
});
